function isDarkColor(rgb) {
    const [r, g, b] = rgb;
    const brightness = (0.299 * r + 0.587 * g + 0.114 * b);
    return brightness < 128; // Если яркость меньше 128, то темный цвет
}

export const setMouseMovePoint = () => {
    const wrapper = document.querySelectorAll('[data-mouse-move]');

    wrapper.forEach(element => {
        const isDragElement = element.querySelector('.mouse-draggable');
        const dragElementSplitWidth = isDragElement.getBoundingClientRect().width / 2;
        const dragElementSplitHeight = isDragElement.getBoundingClientRect().height / 2;
        isDragElement.classList.remove('show');
        let tick = true;

        if (isDragElement) {
            element.addEventListener('pointerover', (evt) => {
                isDragElement.classList.add('show');

                const startAnimation = (evt) => {
                    const moving = () => {
                        const pageX = evt.clientX - element.getBoundingClientRect().left - dragElementSplitWidth;
                        const pageY = evt.clientY - element.getBoundingClientRect().top - dragElementSplitHeight;

                        const el = document.elementFromPoint(evt.clientX, evt.clientY);
                        if (el && el.classList.contains('swiper-slide')) {
                            const style = getComputedStyle(el);
                            const backgroundColor = style.backgroundColor.match(/\d+/g).map(Number);
                            const isDark = isDarkColor(backgroundColor);

                            if (isDark) {
                                isDragElement.classList.remove('is-light');
                            } else {
                                isDragElement.classList.add('is-light');
                            }
                        }

                        isDragElement.style.left = `${pageX}px`;
                        isDragElement.style.top = `${pageY}px`;

                        tick = true;
                    };

                    if (tick) {
                        tick = false;
                        requestAnimationFrame(moving);
                    }
                };

                const resetAll = () => {
                    isDragElement.classList.remove('show');
                    element.removeEventListener('mousemove', startAnimation);
                };

                element.addEventListener('mousemove', startAnimation);
                element.addEventListener('pointerout', resetAll)
            });
        }
    });
};
