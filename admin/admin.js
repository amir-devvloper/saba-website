"use strict";

/* =========================================================
   SABAHESAB ADMIN PANEL
   ========================================================= */

/* =========================================================
   API
   ========================================================= */

const API_URL =
    "https://saba-backend-yugs.onrender.com";

/* =========================================================
   AUTH
   ========================================================= */

const TOKEN_KEY = "saba_admin_token";

let adminToken = sessionStorage.getItem(TOKEN_KEY);
/* =========================================================
   VARIABLES
   ========================================================= */

let allRequests = [];
let selectedRequest = null;

/* =========================================================
   DOM
   ========================================================= */

const requestsTable =
    document.getElementById("requestsTable");

const searchInput =
    document.getElementById("searchInput");

const statusFilter =
    document.getElementById("statusFilter");

const refreshBtn =
    document.getElementById("refreshBtn");

const adminMessage =
    document.getElementById("adminMessage");

const requestModal =
    document.getElementById("requestModal");

const modalClose =
    document.getElementById("modalClose");

/* =========================================================
   MESSAGE
   ========================================================= */

function showMessage(
    message,
    type = "success"
) {

    if (!adminMessage) {
        return;
    }

    adminMessage.textContent = message;

    adminMessage.className =
        "admin-message show " + type;

    setTimeout(function () {

        adminMessage.className =
            "admin-message";

    }, 3500);

}

/* =========================================================
   ESCAPE HTML
   ========================================================= */

function escapeHTML(value) {

    if (
        value === null ||
        value === undefined
    ) {
        return "";
    }

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}

/* =========================================================
   STATUS CLASS
   ========================================================= */

function getStatusClass(status) {

    if (status === "تایید شده") {
        return "approved";
    }

    if (status === "رد شده") {
        return "rejected";
    }

    return "pending";

}

/* =========================================================
   FORMAT DATE
   ========================================================= */

function formatDate(dateString) {

    if (!dateString) {
        return "-";
    }

    const date =
        new Date(dateString);

    if (
        Number.isNaN(
            date.getTime()
        )
    ) {
        return "-";
    }

    return date.toLocaleDateString(
        "fa-IR"
    );

}

/* =========================================================
   AUTH HEADERS
   ========================================================= */

function getAuthHeaders() {

    return {
        "Content-Type": "application/json",
        "Authorization":
            `Bearer ${adminToken}`
    };

}

/* =========================================================
   LOGOUT
   ========================================================= */

function logoutAdmin() {

    localStorage.removeItem(
        TOKEN_KEY
    );

    adminToken = null;

    window.location.reload();

}

/* =========================================================
   LOGIN PAGE
   ========================================================= */

function showLoginPage() {

    if (
        document.getElementById(
            "adminLoginOverlay"
        )
    ) {
        return;
    }

    const loginHTML = `

        <div
            id="adminLoginOverlay"
            style="
                position:fixed;
                inset:0;
                background:#f7f8fa;
                display:flex;
                align-items:center;
                justify-content:center;
                z-index:99999;
                direction:rtl;
                font-family:Tahoma,Arial,sans-serif;
            "
        >

            <div
                style="
                    width:90%;
                    max-width:420px;
                    background:#fff;
                    padding:35px;
                    border-radius:16px;
                    box-shadow:0 10px 40px rgba(0,0,0,.12);
                "
            >

                <div
                    style="
                        text-align:center;
                        margin-bottom:25px;
                    "
                >

                    <h2
                        style="
                            margin:0 0 10px;
                            color:#1d3557;
                        "
                    >
                        پنل مدیریت صبا حساب
                    </h2>

                    <p
                        style="
                            margin:0;
                            color:#777;
                        "
                    >
                        برای ورود اطلاعات خود را وارد کنید
                    </p>

                </div>

                <form id="adminLoginForm">

                    <div style="margin-bottom:15px;">

                        <label
                            style="
                                display:block;
                                margin-bottom:7px;
                            "
                        >
                            نام کاربری
                        </label>

                        <input
                            id="adminUsername"
                            type="text"
                            autocomplete="username"
                            required
                            style="
                                width:100%;
                                box-sizing:border-box;
                                padding:12px;
                                border:1px solid #ddd;
                                border-radius:8px;
                                font-family:inherit;
                            "
                        >

                    </div>

                    <div style="margin-bottom:20px;">

                        <label
                            style="
                                display:block;
                                margin-bottom:7px;
                            "
                        >
                            رمز عبور
                        </label>

                        <input
                            id="adminPassword"
                            type="password"
                            autocomplete="current-password"
                            required
                            style="
                                width:100%;
                                box-sizing:border-box;
                                padding:12px;
                                border:1px solid #ddd;
                                border-radius:8px;
                                font-family:inherit;
                            "
                        >

                    </div>

                    <button
                        id="adminLoginButton"
                        type="submit"
                        style="
                            width:100%;
                            padding:13px;
                            border:0;
                            border-radius:8px;
                            background:#e63946;
                            color:#fff;
                            cursor:pointer;
                            font-family:inherit;
                            font-size:15px;
                        "
                    >
                        ورود به پنل
                    </button>

                    <div
                        id="adminLoginMessage"
                        style="
                            margin-top:15px;
                            text-align:center;
                            font-size:14px;
                            color:#e63946;
                        "
                    ></div>

                </form>

            </div>

        </div>

    `;

    document.body.insertAdjacentHTML(
        "afterbegin",
        loginHTML
    );

    const loginForm =
        document.getElementById(
            "adminLoginForm"
        );

    loginForm.addEventListener(
        "submit",
        handleLogin
    );

}

/* =========================================================
   LOGIN
   ========================================================= */

async function handleLogin(event) {

    event.preventDefault();

    const username =
        document.getElementById(
            "adminUsername"
        ).value.trim();

    const password =
        document.getElementById(
            "adminPassword"
        ).value;

    const button =
        document.getElementById(
            "adminLoginButton"
        );

    const message =
        document.getElementById(
            "adminLoginMessage"
        );

    button.disabled = true;
    button.textContent =
        "در حال ورود...";

    message.textContent = "";

    try {

        const response =
            await fetch(
                `${API_URL}/api/admin/login`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify({
                            username,
                            password
                        })
                }
            );

        const data =
            await response.json();

        if (
            !response.ok ||
            !data.success
        ) {

            throw new Error(
                data.message ||
                "نام کاربری یا رمز عبور اشتباه است."
            );

        }

        if (!data.token) {

            throw new Error(
                "توکن ورود از سرور دریافت نشد."
            );

        }

        adminToken =
            data.token;

            sessionStorage.setItem(TOKEN_KEY, adminToken);

        const loginOverlay =
            document.getElementById(
                "adminLoginOverlay"
            );

        if (loginOverlay) {
            loginOverlay.remove();
        }

        showMessage(
            "ورود با موفقیت انجام شد.",
            "success"
        );

        await loadRequests();

    } catch (error) {

        console.error(
            "LOGIN ERROR:",
            error
        );

        message.textContent =
            error.message ||
            "خطا در ورود.";

    } finally {

        button.disabled = false;

        button.textContent =
            "ورود به پنل";

    }

}

/* =========================================================
   AUTH ERROR
   ========================================================= */

function handleUnauthorized() {

    sessionStorage.removeItem(TOKEN_KEY);

    adminToken = null;

    allRequests = [];

    showLoginPage();

}

/* =========================================================
   LOAD REQUESTS
   ========================================================= */

async function loadRequests() {

    if (!adminToken) {

        showLoginPage();

        return;

    }

    if (requestsTable) {

        requestsTable.innerHTML = `

            <tr>

                <td
                    colspan="8"
                    class="loading"
                >
                    در حال دریافت اطلاعات...
                </td>

            </tr>

        `;

    }

    try {

        const response =
            await fetch(
                `${API_URL}/api/admin/requests`,
                {
                    method: "GET",
                    headers:
                        getAuthHeaders()
                }
            );

        if (response.status === 401) {

            handleUnauthorized();

            return;

        }

        const data =
            await response.json();

        if (
            !response.ok ||
            !data.success
        ) {

            throw new Error(
                data.message ||
                "خطا در دریافت اطلاعات."
            );

        }

        allRequests =
            Array.isArray(
                data.requests
            )
                ? data.requests
                : [];

        updateStats();
        renderRequests();

    } catch (error) {

        console.error(
            "LOAD REQUESTS ERROR:",
            error
        );

        if (requestsTable) {

            requestsTable.innerHTML = `

                <tr>

                    <td
                        colspan="8"
                        class="empty"
                    >
                        دریافت اطلاعات از سرور انجام نشد.
                        <br>
                        اتصال اینترنت و سرور را بررسی کنید.
                    </td>

                </tr>

            `;

        }

        showMessage(
            error.message ||
            "ارتباط با سرور برقرار نشد.",
            "error"
        );

    }

}

/* =========================================================
   UPDATE STATS
   ========================================================= */

function updateStats() {

    const total =
        allRequests.length;

    const pending =
        allRequests.filter(
            request =>
                request.status ===
                "در حال بررسی"
        ).length;

    const approved =
        allRequests.filter(
            request =>
                request.status ===
                "تایید شده"
        ).length;

    const rejected =
        allRequests.filter(
            request =>
                request.status ===
                "رد شده"
        ).length;

    const totalCount =
        document.getElementById(
            "totalCount"
        );

    const pendingCount =
        document.getElementById(
            "pendingCount"
        );

    const approvedCount =
        document.getElementById(
            "approvedCount"
        );

    const rejectedCount =
        document.getElementById(
            "rejectedCount"
        );

    if (totalCount) {
        totalCount.textContent =
            total;
    }

    if (pendingCount) {
        pendingCount.textContent =
            pending;
    }

    if (approvedCount) {
        approvedCount.textContent =
            approved;
    }

    if (rejectedCount) {
        rejectedCount.textContent =
            rejected;
    }

}

/* =========================================================
   FILTER
   ========================================================= */

function getFilteredRequests() {

    const search =
        searchInput
            ? searchInput.value
                .trim()
                .toLowerCase()
            : "";

    const selectedStatus =
        statusFilter
            ? statusFilter.value
            : "all";

    return allRequests.filter(
        function (request) {

            const fullName =
                `${request.firstName || ""} ${request.lastName || ""}`
                    .toLowerCase();

            const tracking =
                String(
                    request.trackingCode || ""
                ).toLowerCase();

            const mobile =
                String(
                    request.mobile || ""
                ).toLowerCase();

            const matchesSearch =
                !search ||
                fullName.includes(search) ||
                tracking.includes(search) ||
                mobile.includes(search);

            const matchesStatus =
                selectedStatus === "all" ||
                request.status ===
                selectedStatus;

            return (
                matchesSearch &&
                matchesStatus
            );

        }
    );

}

/* =========================================================
   RENDER
   ========================================================= */

function renderRequests() {

    if (!requestsTable) {
        return;
    }

    const requests =
        getFilteredRequests();

    const resultCount =
        document.getElementById(
            "resultCount"
        );

    if (resultCount) {

        resultCount.textContent =
            `${requests.length} درخواست`;

    }

    if (!requests.length) {

        requestsTable.innerHTML = `

            <tr>

                <td
                    colspan="8"
                    class="empty"
                >
                    درخواستی پیدا نشد.
                </td>

            </tr>

        `;

        return;

    }

    requestsTable.innerHTML =
        requests.map(
            function (request) {

                const statusClass =
                    getStatusClass(
                        request.status
                    );

                const fullName =
                    `${request.firstName || ""} ${request.lastName || ""}`;

                return `

                    <tr>

                        <td>

                            <span
                                class="tracking-code"
                            >
                                ${escapeHTML(
                                    request.trackingCode
                                )}
                            </span>

                        </td>

                        <td>
                            ${escapeHTML(
                                fullName
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                request.mobile
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                request.province
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                request.city
                            )}
                        </td>

                        <td>

                            <span
                                class="status ${statusClass}"
                            >
                                ${escapeHTML(
                                    request.status
                                )}
                            </span>

                        </td>

                        <td>
                            ${formatDate(
                                request.createdAt
                            )}
                        </td>

                        <td>

                            <div
                                class="actions"
                            >

                                <button
                                    type="button"
                                    class="action-btn view-btn"
                                    onclick="openRequest('${escapeHTML(request.trackingCode)}')"
                                >
                                    مشاهده
                                </button>

                                <button
                                    type="button"
                                    class="action-btn quick-approve"
                                    onclick="changeStatus('${escapeHTML(request.trackingCode)}', 'تایید شده')"
                                    title="تایید"
                                >
                                    ✓
                                </button>

                                <button
                                    type="button"
                                    class="action-btn quick-reject"
                                    onclick="changeStatus('${escapeHTML(request.trackingCode)}', 'رد شده')"
                                    title="رد"
                                >
                                    ✕
                                </button>

                            </div>

                        </td>

                    </tr>

                `;

            }
        ).join("");

}

/* =========================================================
   OPEN REQUEST
   ========================================================= */

function openRequest(trackingCode) {

    const request =
        allRequests.find(
            item =>
                item.trackingCode ===
                trackingCode
        );

    if (!request) {

        showMessage(
            "درخواست پیدا نشد.",
            "error"
        );

        return;

    }

    selectedRequest =
        request;

    const fullName =
        `${request.firstName || ""} ${request.lastName || ""}`;

    const modalTracking =
        document.getElementById(
            "modalTracking"
        );

    const detailName =
        document.getElementById(
            "detailName"
        );

    const detailMobile =
        document.getElementById(
            "detailMobile"
        );

    const detailPhone =
        document.getElementById(
            "detailPhone"
        );

    const detailProvince =
        document.getElementById(
            "detailProvince"
        );

    const detailCity =
        document.getElementById(
            "detailCity"
        );

    const detailExperience =
        document.getElementById(
            "detailExperience"
        );

    const detailBusiness =
        document.getElementById(
            "detailBusiness"
        );

    const detailAddress =
        document.getElementById(
            "detailAddress"
        );

    const detailDescription =
        document.getElementById(
            "detailDescription"
        );

    if (modalTracking) {
        modalTracking.textContent =
            request.trackingCode;
    }

    if (detailName) {
        detailName.textContent =
            fullName;
    }

    if (detailMobile) {
        detailMobile.textContent =
            request.mobile || "-";
    }

    if (detailPhone) {
        detailPhone.textContent =
            request.phone || "-";
    }

    if (detailProvince) {
        detailProvince.textContent =
            request.province || "-";
    }

    if (detailCity) {
        detailCity.textContent =
            request.city || "-";
    }

    if (detailExperience) {
        detailExperience.textContent =
            request.experience || "-";
    }

    if (detailBusiness) {
        detailBusiness.textContent =
            request.business || "-";
    }

    if (detailAddress) {
        detailAddress.textContent =
            request.address || "-";
    }

    if (detailDescription) {
        detailDescription.textContent =
            request.description || "-";
    }

    if (requestModal) {

        requestModal.classList.add(
            "show"
        );

    }

}

/* =========================================================
   CLOSE MODAL
   ========================================================= */

function closeModal() {

    if (requestModal) {

        requestModal.classList.remove(
            "show"
        );

    }

    selectedRequest =
        null;

}

if (modalClose) {

    modalClose.addEventListener(
        "click",
        closeModal
    );

}

const modalOverlay =
    document.querySelector(
        ".modal-overlay"
    );

if (modalOverlay) {

    modalOverlay.addEventListener(
        "click",
        closeModal
    );

}

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape"
        ) {

            closeModal();

        }

    }
);

/* =========================================================
   CHANGE STATUS
   ========================================================= */

async function changeStatus(
    trackingCode,
    status
) {

    if (!trackingCode) {
        return;
    }

    if (!adminToken) {

        showLoginPage();

        return;

    }

    try {

        const response =
            await fetch(
                `${API_URL}/api/admin/requests/${encodeURIComponent(trackingCode)}/status`,
                {
                    method: "PUT",

                    headers:
                        getAuthHeaders(),

                    body:
                        JSON.stringify({
                            status
                        })
                }
            );

        if (response.status === 401) {

            handleUnauthorized();

            return;

        }

        const data =
            await response.json();

        if (
            !response.ok ||
            !data.success
        ) {

            throw new Error(
                data.message ||
                "تغییر وضعیت انجام نشد."
            );

        }

        showMessage(
            `وضعیت ${trackingCode} به «${status}» تغییر کرد.`,
            "success"
        );

        closeModal();

        await loadRequests();

    } catch (error) {

        console.error(
            "CHANGE STATUS ERROR:",
            error
        );

        showMessage(
            error.message ||
            "خطا در تغییر وضعیت.",
            "error"
        );

    }

}

/* =========================================================
   DELETE REQUEST
   ========================================================= */

async function deleteRequest(
    trackingCode
) {

    if (!trackingCode) {
        return;
    }

    if (!adminToken) {

        showLoginPage();

        return;

    }

    const confirmed =
        confirm(
            `آیا مطمئن هستید که درخواست ${trackingCode} حذف شود؟\n\nاین عملیات قابل بازگشت نیست.`
        );

    if (!confirmed) {
        return;
    }

    try {

        const response =
            await fetch(
                `${API_URL}/api/admin/requests/${encodeURIComponent(trackingCode)}`,
                {
                    method: "DELETE",
                    headers:
                        getAuthHeaders()
                }
            );

        if (response.status === 401) {

            handleUnauthorized();

            return;

        }

        const data =
            await response.json();

        if (
            !response.ok ||
            !data.success
        ) {

            throw new Error(
                data.message ||
                "حذف انجام نشد."
            );

        }

        showMessage(
            "درخواست با موفقیت حذف شد.",
            "success"
        );

        closeModal();

        await loadRequests();

    } catch (error) {

        console.error(
            "DELETE ERROR:",
            error
        );

        showMessage(
            error.message ||
            "خطا در حذف درخواست.",
            "error"
        );

    }

}

/* =========================================================
   MODAL STATUS BUTTONS
   ========================================================= */

const modalPending =
    document.getElementById(
        "modalPending"
    );

if (modalPending) {

    modalPending.addEventListener(
        "click",
        function () {

            if (selectedRequest) {

                changeStatus(
                    selectedRequest.trackingCode,
                    "در حال بررسی"
                );

            }

        }
    );

}

const modalApprove =
    document.getElementById(
        "modalApprove"
    );

if (modalApprove) {

    modalApprove.addEventListener(
        "click",
        function () {

            if (selectedRequest) {

                changeStatus(
                    selectedRequest.trackingCode,
                    "تایید شده"
                );

            }

        }
    );

}

const modalReject =
    document.getElementById(
        "modalReject"
    );

if (modalReject) {

    modalReject.addEventListener(
        "click",
        function () {

            if (selectedRequest) {

                changeStatus(
                    selectedRequest.trackingCode,
                    "رد شده"
                );

            }

        }
    );

}

const modalDelete =
    document.getElementById(
        "modalDelete"
    );

if (modalDelete) {

    modalDelete.addEventListener(
        "click",
        function () {

            if (selectedRequest) {

                deleteRequest(
                    selectedRequest.trackingCode
                );

            }

        }
    );

}

/* =========================================================
   SEARCH
   ========================================================= */

if (searchInput) {

    searchInput.addEventListener(
        "input",
        renderRequests
    );

}

/* =========================================================
   STATUS FILTER
   ========================================================= */

if (statusFilter) {

    statusFilter.addEventListener(
        "change",
        renderRequests
    );

}

/* =========================================================
   REFRESH
   ========================================================= */

if (refreshBtn) {

    refreshBtn.addEventListener(
        "click",
        async function () {

            refreshBtn.disabled =
                true;

            refreshBtn.textContent =
                "در حال بروزرسانی...";

            await loadRequests();

            refreshBtn.disabled =
                false;

            refreshBtn.textContent =
                "↻ بروزرسانی";

        }
    );

}

/* =========================================================
   OPTIONAL LOGOUT BUTTON
   ========================================================= */

const logoutBtn =
    document.getElementById(
        "logoutBtn"
    );

if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        logoutAdmin
    );

}

/* =========================================================
   START
   ========================================================= */

if (adminToken) {

    loadRequests();

} else {

    showLoginPage();

}

