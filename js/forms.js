document.addEventListener("DOMContentLoaded", function () {

    const forms = document.querySelectorAll("form");

    if (!forms.length) {
        return;
    }


    forms.forEach(function (form) {

        form.addEventListener("submit", function (event) {

            event.preventDefault();


            const inputs = form.querySelectorAll(
                "input, textarea, select"
            );

            let isValid = true;


            inputs.forEach(function (input) {

                clearError(input);


                if (
                    input.hasAttribute("required") &&
                    !input.value.trim()
                ) {

                    showError(
                        input,
                        "لطفاً این قسمت را تکمیل کنید."
                    );

                    isValid = false;

                    return;
                }


                if (
                    input.type === "email" &&
                    input.value.trim()
                ) {

                    const emailPattern =
                        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                    if (!emailPattern.test(input.value.trim())) {

                        showError(
                            input,
                            "لطفاً یک ایمیل معتبر وارد کنید."
                        );

                        isValid = false;
                    }

                }


                if (
                    input.type === "tel" &&
                    input.value.trim()
                ) {

                    const phonePattern =
                        /^(\+98|0)?9\d{9}$/;

                    const normalizedPhone =
                        input.value
                            .replace(/\s+/g, "")
                            .replace(/-/g, "");

                    if (!phonePattern.test(normalizedPhone)) {

                        showError(
                            input,
                            "لطفاً شماره موبایل معتبر وارد کنید."
                        );

                        isValid = false;
                    }

                }

            });


            if (!isValid) {
                return;
            }


            showSuccess(
                form,
                "پیام شما با موفقیت ثبت شد."
            );


            form.reset();

        });

    });


    function showError(input, message) {

        input.classList.add("input-error");


        const error = document.createElement("small");

        error.className = "form-error";

        error.textContent = message;


        const parent = input.parentElement;

        if (parent) {
            parent.appendChild(error);
        }

    }


    function clearError(input) {

        input.classList.remove("input-error");


        const parent = input.parentElement;

        if (!parent) {
            return;
        }


        const error =
            parent.querySelector(".form-error");

        if (error) {
            error.remove();
        }

    }


    function showSuccess(form, message) {

        const oldMessage =
            form.querySelector(".form-success");

        if (oldMessage) {
            oldMessage.remove();
        }


        const success =
            document.createElement("div");

        success.className = "form-success";

        success.textContent = message;


        form.insertBefore(
            success,
            form.firstChild
        );


        setTimeout(function () {

            success.remove();

        }, 5000);

    }

});