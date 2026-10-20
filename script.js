const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {
    // Open and close the mobile menu
    menuToggle.addEventListener("click", () => {
        const isOpen = navMenu.classList.toggle("active");

        menuToggle.classList.toggle("active", isOpen);
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
    });

    // Close menu after selecting a section
    navMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            menuToggle.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
        });
    });

    // Close menu when clicking outside the navbar
    document.addEventListener("click", (event) => {
        if (!event.target.closest(".nav")) {
            navMenu.classList.remove("active");
            menuToggle.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
        }
    });

    // Close mobile menu when resizing to desktop
    window.addEventListener("resize", () => {
        if (window.innerWidth > 850) {
            navMenu.classList.remove("active");
            menuToggle.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
        }
    });
}



/* ==================== EDUCATION GSAP ANIMATIONS ==================== */

document.addEventListener("DOMContentLoaded", () => {
    const educationSection = document.querySelector(".education-section");

    if (!educationSection || typeof gsap === "undefined") {
        return;
    }

    // Register ScrollTrigger when available.
    if (typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);
    }

    const educationHeader = educationSection.querySelector(
        ".education-header"
    );

    const educationItems = educationSection.querySelectorAll(
        ".education-item"
    );

    const educationFooter = educationSection.querySelector(
        ".education-footer"
    );

    // Keep content visible if ScrollTrigger isn't available.
    if (typeof ScrollTrigger === "undefined") {
        gsap.from(educationHeader, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: "power3.out"
        });

        gsap.from(educationItems, {
            opacity: 0,
            y: 35,
            duration: 0.7,
            stagger: 0.2,
            ease: "power3.out",
            delay: 0.15
        });

        gsap.from(educationFooter, {
            opacity: 0,
            y: 20,
            duration: 0.7,
            delay: 0.8,
            ease: "power3.out"
        });

        return;
    }

    // Header reveal.
    gsap.from(educationHeader, {
        scrollTrigger: {
            trigger: educationHeader,
            start: "top 88%",
            once: true
        },
        opacity: 0,
        y: 35,
        duration: 0.9,
        ease: "power3.out"
    });

    // Timeline cards reveal one after another.
    educationItems.forEach((item, index) => {
        const marker = item.querySelector(".education-marker");
        const card = item.querySelector(".education-card");

        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: item,
                start: "top 88%",
                once: true
            }
        });

        timeline
            .from(marker, {
                opacity: 0,
                scale: 0.65,
                duration: 0.55,
                ease: "back.out(1.7)"
            })
            .from(card, {
                opacity: 0,
                x: 35,
                duration: 0.75,
                ease: "power3.out"
            }, "-=0.25");
    });

    // Closing statement reveal.
    gsap.from(educationFooter, {
        scrollTrigger: {
            trigger: educationFooter,
            start: "top 92%",
            once: true
        },
        opacity: 0,
        y: 22,
        duration: 0.8,
        ease: "power3.out"
    });
});
