document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       FILTER ACADEMIES
    ========================================= */

    const tabs = document.querySelectorAll(".academy-tab");
    const cards = document.querySelectorAll(".academy-card");

    tabs.forEach(function (tab) {

        tab.addEventListener("click", function () {

            // فعال کردن دکمه انتخاب شده
            tabs.forEach(function (item) {
                item.classList.remove("active");
            });

            this.classList.add("active");

            // گرفتن دسته انتخاب شده
            const target = this.getAttribute("data-target");

            // نمایش / مخفی کردن کارت‌ها
            cards.forEach(function (card) {

                const city = card.getAttribute("data-city");

                if (target === "all" || city === target) {

                    card.style.display = "block";

                } else {

                    card.style.display = "none";

                }

            });

        });

    });


    /* =========================================
       MOBILE MENU
    ========================================= */

    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");

    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", function () {

            mainNav.classList.toggle("open");

        });

    }


    /* =========================================
       MOBILE DROPDOWN
    ========================================= */

    const dropdownButtons =
        document.querySelectorAll(".dropdown-btn");

    dropdownButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            if (window.innerWidth <= 900) {

                const parent =
                    this.closest(".nav-dropdown");

                document
                    .querySelectorAll(".nav-dropdown")
                    .forEach(function (item) {

                        if (item !== parent) {
                            item.classList.remove("open");
                        }

                    });

                parent.classList.toggle("open");

            }

        });

    });


    /* =========================================
       SCROLL TOP
    ========================================= */

    const scrollTop =
        document.getElementById("scrollTop");

    if (scrollTop) {

        window.addEventListener("scroll", function () {

            if (window.scrollY > 400) {

                scrollTop.classList.add("show");

            } else {

                scrollTop.classList.remove("show");

            }

        });


        scrollTop.addEventListener("click", function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }

});