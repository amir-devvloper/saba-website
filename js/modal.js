document.addEventListener("DOMContentLoaded", function () {

    /*
    ========================================
    Modal System
    ========================================
    */

    const modalTriggers = document.querySelectorAll(
        "[data-modal]"
    );

    const modalCloseButtons = document.querySelectorAll(
        "[data-modal-close]"
    );


    /*
    ========================================
    Open Modal
    ========================================
    */

    modalTriggers.forEach(function (trigger) {

        trigger.addEventListener("click", function (event) {

            event.preventDefault();

            const modalId =
                trigger.getAttribute("data-modal");

            const modal =
                document.getElementById(modalId);

            if (!modal) {
                return;
            }

            openModal(modal);

        });

    });


    /*
    ========================================
    Close Buttons
    ========================================
    */

    modalCloseButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const modal =
                button.closest(".modal");

            if (!modal) {
                return;
            }

            closeModal(modal);

        });

    });


    /*
    ========================================
    Close By Background
    ========================================
    */

    document.querySelectorAll(".modal").forEach(
        function (modal) {

            modal.addEventListener(
                "click",
                function (event) {

                    if (
                        event.target === modal
                    ) {
                        closeModal(modal);
                    }

                }
            );

        }
    );


    /*
    ========================================
    Close With ESC
    ========================================
    */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key !== "Escape") {
                return;
            }

            const activeModal =
                document.querySelector(
                    ".modal.modal-active"
                );

            if (activeModal) {
                closeModal(activeModal);
            }

        }
    );


    /*
    ========================================
    Open Function
    ========================================
    */

    function openModal(modal) {

        modal.classList.add("modal-active");

        document.body.classList.add(
            "modal-open"
        );

    }


    /*
    ========================================
    Close Function
    ========================================
    */

    function closeModal(modal) {

        modal.classList.remove(
            "modal-active"
        );

        document.body.classList.remove(
            "modal-open"
        );

    }

});