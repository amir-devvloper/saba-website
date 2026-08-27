document.addEventListener("DOMContentLoaded", function () {

    const menuToggle = document.querySelector(".menu-toggle");
    const mainMenu = document.querySelector(".main-menu");

    if (!menuToggle || !mainMenu) {
        return;
    }

    menuToggle.addEventListener("click", function () {

        mainMenu.classList.toggle("mobile-menu-open");

        if (mainMenu.classList.contains("mobile-menu-open")) {
            menuToggle.innerHTML = "✕";
            menuToggle.setAttribute("aria-label", "بستن منو");
        } else {
            menuToggle.innerHTML = "☰";
            menuToggle.setAttribute("aria-label", "باز کردن منو");
        }

    });


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


    window.addEventListener("resize", function () {

        if (window.innerWidth > 900) {

            mainMenu.classList.remove("mobile-menu-open");

            menuToggle.innerHTML = "☰";

            menuToggle.setAttribute(
                "aria-label",
                "باز کردن منو"
            );

            document
                .querySelectorAll(".dropdown-open")
                .forEach(function (item) {
                    item.classList.remove("dropdown-open");
                });

        }

    });

});