document.addEventListener("DOMContentLoaded", function () {

    const menuToggle = document.querySelector(".menu-toggle");
    const mainMenu = document.querySelector(".main-menu");

    // اگر هدر یا منو وجود نداشت، کاری انجام نده
    if (!menuToggle || !mainMenu) {
        return;
    }

    // پیدا کردن navbar
    const navbar = mainMenu.closest(".navbar");

    // ==============================
    // باز و بسته کردن منوی موبایل
    // ==============================
    menuToggle.addEventListener("click", function () {

        const isOpen = mainMenu.classList.toggle("mobile-menu-open");

        // هماهنگ کردن navbar با منوی اصلی
        if (navbar) {
            navbar.classList.toggle("mobile-menu-open", isOpen);
        }

        // تغییر آیکون همبرگری / ضربدر
        if (isOpen) {
            menuToggle.innerHTML = "✕";
            menuToggle.setAttribute("aria-label", "بستن منو");
            menuToggle.setAttribute("aria-expanded", "true");
        } else {
            menuToggle.innerHTML = "☰";
            menuToggle.setAttribute("aria-label", "باز کردن منو");
            menuToggle.setAttribute("aria-expanded", "false");

            // بستن تمام زیرمنوها
            document
                .querySelectorAll(".dropdown-open")
                .forEach(function (item) {
                    item.classList.remove("dropdown-open");
                });
        }
    });


    // ==============================
    // زیرمنوها در موبایل
    // ==============================
    const dropdownParents = document.querySelectorAll(
        ".main-menu > .has-dropdown > a"
    );

    dropdownParents.forEach(function (link) {

        link.addEventListener("click", function (event) {

            if (window.innerWidth <= 900) {

                event.preventDefault();

                const parent = link.parentElement;

                parent.classList.toggle("dropdown-open");
            }
        });
    });


    // ==============================
    // تغییر اندازه صفحه
    // ==============================
    window.addEventListener("resize", function () {

        if (window.innerWidth > 900) {

            // بستن منوی موبایل
            mainMenu.classList.remove("mobile-menu-open");

            if (navbar) {
                navbar.classList.remove("mobile-menu-open");
            }

            // برگرداندن آیکون
            menuToggle.innerHTML = "☰";
            menuToggle.setAttribute(
                "aria-label",
                "باز کردن منو"
            );
            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            // بستن زیرمنوها
            document
                .querySelectorAll(".dropdown-open")
                .forEach(function (item) {
                    item.classList.remove("dropdown-open");
                });
        }
    });


    // ==============================
    // مقدار اولیه
    // ==============================
    menuToggle.setAttribute("aria-expanded", "false");

});