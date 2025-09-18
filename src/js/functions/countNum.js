import { splitNumber } from './splitNumber.js';

const TIMER = 1000;
const ELEMENTS = new Map();
const STEPS = 100;

const moveNum = (elem, num) => {
    let time = Math.floor(TIMER / STEPS);
    let count = 1;
    let increment = num / STEPS;

    setTimeout(function timer() {
        if (count > STEPS) return;
        elem.textContent = splitNumber(Math.floor(increment * count));
        count++;
        setTimeout(timer, time);
    }, time);
};

const animationCount = (entries, observer) => {
    entries.forEach((entry) => {
        const target = entry.target;
        target.textContent = 0;

        if (entry.isIntersecting) {
            moveNum(target, ELEMENTS.get(target));
            observer.unobserve(target);
        } else {
            target.textContent = 0;
        }
    });
};

export const countAnime = () => {
    const countList = document.querySelectorAll('[data-count-anime]');

    if (!countList[0]) return;

    const observer = new IntersectionObserver(animationCount, {
        threshold: 0,
        rootMargin: '0px 0px 0px 0px',
    });

    countList.forEach(item => {
        ELEMENTS.set(item, +item.textContent);
        observer.observe(item);
    });
};
