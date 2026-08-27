"use strict";

document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       حذف اطلاعات ورود
    ========================= */

    localStorage.removeItem("sabaCurrentUser");
    localStorage.removeItem("sabaRememberMe");


    /* =========================
       Countdown
    ========================= */

    const countdown =
        document.getElementById("countdown");

    let seconds = 5;

    if (countdown) {
        countdown.textContent = seconds;
    }


    const timer = setInterval(function () {

        seconds--;

        if (countdown) {
            countdown.textContent = seconds;
        }


        if (seconds <= 0) {

            clearInterval(timer);

            window.location.href = "../index.html";
        }

    }, 1000);

});