const getScrollbarWidth = () => {
    // Creating invisible container
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll';
    outer.style.msOverflowStyle = 'scrollbar'; 
    document.body.appendChild(outer);

    const inner = document.createElement('div');
    outer.appendChild(inner);

    const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);

    outer.parentNode.removeChild(outer);

    return scrollbarWidth;

  }

  export const observeBody = (arr) => {
    if (!arr[0]) return;

    let scrollbarWidth = getScrollbarWidth();
    const BODY = document.body;

    BODY.style.setProperty('--basic-scroll-width', scrollbarWidth + 'px');

    const observer = new ResizeObserver(() => {
        scrollbarWidth = getScrollbarWidth();
        BODY.style.setProperty('--basic-scroll-width', scrollbarWidth + 'px');
        
        for (let i = 0; i < arr.length; i++) {
          if (BODY.classList.contains(arr[i])) {
            BODY.style.setProperty('--scroll-width', scrollbarWidth + 'px');
            break;
          } else {
            BODY.style.setProperty('--scroll-width', 0);
          }
        }
    });

    observer.observe(BODY); 
  };

