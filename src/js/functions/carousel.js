/**
 * Custom slider on vanilla JS beta 1.3v
 * data-active-index="4" - set current index
 * data-slider-loop - set loop for slider
 * data-slider-controls="class"
 * data-slider-bind="class another slider" - it binds all sliders
 * data-slider-autoplay="Number ms" - autoplay slider
 * data-slide-animation='0.5s ease' - if you have any animation with transition on slide, you need to set it.
 */
/**
 * .slider > slider-wrapper > slider-slide - it's main classes
 * .slider-prev - btn for controls
 * .slider-next -btn for controls
 * .slider-scrollbar > .slider-scrollbar-active
 *
 **** If you have bind, you dont need to add data-slider autoplay and controls, and button for all sliders, only for one
 */

 const IS_DELAY = 700;

 /**
  * Remove and add active classes for slide
  * @param {Array} slides
  */
 const resetAllClasses = (slides) => {
     slides.slides.forEach(item => {
         item.classList.remove('slider-slide-active');
         item.classList.remove('slider-slide-next');
         item.classList.remove('slider-slide-prev');
     });

     slides.activeSlide?.classList.add('slider-slide-active');
     slides.prevSlide?.classList.add('slider-slide-prev');
     slides.nextSlide?.classList.add('slider-slide-next');
 };

 /**
  * Updating the active class
  * @param {NodeList | Array} wrapper - all slides
  * @param {number} activeIndex - current slide index
  *  */
 const updateActiveClass = (wrapper, activeIndex, loop = false) => {
     const slides = Array.from(wrapper);
     const SLIDES = {
         slides: slides,
         activeSlide: slides[activeIndex],
         prevSlide: slides[activeIndex - 1],
         nextSlide: slides[activeIndex + 1],
     }

     if (loop) {
         SLIDES.activeSlide?.classList.add('slider-slide-active');
         SLIDES.prevSlide?.classList.add('slider-slide-prev');
         SLIDES.nextSlide?.classList.add('slider-slide-next');

         setTimeout(() => {
             resetAllClasses(SLIDES)
         }, 20);
     } else {
         resetAllClasses(SLIDES);
     }
 }

 /**
  * Set default settings on slider
  * @param {HTML Element} slider - main slider
  * @param {HTML element} wrapper - div in slide with class wrapper
  * @param {number} activeIndex - current slide index
  * @param {NodeList | Array} slides - all slides
  */
 const setDefaultSettings = (slider, wrapper, activeIndex, slides, buttons, scrollbar) => {
     updateActiveClass(slides, activeIndex);

     const activeSlide = slides[activeIndex];

     if (buttons[0] && buttons[1]) {
         buttons.forEach(item => {
             item.style.cssText = `
                 cursor: pointer;
                 padding: 0;
                 border: 0;
                 z-index: 1;
             `
         });
     }

     if (scrollbar[0] && scrollbar[1]) {
         scrollbar[1].style.width = `${scrollbar[0].getBoundingClientRect().width / (slides.length / 3)}px`
     }

     wrapper.style.cssText = `
         display: -webkit-box;
         display: -ms-flexbox;
         display: flex;
         -webkit-box-align: flex-start;
         -ms-flex-align: flex-start;
         align-items: flex-start;
         width: -webkit-max-content;
         width: -moz-max-content;
         width: max-content;
         will-change: transform;
     `;

     slider.style.cssText = `
         overflow: hidden;
         width: 100%;
         position: relative;
     `;

     setTimeout(() => {
         const width = (slider.getBoundingClientRect().width / 2 - activeSlide.getBoundingClientRect().left) - (activeSlide.getBoundingClientRect().width / 2) + wrapper.getBoundingClientRect().left;
         wrapper.style.transform = `translate3d(${width}px, 0, 0)`;
     }, IS_DELAY)
 };

 /**
  * Create 2 copy of all slides
  * @param {NodeList | Array} slides
  * @returns {DocumentFragment} - list of copy slides
  */
 const createCopy = (slides) => {
     const temp = document.createDocumentFragment();

     for (let j = 0; j < 2; j++) {
         for (let i = 0; i < slides.length; i++) {
             const clone = slides[i].cloneNode(true);

             temp.append(clone);
         }
     }
     return temp;
 };

 /**
  *
  * @param {HTML element} elem
  */
 const clearTransition = (elem) => {
     elem.style.transition = '0s ease';
 };

 /**
  *
  * @param {HTML element} elem
  */
 const setTransition = (elem) => {
     elem.style.transition = elem.dataset.slideAnimation.length > 0 ? elem.dataset.slideAnimation : '0.5s ease';
 };

 /**
  * Main Slider
  */
 export const slider = () => {
     const slider = document.querySelectorAll('.slider');
     const SLIDERS = [];
     const BIND_SLIDERS = {};
     if (!slider[0]) return;

     slider.forEach((slider, i) => {
         SLIDERS[i] = {};
         const currentSlider = SLIDERS[i];
         currentSlider.wrapper = slider.querySelector('.slider-wrapper');
         currentSlider.slides = Array.from(slider.querySelectorAll('.slider-slide'));
         currentSlider.BASE_QUANTITY = currentSlider.slides.length;
         currentSlider.MAX_QUANTITY = currentSlider.slides.length * 2;
         currentSlider.startMove = slider.dataset.activeIndex ? slider.dataset.activeIndex : 0;
         currentSlider.scrollbar = [slider.querySelector('.slider-scrollbar'), slider.querySelector('.slider-scrollbar-active')];
         currentSlider.buttons = [slider.querySelector('.slider-prev'), slider.querySelector('.slider-next')];

         let isLoop = slider.dataset.sliderLoop === undefined ? false : true;
         let isBind = slider.dataset?.sliderBind?.length > 0 ? slider.dataset.sliderBind : false;
         let isControls = slider.dataset.sliderControls === undefined ? false : slider;
         let isAutoplay = slider.dataset?.sliderAutoplay?.length > 0 ? slider.dataset.sliderAutoplay : false;
         let direction = 0;
         let upMouseReference = null;
         let moveMouseReference = null;

         if (isBind) {
             BIND_SLIDERS[isBind] = BIND_SLIDERS[isBind] ? [...BIND_SLIDERS[isBind], currentSlider] : [currentSlider];
         }

         if (isLoop) {
             currentSlider.wrapper.append(createCopy(currentSlider.slides));
             currentSlider.slides = slider.querySelectorAll('.slider-slide');
         }

         currentSlider.activeIndex = +slider.dataset.activeIndex ? (+slider.dataset.activeIndex - 1) + currentSlider.BASE_QUANTITY : 0;
         if (currentSlider.activeIndex > currentSlider.slides.length) currentSlider.activeIndex = 0;
         setDefaultSettings(slider, currentSlider.wrapper, currentSlider.activeIndex, currentSlider.slides, currentSlider.buttons, currentSlider.scrollbar);

         currentSlider.sliderWidth = null;
         currentSlider.activeWidth = null;
         currentSlider.differenceWidth = null;
         setTimeout(() => {
             currentSlider.sliderWidth = slider.getBoundingClientRect().width;
             currentSlider.activeWidth = currentSlider.wrapper.children[currentSlider.activeIndex].getBoundingClientRect().width;
             currentSlider.differenceWidth = currentSlider.activeWidth - currentSlider.wrapper.children[currentSlider.activeIndex + 1]?.getBoundingClientRect().width;
         }, IS_DELAY);

         currentSlider.centerSlides = (slider.getBoundingClientRect().width / 2 - currentSlider.slides[currentSlider.activeIndex].getBoundingClientRect().left) - (currentSlider.slides[currentSlider.activeIndex].getBoundingClientRect().width / 2);
         currentSlider.width = null;

         /**
          * Smooth animaton using requestAnimationFrame
          */
         const smoothMove = () => {
             currentSlider.wrapper.style.transform = `translate3d(${currentSlider.width}px, 0, 0)`;

             requestAnimationFrame(smoothMove);
         };
         smoothMove();

         /**
              * Find direction when moving mouse
              * @param {Event} evt
              */
         const startMove = (startXPos, link, evt) => {
             const mouseCenter = evt.clientX - startXPos;

             if (link) {
                 link.style.pointerEvents = 'none';
             }

             if (BIND_SLIDERS[isBind]) {
                 BIND_SLIDERS[isBind].forEach(item => {
                     item.width = item.centerSlides + mouseCenter;
                 })
             } else {
                 currentSlider.width = currentSlider.centerSlides + mouseCenter;
             }
             if (mouseCenter < -5) {
                 direction = -1;
             } else if (mouseCenter > 5) {
                 direction = 1;
             } else {
                 direction = 0;
             }
         };

         /**
          * Find active index
          * @returns {number} - active index of carousel
          */
         const getActiveIndex = (item) => {
             let result = direction === -1 ? item.activeIndex + 1 : direction === 1 ? item.activeIndex - 1 : item.activeIndex;
             if (result > item.slides.length - 1) {
                 result = item.slides.length - 1;
             }
             if (result < 0) {
                 result = 0;
             }
             return result;
         };


         const checkIsTransition = (item, animationSlide, prevAnimationSlide, nextAnimationSlide) => {
             setTimeout(() => {
                 item.wrapper.style.transition = '0.5s ease';
                 if (animationSlide) {
                     setTransition(animationSlide);
                 }
                 if (prevAnimationSlide) {
                     setTransition(prevAnimationSlide);
                 }
                 if (nextAnimationSlide) {
                     setTransition(nextAnimationSlide);
                 }
             }, 13);
         };

         const checkEndOfSlider = (item, lastActive) => {
             const lastSlide = item.wrapper.children[lastActive].querySelector('[data-slide-animation]');
             const animationSlide = item.wrapper.children[item.activeIndex].querySelector('[data-slide-animation]');
             const prevAnimationSlide = item.wrapper.children[item.activeIndex - 1].querySelector('[data-slide-animation]');
             const nextAnimationSlide = item.wrapper.children[item.activeIndex + 1].querySelector('[data-slide-animation]');

             item.wrapper.style.transition = '0s ease';

             if (animationSlide) {
                 clearTransition(animationSlide);
             }
             if (prevAnimationSlide) {
                 clearTransition(prevAnimationSlide);
             }
             if (nextAnimationSlide) {
                 clearTransition(nextAnimationSlide);
             }

             updateActiveClass(item.wrapper.children, item.activeIndex, true);

             if (direction === -1) {
                 item.centerSlides = item.width = (item.sliderWidth / 2 - (item.wrapper.children[item.activeIndex].getBoundingClientRect().left)) - (item.activeWidth / 2) + item.wrapper.getBoundingClientRect().left;
             }
             if (direction === 1) {
                if (lastSlide) {
                    clearTransition(lastSlide);
                }
                 item.centerSlides = item.width = (item.sliderWidth / 2 - (item.wrapper.children[item.activeIndex].getBoundingClientRect().left)) - (item.activeWidth / 2) + item.wrapper.getBoundingClientRect().left;

                 setTimeout(() => {
                     item.centerSlides = item.width = (item.sliderWidth / 2 - (item.wrapper.children[item.activeIndex].getBoundingClientRect().left)) - (item.activeWidth / 2) + item.wrapper.getBoundingClientRect().left;
                     checkIsTransition(item, animationSlide, prevAnimationSlide, nextAnimationSlide);
                 }, 20)
             } else {
                 checkIsTransition(item, animationSlide, prevAnimationSlide, nextAnimationSlide);
             }
         };


         /**
          * Change position of slider when slider is over
          */
         const animationLoopSlide = (lastActive) => {
             if (BIND_SLIDERS[isBind]) {
                 BIND_SLIDERS[isBind].forEach(item => {
                     checkEndOfSlider(item, lastActive)
                 });
             } else {
                 checkEndOfSlider(currentSlider, lastActive);
             }
         };

         const checkCondition = (item) => {
             if (direction === -1) {
                 if (item.activeIndex >= item.MAX_QUANTITY) {
                     let lastActive = item.activeIndex;
                     item.activeIndex = item.activeIndex - item.BASE_QUANTITY;
                     animationLoopSlide(lastActive);
                 }
             }
             if (direction === 1) {
                 if (item.activeIndex + 1 <= item.BASE_QUANTITY) {
                     let lastActive = item.activeIndex;
                     item.activeIndex = item.BASE_QUANTITY + item.activeIndex;
                     animationLoopSlide(lastActive);
                 }
             }
         };

         /**
          * Update slider if it's in a loop
          */
         const updateSlider = () => {
             if (!isLoop) return;

             if (BIND_SLIDERS[isBind]) {
                 BIND_SLIDERS[isBind].forEach(item => {
                     checkCondition(item);
                 });
             } else {
                 checkCondition(currentSlider);
             }
         };

         /**
          *
          * @param {Object} item
          */
         const checkDirection = (item) => {
             if (direction === 1) {
                 item.centerSlides = item.width = (item.sliderWidth / 2 - (item.wrapper.children[item.activeIndex].getBoundingClientRect().left)) - (item.activeWidth / 2) + item.wrapper.getBoundingClientRect().left;
             }
             if (direction === -1) {
                 item.centerSlides = item.width = (item.sliderWidth / 2 - (item.wrapper.children[item.activeIndex].getBoundingClientRect().left - item.differenceWidth)) - (item.activeWidth / 2) + item.wrapper.getBoundingClientRect().left;
             }
         };

         const hasScrollbar = () => {
             let scrollbarMain = currentSlider.scrollbar[0];
             let scrollbarActive = currentSlider.scrollbar[1];
             let scrollbarBind = null;

             if (isBind) {
                 scrollbarBind = BIND_SLIDERS[isBind].find(item => {
                     return item.scrollbar[0];
                 });

                 scrollbarMain = scrollbarBind.scrollbar[0];
                 scrollbarActive = scrollbarBind.scrollbar[1];
             } else {
                 scrollbarBind = currentSlider;
             }

             if (scrollbarMain && scrollbarActive) {
                 if (direction === 1) {
                     scrollbarBind.startMove -= 1;
                 }
                 if (direction === -1) {
                     scrollbarBind.startMove += 1;
                 }

                 if (scrollbarBind.startMove < 0) scrollbarBind.startMove = scrollbarBind.BASE_QUANTITY - 1;
                 if (scrollbarBind.startMove > scrollbarBind.BASE_QUANTITY - 1)  scrollbarBind.startMove = 0;

                 const getPieceWidth = scrollbarMain.getBoundingClientRect().width / scrollbarBind.BASE_QUANTITY;
                 scrollbarActive.style.transform = `translate3d(${getPieceWidth * scrollbarBind.startMove}px, 0, 0)`;
             }
         };


         /**
          * Set base active slider and reset all if event mouseup
          * @param {Event} evt
          */
         const upMouse = (index = false, startXPos, link, evt) => {
             if (link) {
                 link.style.pointerEvents = 'initial';
             }
             document.removeEventListener('pointerup', upMouseReference);
             document.removeEventListener('touchend', upMouseReference);
             currentSlider.wrapper.removeEventListener('pointermove', moveMouseReference);

             if (BIND_SLIDERS[isBind]) {
                 BIND_SLIDERS[isBind].forEach(item => {
                     item.activeIndex = index ? index : getActiveIndex(item);
                     checkDirection(item);
                     updateActiveClass(item.wrapper.children, item.activeIndex);
                 });
             } else {
                 currentSlider.activeIndex = index ? index : getActiveIndex(currentSlider)
                 checkDirection(currentSlider);
                 updateActiveClass(currentSlider.wrapper.children, currentSlider.activeIndex);
             }

             setTimeout(() => updateSlider(), 450);
             hasScrollbar();
         };

         const checkButtons = () => {
             if (currentSlider.buttons[0] && currentSlider.buttons[1]) {
                 currentSlider.buttons.forEach(button => {
                     button.addEventListener('click', (evt) => {
                         const obj = {
                             'prev': function () {
                                 let result = currentSlider.activeIndex - 1;
                                 direction = 1;
                                 upMouse(result);
                             },
                             'next': function () {
                                 let result = currentSlider.activeIndex + 1;
                                 direction = -1;
                                 upMouse(result);
                             },
                         }
                         const whichButton = button.classList.contains('slider-prev') ? 'prev' : 'next';
                         obj[whichButton]?.();
                     });
                 })
             }
         }
         checkButtons();

         const checkAutoplay = () => {
             if (isAutoplay) {
                 setInterval(() => {
                     direction = -1;
                     upMouse(currentSlider.activeIndex + 1);
                 }, isAutoplay);
             }
         }
         checkAutoplay();

         const hasControls = () => {
             if (isControls) {
                 currentSlider.slides.forEach((slide, i) => {
                     slide.addEventListener('click', (evt) => {
                         if (i > currentSlider.activeIndex) {
                             direction = -1;
                         }
                         if (i < currentSlider.activeIndex) {
                             direction = 1;
                         }
                         if (i === currentSlider.activeIndex) {
                             direction = 0;
                         }

                         upMouse(i);
                     });
                 });
             }
         };
         hasControls();

         /**
          * On clickdown mouse
          * @param {Event} evt
          */
         const mouseDown = (evt) => {
             let startXPos = evt.clientX;
             let link = evt.target.closest('a');
             direction = 0;

             upMouseReference = upMouse.bind(null, false, startXPos, link);
             moveMouseReference = startMove.bind(null, startXPos, link)
             currentSlider.wrapper.addEventListener('pointermove', moveMouseReference);
             document.addEventListener('pointerup', upMouseReference);
             document.addEventListener('touchend', upMouseReference);
         };

         currentSlider.wrapper.addEventListener('pointerdown', mouseDown);
         currentSlider.wrapper.ondragstart = () => false;
         window.addEventListener('resize', () => {
             setTimeout(() => {
                 currentSlider.sliderWidth = slider.getBoundingClientRect().width;
                 currentSlider.activeWidth = currentSlider.wrapper.children[currentSlider.activeIndex].getBoundingClientRect().width;
                 currentSlider.differenceWidth = currentSlider.activeWidth - currentSlider.wrapper.children[currentSlider.activeIndex + 1]?.getBoundingClientRect().width;
                 currentSlider.centerSlides = currentSlider.width = (currentSlider.sliderWidth / 2 - (currentSlider.wrapper.children[currentSlider.activeIndex].getBoundingClientRect().left)) - (currentSlider.activeWidth / 2) + currentSlider.wrapper.getBoundingClientRect().left;
             }, 100)
         });
     });
 };
