"use strict";

document.addEventListener("DOMContentLoaded", function () {

    const API_URL = "https://saba-backend-yugs.onrender.com";


    /* =====================================================
       HELPERS
       ===================================================== */

    function normalizeMobile(value) {

        if (!value) return "";

        return value
            .replace(/[۰-۹]/g, function (char) {
                return "۰۱۲۳۴۵۶۷۸۹".indexOf(char);
            })
            .replace(/\s+/g, "")
            .replace(/-/g, "");
    }


    function isValidMobile(value) {

        const mobile = normalizeMobile(value);

        return /^09\d{9}$/.test(mobile);
    }


    function showMessage(element, message, type) {

        if (!element) return;

        element.textContent = message;

        element.className =
            "form-message show " + type;
    }


    function hideMessage(element) {

        if (!element) return;

        element.textContent = "";

        element.className = "form-message";
    }


    /* =====================================================
       REPRESENTATION FORM
       ===================================================== */

    const representationForm =
        document.getElementById("representationForm");


    if (representationForm) {

        const formMessage =
            document.getElementById("formMessage");


        representationForm.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();

                hideMessage(formMessage);


                /* -----------------------------------------
                   GET VALUES
                   ----------------------------------------- */

                const firstName =
                    document
                        .getElementById("firstName")
                        .value
                        .trim();


                const lastName =
                    document
                        .getElementById("lastName")
                        .value
                        .trim();


                const mobile =
                    document
                        .getElementById("mobile")
                        .value
                        .trim();


                const phone =
                    document
                        .getElementById("phone")
                        .value
                        .trim();


                const province =
                    document
                        .getElementById("province")
                        .value
                        .trim();


                const city =
                    document
                        .getElementById("city")
                        .value
                        .trim();


                const address =
                    document
                        .getElementById("address")
                        .value
                        .trim();


                const experience =
                    document
                        .getElementById("experience")
                        .value
                        .trim();


                const business =
                    document
                        .getElementById("business")
                        .value
                        .trim();


                const description =
                    document
                        .getElementById("description")
                        .value
                        .trim();


                /* -----------------------------------------
                   VALIDATION
                   ----------------------------------------- */

                if (!firstName) {

                    showMessage(
                        formMessage,
                        "لطفاً نام خود را وارد کنید.",
                        "error"
                    );

                    document
                        .getElementById("firstName")
                        .focus();

                    return;
                }


                if (!lastName) {

                    showMessage(
                        formMessage,
                        "لطفاً نام خانوادگی خود را وارد کنید.",
                        "error"
                    );

                    document
                        .getElementById("lastName")
                        .focus();

                    return;
                }


                if (!isValidMobile(mobile)) {

                    showMessage(
                        formMessage,
                        "شماره موبایل وارد شده صحیح نیست.",
                        "error"
                    );

                    document
                        .getElementById("mobile")
                        .focus();

                    return;
                }


                if (!province) {

                    showMessage(
                        formMessage,
                        "لطفاً استان را انتخاب کنید.",
                        "error"
                    );

                    document
                        .getElementById("province")
                        .focus();

                    return;
                }


                if (!city) {

                    showMessage(
                        formMessage,
                        "لطفاً شهر را وارد کنید.",
                        "error"
                    );

                    document
                        .getElementById("city")
                        .focus();

                    return;
                }


                if (!address) {

                    showMessage(
                        formMessage,
                        "لطفاً آدرس خود را وارد کنید.",
                        "error"
                    );

                    document
                        .getElementById("address")
                        .focus();

                    return;
                }


                /* -----------------------------------------
                   SEND TO BACKEND
                   ----------------------------------------- */

                try {

                    const response =
                        await fetch(
                            `${API_URL}/api/requests`,
                            {
                                method: "POST",

                                headers: {
                                    "Content-Type":
                                        "application/json"
                                },

                                body: JSON.stringify({

                                    firstName:
                                        firstName,

                                    lastName:
                                        lastName,

                                    mobile:
                                        normalizeMobile(mobile),

                                    phone:
                                        phone,

                                    province:
                                        province,

                                    city:
                                        city,

                                    address:
                                        address,

                                    experience:
                                        experience,

                                    business:
                                        business,

                                    description:
                                        description

                                })
                            }
                        );


                    const data =
                        await response.json();


                    /* -------------------------------------
                       BACKEND ERROR
                       ------------------------------------- */

                    if (!response.ok || !data.success) {

                        showMessage(
                            formMessage,
                            data.message ||
                                "خطا در ثبت درخواست.",
                            "error"
                        );

                        return;
                    }


                    /* -------------------------------------
                       SUCCESS
                       ------------------------------------- */

                    showMessage(
                        formMessage,
                        "درخواست شما با موفقیت ثبت شد.",
                        "success"
                    );


                    /* -------------------------------------
                       SHOW TRACKING CODE
                       ------------------------------------- */

                    let trackingBox =
                        document.getElementById(
                            "generatedTrackingCode"
                        );


                    if (!trackingBox) {

                        trackingBox =
                            document.createElement(
                                "div"
                            );

                        trackingBox.id =
                            "generatedTrackingCode";

                        trackingBox.style.marginTop =
                            "18px";

                        trackingBox.style.padding =
                            "18px";

                        trackingBox.style.borderRadius =
                            "10px";

                        trackingBox.style.background =
                            "#f7f8fa";

                        trackingBox.style.border =
                            "1px solid #e8e8e8";

                        trackingBox.style.textAlign =
                            "center";

                        formMessage.insertAdjacentElement(
                            "afterend",
                            trackingBox
                        );
                    }


                    trackingBox.innerHTML = `

                        <strong
                            style="
                                display:block;
                                margin-bottom:8px;
                                color:#1d3557;
                            "
                        >
                            کد پیگیری درخواست شما
                        </strong>

                        <span
                            style="
                                display:block;
                                font-size:24px;
                                font-weight:800;
                                color:#e63946;
                                letter-spacing:2px;
                                direction:ltr;
                            "
                        >
                            ${data.trackingCode}
                        </span>

                        <small
                            style="
                                display:block;
                                margin-top:8px;
                                color:#777;
                            "
                        >
                            این کد را برای پیگیری درخواست خود نگه دارید.
                        </small>

                    `;


                    /* -------------------------------------
                       RESET FORM
                       ------------------------------------- */

                    representationForm.reset();


                    /* -------------------------------------
                       SCROLL TO CODE
                       ------------------------------------- */

                    trackingBox.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });


                } catch (error) {

                    console.error(
                        "BACKEND ERROR:",
                        error
                    );


                    showMessage(
                        formMessage,
                        "ارتباط با سرور برقرار نشد. مطمئن شوید backend روشن است.",
                        "error"
                    );

                }

            }
        );

    }


    /* =====================================================
       FOLLOW-UP
       ===================================================== */

    const followUpForm =
        document.getElementById("followUpForm");


    if (followUpForm) {

        const followUpMessage =
            document.getElementById(
                "followUpMessage"
            );


        const requestResult =
            document.getElementById(
                "requestResult"
            );


        followUpForm.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();

                hideMessage(
                    followUpMessage
                );


                const trackingInput =
                    document.getElementById(
                        "trackingCode"
                    );


                const trackingCode =
                    trackingInput.value
                        .trim()
                        .replace(/\s+/g, "")
                        .toUpperCase();


                if (!trackingCode) {

                    showMessage(
                        followUpMessage,
                        "لطفاً کد پیگیری را وارد کنید.",
                        "error"
                    );

                    trackingInput.focus();

                    return;
                }


                /* -----------------------------------------
                   ASK BACKEND
                   ----------------------------------------- */

                try {

                    const response =
                        await fetch(
                            `${API_URL}/api/requests/${encodeURIComponent(trackingCode)}`
                        );


                    const data =
                        await response.json();


                    if (!response.ok || !data.success) {

                        if (requestResult) {
                            requestResult.hidden = true;
                        }

                        showMessage(
                            followUpMessage,
                            data.message ||
                                "درخواستی با این کد پیدا نشد.",
                            "error"
                        );

                        trackingInput.focus();

                        return;
                    }


                    /* -----------------------------------------
                       SHOW RESULT
                       ----------------------------------------- */

                    const request =
                        data.request;


                    document.getElementById(
                        "resultTracking"
                    ).textContent =
                        request.trackingCode;


                    document.getElementById(
                        "resultName"
                    ).textContent =
                        `${request.firstName} ${request.lastName}`;


                    document.getElementById(
                        "resultCity"
                    ).textContent =
                        request.city;


                    document.getElementById(
                        "resultStatus"
                    ).textContent =
                        request.status;


                    document.getElementById(
                        "resultDescription"
                    ).textContent =
                        request.description ||
                        "درخواست شما توسط کارشناسان در حال بررسی است.";


                    requestResult.hidden = false;


                    requestResult.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });


                } catch (error) {

                    console.error(
                        "FOLLOW UP ERROR:",
                        error
                    );


                    showMessage(
                        followUpMessage,
                        "ارتباط با سرور برقرار نشد.",
                        "error"
                    );

                }

            }
        );

    }


    /* =====================================================
       MOBILE MENU
       ===================================================== */

    const menuToggle =
        document.querySelector(".menu-toggle");


    const mainMenu =
        document.querySelector(".main-menu");


    if (menuToggle && mainMenu) {

        menuToggle.addEventListener(
            "click",
            function () {

                mainMenu.classList.toggle(
                    "mobile-open"
                );

            }
        );


        const dropdownParents =
            mainMenu.querySelectorAll(
                ".has-dropdown > a"
            );


        dropdownParents.forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function () {

                        if (
                            window.innerWidth <= 900
                        ) {

                            const parent =
                                link.parentElement;

                            parent.classList.toggle(
                                "open"
                            );

                        }

                    }
                );

            }
        );

    }


    /* =====================================================
       PHONE INPUT
       ===================================================== */

    const mobileInput =
        document.getElementById("mobile");


    if (mobileInput) {

        mobileInput.addEventListener(
            "input",
            function () {

                let value =
                    mobileInput.value;


                value =
                    value.replace(
                        /[^0-9۰-۹]/g,
                        ""
                    );


                mobileInput.value =
                    value.slice(0, 11);

            }
        );

    }


    /* =====================================================
       TRACKING INPUT
       ===================================================== */

    const trackingInput =
        document.getElementById("trackingCode");


    if (trackingInput) {

        trackingInput.addEventListener(
            "input",
            function () {

                trackingInput.value =
                    trackingInput.value.replace(
                        /[^a-zA-Z0-9۰-۹-]/g,
                        ""
                    );

            }
        );

    }

});