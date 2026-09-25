/* ========================================
   BEAUTEX STYLE AVENUE
   JAVASCRIPT
======================================== */


/* ========================================
   MOBILE MENU
======================================== */

const mobileMenuButton =
    document.getElementById("mobileMenuButton");

const mainNavigation =
    document.getElementById("mainNavigation");


if (mobileMenuButton && mainNavigation) {

    mobileMenuButton.addEventListener(
        "click",
        function () {

            mainNavigation.classList.toggle(
                "mobile-menu-open"
            );


            if (
                mainNavigation.classList.contains(
                    "mobile-menu-open"
                )
            ) {

                mobileMenuButton.innerHTML = "✕";

            } else {

                mobileMenuButton.innerHTML = "☰";

            }

        }
    );


    const navigationLinks =
        mainNavigation.querySelectorAll("a");


    navigationLinks.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function () {

                    mainNavigation.classList.remove(
                        "mobile-menu-open"
                    );

                    mobileMenuButton.innerHTML =
                        "☰";

                }
            );

        }
    );

}



/* ========================================
   GALLERY LIGHTBOX
======================================== */

const galleryImages =
    document.querySelectorAll(
        ".gallery-item img"
    );


const photoLightbox =
    document.getElementById(
        "photoLightbox"
    );


const lightboxImage =
    document.getElementById(
        "lightboxImage"
    );


const closeLightbox =
    document.getElementById(
        "closeLightbox"
    );


const previousPhoto =
    document.getElementById(
        "prevPhoto"
    );


const nextPhoto =
    document.getElementById(
        "nextPhoto"
    );


let currentPhotoIndex = 0;


const photoSources = [];


galleryImages.forEach(
    function (image, index) {

        photoSources.push(
            image.src
        );


        image.parentElement.addEventListener(
            "click",
            function () {

                currentPhotoIndex =
                    index;

                openLightbox();

            }
        );

    }
);


function openLightbox() {

    if (
        !photoLightbox ||
        !lightboxImage
    ) {

        return;

    }


    lightboxImage.src =
        photoSources[
            currentPhotoIndex
        ];


    photoLightbox.classList.add(
        "active"
    );


    document.body.style.overflow =
        "hidden";

}


function closePhotoLightbox() {

    if (!photoLightbox) {

        return;

    }


    photoLightbox.classList.remove(
        "active"
    );


    document.body.style.overflow =
        "";

}


function showPreviousPhoto() {

    if (
        photoSources.length === 0
    ) {

        return;

    }


    currentPhotoIndex--;


    if (
        currentPhotoIndex < 0
    ) {

        currentPhotoIndex =
            photoSources.length - 1;

    }


    lightboxImage.src =
        photoSources[
            currentPhotoIndex
        ];

}


function showNextPhoto() {

    if (
        photoSources.length === 0
    ) {

        return;

    }


    currentPhotoIndex++;


    if (
        currentPhotoIndex >=
        photoSources.length
    ) {

        currentPhotoIndex = 0;

    }


    lightboxImage.src =
        photoSources[
            currentPhotoIndex
        ];

}


if (closeLightbox) {

    closeLightbox.addEventListener(
        "click",
        closePhotoLightbox
    );

}


if (previousPhoto) {

    previousPhoto.addEventListener(
        "click",
        showPreviousPhoto
    );

}


if (nextPhoto) {

    nextPhoto.addEventListener(
        "click",
        showNextPhoto
    );

}


if (photoLightbox) {

    photoLightbox.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                photoLightbox
            ) {

                closePhotoLightbox();

            }

        }
    );

}


/* Keyboard controls */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            !photoLightbox ||
            !photoLightbox.classList.contains(
                "active"
            )
        ) {

            return;

        }


        if (
            event.key ===
            "Escape"
        ) {

            closePhotoLightbox();

        }


        if (
            event.key ===
            "ArrowLeft"
        ) {

            showPreviousPhoto();

        }


        if (
            event.key ===
            "ArrowRight"
        ) {

            showNextPhoto();

        }

    }
);



/* ========================================
   BACK TO TOP
======================================== */

const backToTop =
    document.getElementById(
        "backToTop"
    );


if (backToTop) {

    window.addEventListener(
        "scroll",
        function () {

            if (
                window.scrollY > 500
            ) {

                backToTop.classList.add(
                    "show"
                );

            } else {

                backToTop.classList.remove(
                    "show"
                );

            }

        }
    );


    backToTop.addEventListener(
        "click",
        function () {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

}



/* ========================================
   SCROLL ANIMATIONS
======================================== */

const animatedElements =
    document.querySelectorAll(
        ".service-card, .why-card, .gallery-item, .contact-card, .reviews-premium-card, .booking-container, .faq-item"
    );


if (
    "IntersectionObserver"
    in window
) {

    const observer =
        new IntersectionObserver(

            function (entries) {

                entries.forEach(
                    function (entry) {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );


                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },

            {
                threshold: 0.12
            }

        );


    animatedElements.forEach(
        function (element) {

            element.classList.add(
                "fade-in"
            );


            observer.observe(
                element
            );

        }
    );

}



/* ========================================
   BOOKING FORM
======================================== */

const bookingForm =
    document.getElementById(
        "bookingForm"
    );


if (bookingForm) {

    bookingForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const customerName =
                document.getElementById(
                    "customerName"
                ).value.trim();


            const customerPhone =
                document.getElementById(
                    "customerPhone"
                ).value.trim();


            const service =
                document.getElementById(
                    "service"
                ).value;


            const bookingDate =
                document.getElementById(
                    "bookingDate"
                ).value;


            const bookingTime =
                document.getElementById(
                    "bookingTime"
                ).value;


            const bookingMessage =
                document.getElementById(
                    "bookingMessage"
                ).value.trim();



            if (
                !customerName ||
                !customerPhone ||
                !service ||
                !bookingDate ||
                !bookingTime
            ) {

                alert(
                    "Please complete all required booking fields."
                );

                return;

            }



            /* Format date */

            let formattedDate =
                bookingDate;


            if (bookingDate) {

                const date =
                    new Date(
                        bookingDate +
                        "T00:00:00"
                    );


                formattedDate =
                    date.toLocaleDateString(
                        "en-ZA",
                        {
                            weekday:
                                "long",

                            year:
                                "numeric",

                            month:
                                "long",

                            day:
                                "numeric"
                        }
                    );

            }



            /* Format time */

            let formattedTime =
                bookingTime;


            if (bookingTime) {

                const timeParts =
                    bookingTime.split(":");


                let hours =
                    parseInt(
                        timeParts[0],
                        10
                    );


                const minutes =
                    timeParts[1];


                const period =
                    hours >= 12
                        ? "PM"
                        : "AM";


                hours =
                    hours % 12 || 12;


                formattedTime =
                    hours +
                    ":" +
                    minutes +
                    " " +
                    period;

            }



            /* Create WhatsApp message */

            let whatsappMessage =
                "Hi Beautex Style Avenue! 👋\n\n" +

                "I would like to make a booking.\n\n" +

                "*Booking Details*\n" +

                "Name: " +
                customerName +
                "\n" +

                "Phone: " +
                customerPhone +
                "\n" +

                "Service: " +
                service +
                "\n" +

                "Preferred Date: " +
                formattedDate +
                "\n" +

                "Preferred Time: " +
                formattedTime;



            if (bookingMessage) {

                whatsappMessage +=
                    "\n\nAdditional Message: " +
                    bookingMessage;

            }


            whatsappMessage +=
                "\n\nThank you!";


            const whatsappNumber =
                "27840462860";


            const whatsappURL =
                "https://wa.me/" +
                whatsappNumber +
                "?text=" +
                encodeURIComponent(
                    whatsappMessage
                );


            window.open(
                whatsappURL,
                "_blank"
            );

        }
    );

}



/* ========================================
   PREVENT PAST DATES
======================================== */

const bookingDateInput =
    document.getElementById(
        "bookingDate"
    );


if (bookingDateInput) {

    const today =
        new Date();


    const year =
        today.getFullYear();


    const month =
        String(
            today.getMonth() + 1
        ).padStart(
            2,
            "0"
        );


    const day =
        String(
            today.getDate()
        ).padStart(
            2,
            "0"
        );


    const todayFormatted =
        year +
        "-" +
        month +
        "-" +
        day;


    bookingDateInput.min =
        todayFormatted;

}



/* ========================================
   ACTIVE NAVIGATION
======================================== */

const sections =
    document.querySelectorAll(
        "section[id]"
    );


const navLinks =
    document.querySelectorAll(
        ".navbar nav a"
    );


window.addEventListener(
    "scroll",
    function () {

        let currentSection = "";


        sections.forEach(
            function (section) {

                const sectionTop =
                    section.offsetTop -
                    120;


                const sectionHeight =
                    section.offsetHeight;


                if (
                    window.scrollY >=
                    sectionTop
                ) {

                    currentSection =
                        section.getAttribute(
                            "id"
                        );

                }

            }
        );


        navLinks.forEach(
            function (link) {

                link.classList.remove(
                    "active"
                );


                const href =
                    link.getAttribute(
                        "href"
                    );


                if (
                    href ===
                    "#" +
                    currentSection
                ) {

                    link.classList.add(
                        "active"
                    );

                }

            }
        );

    }
);



/* ========================================
   FAQ ACCORDION
======================================== */

const faqItems =
    document.querySelectorAll(
        ".faq-item"
    );


faqItems.forEach(
    function (item) {

        const question =
            item.querySelector(
                ".faq-question"
            );


        question.addEventListener(
            "click",
            function () {

                const isActive =
                    item.classList.contains(
                        "active"
                    );


                faqItems.forEach(
                    function (otherItem) {

                        otherItem.classList.remove(
                            "active"
                        );

                    }
                );


                if (!isActive) {

                    item.classList.add(
                        "active"
                    );

                }

            }
        );

    }
);