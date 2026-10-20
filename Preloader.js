const pagePreloader = document.getElementById("pagePreloader");
const preloaderName = document.getElementById("preloaderName");
const pageRoot = document.documentElement;

if (pagePreloader && preloaderName) {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
        pagePreloader.remove();
        pageRoot.classList.remove("has-preloader");
    } else {
        const name = "SADEV PAHASARA";
        let characterIndex = 0;

        const typeName = () => {
            preloaderName.textContent = name.slice(0, characterIndex);
            characterIndex += 1;

            if (characterIndex <= name.length) {
                window.setTimeout(typeName, 90);
                return;
            }

            window.setTimeout(() => {
                pagePreloader.classList.add("is-exiting");

                window.setTimeout(() => {
                    pagePreloader.classList.add("is-opening");

                    window.setTimeout(() => {
                        pagePreloader.remove();
                        pageRoot.classList.remove("has-preloader");
                    }, 1600);
                }, 450);
            }, 350);
        };

        typeName();
    }
}