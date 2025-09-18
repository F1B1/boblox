import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger.js";

gsap.registerPlugin(ScrollTrigger);


export const gsapAnim = () => {
    const tablet = matchMedia("(max-width: 768px)");
    const mainImage = document.querySelector('.comfort__main-image');

    const changeImage = (slide) => {
        const newImageSrc = slide.dataset.image;
        if (mainImage.src !== newImageSrc) {
            gsap.to(mainImage, {
                opacity: 0,
                duration: 0.3,
                onComplete: () => {
                    mainImage.src = newImageSrc;
                    gsap.to(mainImage, { opacity: 1, duration: 0.3 });
                }
            });
        }
        document.querySelectorAll('.comfort__swiper .swiper-slide').forEach(el => el.classList.remove('active'));
        slide.classList.add('active');
    };

    const setupAnimation = () => {
        if (document.querySelector(".comfort__body") && !tablet.matches) {
            document.querySelectorAll('.comfort__swiper .swiper-slide').forEach(slide => {
                ScrollTrigger.create({
                    trigger: slide,
                    start: "top center",
                    end: "bottom center",
                    onEnter: () => changeImage(slide),
                    onEnterBack: () => changeImage(slide),
                });
            });
        } else {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        }
    };

    setupAnimation();
    window.addEventListener('resize', setupAnimation);
};
