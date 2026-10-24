const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const nav = document.querySelector(".nav");

if (menuToggle && navMenu && nav) {
    const closeMobileMenu = () => {
        nav.classList.remove("mobile-open");
        navMenu.classList.remove("active");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
    };

    // Open and close the mobile menu
    menuToggle.addEventListener("click", () => {
        const isOpen = navMenu.classList.toggle("active");

        nav.classList.toggle("mobile-open", isOpen);
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
            closeMobileMenu();
        });
    });

    // Close menu when clicking outside the navbar
    document.addEventListener("click", (event) => {
        if (!event.target.closest(".nav")) {
            closeMobileMenu();
        }
    });

    // Close mobile menu when resizing to desktop
    window.addEventListener("resize", () => {
        if (window.innerWidth > 850) {
            closeMobileMenu();
        }
    });
}

const projectSection = document.querySelector(".projects-section");
const projectGrid = projectSection?.querySelector(".projects-grid");
const previousProjectButton = projectSection?.querySelector(".project-previous");
const nextProjectButton = projectSection?.querySelector(".project-next");

if (projectSection && projectGrid && previousProjectButton && nextProjectButton) {
    const hotelProject = [...projectGrid.querySelectorAll(".project-card")].find(
        (project) => project.querySelector("h3")?.textContent.trim() === "Luxury Hotel"
    );

    if (hotelProject) {
        projectGrid.prepend(hotelProject);
    }

    const projects = [...projectGrid.querySelectorAll(".project-card")];
    const currentProjectLabel = projectSection.querySelector(".project-current");
    let currentProjectIndex = 0;

    projects.forEach((project) => {
        project.removeAttribute("data-aos");
        project.removeAttribute("data-aos-delay");
    });

    const showProject = (index) => {
        currentProjectIndex = (index + projects.length) % projects.length;
        const counterText = `${String(currentProjectIndex + 1).padStart(2, "0")} / ${String(projects.length).padStart(2, "0")}`;

        projects.forEach((project, projectIndex) => {
            const isActive = projectIndex === currentProjectIndex;
            const preview = project.querySelector(".project-preview");
            const meta = project.querySelector(".project-meta");
            const projectNumber = meta?.querySelector("span:first-child");
            const projectLink = project.querySelector(".project-link");
            const previewVideo = project.querySelector("video");
            let counter = preview?.querySelector(".project-counter");

            project.hidden = !isActive;
            project.classList.toggle("is-active", isActive);
            project.setAttribute("aria-hidden", String(!isActive));

            if (projectNumber) {
                projectNumber.textContent = counterText;
            }

            if (preview && !counter) {
                counter = document.createElement("span");
                counter.className = "project-counter";
                counter.setAttribute("aria-hidden", "true");
                preview.append(counter);
            }

            if (counter) {
                counter.textContent = counterText;
            }

            if (meta) {
                meta.dataset.year = project.dataset.year || "";
            }

            if (projectLink) {
                const title = project.querySelector("h3")?.textContent.trim() || "project";
                projectLink.setAttribute("aria-label", `Explore ${title}`);
            }

            if (previewVideo) {
                previewVideo.autoplay = false;
                if (isActive) {
                    previewVideo.play().catch((error) => {
                        console.warn(
                            "Project preview playback is unavailable; showing its poster instead.",
                            error
                        );
                    });
                } else {
                    previewVideo.pause();
                }
            }
        });

        if (currentProjectLabel) {
            currentProjectLabel.textContent = counterText;
        }
    };

    previousProjectButton.addEventListener("click", () => {
        showProject(currentProjectIndex - 1);
    });

    nextProjectButton.addEventListener("click", () => {
        showProject(currentProjectIndex + 1);
    });

    projectSection.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft") {
            showProject(currentProjectIndex - 1);
        } else if (event.key === "ArrowRight") {
            showProject(currentProjectIndex + 1);
        }
    });

    showProject(currentProjectIndex);
} else if (projectSection) {
    console.error("Project carousel controls or project list are missing.");
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
