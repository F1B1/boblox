import Swiper from 'swiper/bundle';

export const setSwipers = () => {

    let sliderContinue = new Swiper(".continue__swiper", {
        slidesPerView: 'auto',
        spaceBetween: 10,
        navigation:{
            nextEl: '.continue__button-next',
            prevEl: '.continue__button-prev',
        },
        breakpoints: {
            768: {
                spaceBetween: 16,
            }
        },
    });
};
