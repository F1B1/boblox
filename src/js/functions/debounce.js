export const debounce = (func, delay=250) => {
    let timer = null;

    return function () {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, arguments)
        }, delay);
    };
  };
