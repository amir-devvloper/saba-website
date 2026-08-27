document.addEventListener("DOMContentLoaded", function () {

    const header = document.querySelector(".main-header");


    /* =========================
       Sticky Header
    ========================= */

    if (header) {

        window.addEventListener("scroll", function () {

            if (window.scrollY > 50) {
                header.classList.add("header-scrolled");
            } else {
                header.classList.remove("header-scrolled");
            }

        });

    }


    /* =========================
       Scroll To Top
    ========================= */

    const scrollTopButton = document.createElement("button");

    scrollTopButton.className = "scroll-top";
    scrollTopButton.type = "button";
    scrollTopButton.innerHTML = "↑";
    scrollTopButton.setAttribute(
        "aria-label",
        "بازگشت به بالای صفحه"
    );

    document.body.appendChild(scrollTopButton);


    window.addEventListener("scroll", function () {

        if (window.scrollY > 400) {
            scrollTopButton.classList.add("show");
        } else {
            scrollTopButton.classList.remove("show");
        }

    });


    scrollTopButton.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


    /* =========================
       Smooth Anchor Links
    ========================= */

    const anchorLinks = document.querySelectorAll(
        'a[href^="#"]'
    );

    anchorLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =========================
       Current Year
    ========================= */

    const footerYear = document.querySelector(
        ".footer-bottom p"
    );

    if (footerYear) {

        const year = new Date().getFullYear();

        footerYear.innerHTML =
            `© ${year} صبا حساب - تمامی حقوق محفوظ است.`;

    }

});