// =========================
// MOBILE MENU
// =========================

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });

    navMenu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
        });
    });
}


// =========================
// GALLERY LIGHTBOX
// =========================

const galleryItems = document.querySelectorAll(".gallery-item");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");

let currentImageIndex = 0;

const galleryImages = Array.from(galleryItems).map(item => {
    const img = item.querySelector("img");
    return img ? img.src : "";
});


function openLightbox(index) {

    if (!lightbox || !lightboxImage) return;

    if (!galleryImages[index]) return;

    currentImageIndex = index;

    lightboxImage.src = galleryImages[currentImageIndex];

    lightbox.classList.add("active");

    lightbox.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";
}


function closeLightbox() {

    if (!lightbox) return;

    lightbox.classList.remove("active");

    lightbox.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";
}


function showPreviousImage() {

    if (!galleryImages.length) return;

    currentImageIndex =
        (currentImageIndex - 1 + galleryImages.length) %
        galleryImages.length;

    lightboxImage.src =
        galleryImages[currentImageIndex];
}


function showNextImage() {

    if (!galleryImages.length) return;

    currentImageIndex =
        (currentImageIndex + 1) %
        galleryImages.length;

    lightboxImage.src =
        galleryImages[currentImageIndex];
}


// Gallery clicks

galleryItems.forEach((item, index) => {

    item.addEventListener("click", function(event) {

        event.preventDefault();

        openLightbox(index);

    });

});


// Close button

if (lightboxClose) {

    lightboxClose.addEventListener("click", function(event) {

        event.preventDefault();

        closeLightbox();

    });

}


// Previous

if (lightboxPrev) {

    lightboxPrev.addEventListener("click", function(event) {

        event.preventDefault();

        showPreviousImage();

    });

}


// Next

if (lightboxNext) {

    lightboxNext.addEventListener("click", function(event) {

        event.preventDefault();

        showNextImage();

    });

}


// Click outside image

if (lightbox) {

    lightbox.addEventListener("click", function(event) {

        if (event.target === lightbox) {

            closeLightbox();

        }

    });

}


// Keyboard controls

document.addEventListener("keydown", function(event) {

    if (!lightbox) return;

    if (!lightbox.classList.contains("active")) return;


    if (event.key === "Escape") {

        closeLightbox();

    }


    if (event.key === "ArrowLeft") {

        showPreviousImage();

    }


    if (event.key === "ArrowRight") {

        showNextImage();

    }

});


// =========================
// BACK TO TOP
// =========================

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", function() {

    if (!backToTop) return;

    if (window.scrollY > 500) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});


if (backToTop) {

    backToTop.addEventListener("click", function() {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


// =========================
// SCROLL ANIMATIONS
// =========================

const revealElements = document.querySelectorAll(
    ".service-card, .why-card, .gallery-item, .contact-card, .booking-info-item, .rating-card"
);


if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("reveal");

                        entry.target.classList.add("visible");

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });

}


// =========================
// BOOKING FORM
// =========================

const bookingForm =
    document.getElementById("bookingForm");

const dateInput =
    document.getElementById("date");


if (dateInput) {

    const today = new Date();

    const year =
        today.getFullYear();

    const month =
        String(today.getMonth() + 1)
        .padStart(2, "0");

    const day =
        String(today.getDate())
        .padStart(2, "0");

    dateInput.min =
        `${year}-${month}-${day}`;

}


if (bookingForm) {

    bookingForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const name =
                document
                    .getElementById("name")
                    .value
                    .trim();


            const phone =
                document
                    .getElementById("phone")
                    .value
                    .trim();


            const service =
                document
                    .getElementById("service")
                    .value;


            const date =
                document
                    .getElementById("date")
                    .value;


            const time =
                document
                    .getElementById("time")
                    .value;


            const message =
                document
                    .getElementById("message")
                    .value
                    .trim();


            if (
                !name ||
                !phone ||
                !service ||
                !date ||
                !time
            ) {

                alert(
                    "Please complete all required booking fields."
                );

                return;

            }


            const formattedMessage =
`Hello Beautex Style Avenue!

I would like to make an appointment.

Name: ${name}
Phone: ${phone}
Service: ${service}
Preferred Date: ${date}
Preferred Time: ${time}

Additional Notes:
${message || "None"}

Thank you!`;


            const whatsappURL =
                `https://wa.me/27840462860?text=${encodeURIComponent(formattedMessage)}`;


            // Navigate directly to WhatsApp
            // instead of opening a popup.
            window.location.href =
                whatsappURL;

        }
    );

}


// =========================
// ACTIVE NAVIGATION
// =========================

const sections =
    document.querySelectorAll("section[id]");

const navLinks =
    document.querySelectorAll(
        ".nav a[href^='#']"
    );


window.addEventListener("scroll", function() {

    let current = "";


    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.offsetHeight;


        if (
            window.scrollY >= sectionTop &&
            window.scrollY <
            sectionTop + sectionHeight
        ) {

            current =
                section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");


        if (
            link.getAttribute("href") ===
            `#${current}`
        ) {

            link.classList.add("active");

        }

    });

});


// =========================
// FAQ ACCORDION
// =========================

const faqQuestions =
    document.querySelectorAll(
        ".faq-question"
    );


faqQuestions.forEach(question => {

    // Make sure FAQ buttons never
    // accidentally behave like submit buttons.
    question.setAttribute(
        "type",
        "button"
    );


    question.addEventListener(
        "click",
        function(event) {

            event.preventDefault();

            event.stopPropagation();


            const faqItem =
                this.closest(".faq-item");


            if (!faqItem) return;


            const answer =
                faqItem.querySelector(
                    ".faq-answer"
                );


            if (!answer) return;


            const isActive =
                faqItem.classList.contains(
                    "active"
                );


            // Close all FAQs

            document
                .querySelectorAll(".faq-item")
                .forEach(item => {

                    item.classList.remove(
                        "active"
                    );


                    const itemAnswer =
                        item.querySelector(
                            ".faq-answer"
                        );


                    if (itemAnswer) {

                        itemAnswer.style.maxHeight =
                            null;

                    }

                });


            // Open selected FAQ

            if (!isActive) {

                faqItem.classList.add(
                    "active"
                );


                answer.style.maxHeight =
                    answer.scrollHeight + "px";

            }

        }
    );

});
