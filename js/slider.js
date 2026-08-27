document.addEventListener("DOMContentLoaded", function () {

    const slider = document.querySelector(".testimonial-slider");

    if (!slider) {
        return;
    }

    const testimonials = [
        {
            text: "استفاده از نرم افزار صبا مدیریت حسابداری ما را ساده‌تر کرده است.",
            name: "مشتری صبا"
        },
        {
            text: "پشتیبانی و امکانات نرم افزار صبا باعث شده مدیریت کسب‌وکار برای ما راحت‌تر شود.",
            name: "مدیر فروشگاه"
        },
        {
            text: "نرم افزار صبا یکی از ابزارهای کاربردی برای مدیریت امور مالی مجموعه ماست.",
            name: "مشتری صبا"
        }
    ];


    let currentIndex = 0;


    const testimonial = slider.querySelector(".testimonial");

    if (!testimonial) {
        return;
    }


    function showTestimonial(index) {

        const item = testimonials[index];

        testimonial.style.opacity = "0";
        testimonial.style.transform = "translateY(10px)";


        setTimeout(function () {

            testimonial.innerHTML = `
                <p>
                    ${item.text}
                </p>

                <strong>
                    ${item.name}
                </strong>
            `;

            testimonial.style.opacity = "1";
            testimonial.style.transform = "translateY(0)";

        }, 250);
    }


    testimonial.style.transition =
        "opacity 0.3s ease, transform 0.3s ease";


    const controls = document.createElement("div");

    controls.className = "slider-controls";


    const prevButton = document.createElement("button");

    prevButton.type = "button";
    prevButton.className = "slider-prev";
    prevButton.innerHTML = "‹";
    prevButton.setAttribute(
        "aria-label",
        "نظر قبلی"
    );


    const nextButton = document.createElement("button");

    nextButton.type = "button";
    nextButton.className = "slider-next";
    nextButton.innerHTML = "›";
    nextButton.setAttribute(
        "aria-label",
        "نظر بعدی"
    );


    controls.appendChild(prevButton);
    controls.appendChild(nextButton);

    slider.appendChild(controls);


    prevButton.addEventListener("click", function () {

        currentIndex--;

        if (currentIndex < 0) {
            currentIndex = testimonials.length - 1;
        }

        showTestimonial(currentIndex);

    });


    nextButton.addEventListener("click", function () {

        currentIndex++;

        if (currentIndex >= testimonials.length) {
            currentIndex = 0;
        }

        showTestimonial(currentIndex);

    });


    setInterval(function () {

        currentIndex++;

        if (currentIndex >= testimonials.length) {
            currentIndex = 0;
        }

        showTestimonial(currentIndex);

    }, 5000);

});