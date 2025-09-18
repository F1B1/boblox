export const lazyLoad = () => {
    var lazyImages = [].slice.call(document.querySelectorAll("[data-src]"));
    let lazyImageObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                let lazyImage = entry.target;
                lazyImage.src = lazyImage.dataset.src;
                lazyImageObserver.unobserve(lazyImage);
                lazyImage.removeAttribute("data-src");

                if (!!lazyImage.load) {
                    lazyImage.load();
                }
            }
        });
    });

    lazyImages.forEach(function (lazyImage) {
        lazyImageObserver.observe(lazyImage);
    });
};
