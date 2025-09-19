export const gameHandler = ()=>{
    if(document.querySelector(".game__game")) {
        const game = document.querySelector(".game__game");
        const iframe = game.querySelector("iframe");
        const btnLike = game.querySelector(".game__like");
        const btnDislike = game.querySelector(".game__dislike");
        const btnFullscreen = game.querySelector(".game__fullscreen");

        const savedState = localStorage.getItem("gameVote");
        if (savedState === "like") {
            btnLike.classList.add("active");
        } else if (savedState === "dislike") {
            btnDislike.classList.add("active");
        }

        btnLike.addEventListener("click", () => {
            btnLike.classList.toggle("active");
            if (btnLike.classList.contains("active")) {
            btnDislike.classList.remove("active");
            localStorage.setItem("gameVote", "like");
            } else {
            localStorage.removeItem("gameVote");
            }
        });

        btnDislike.addEventListener("click", () => {
            btnDislike.classList.toggle("active");
            if (btnDislike.classList.contains("active")) {
            btnLike.classList.remove("active");
            localStorage.setItem("gameVote", "dislike");
            } else {
            localStorage.removeItem("gameVote");
            }
        })

    function isMobileDevice() {
        return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }


    function lockLandscapeOrientation() {
        if (screen.orientation && screen.orientation.lock) {
            screen.orientation.lock('landscape-primary').catch(err => {
                console.log('Не удалось заблокировать ориентацию:', err);
            });
        }
    }

 
    function unlockOrientation() {
        if (screen.orientation && screen.orientation.unlock) {
            screen.orientation.unlock();
        }
    }


    function enterFullscreen() {
        if (isMobileDevice()) {
            game.classList.add('full-mobile');
            lockLandscapeOrientation();
        } else {
            game.classList.add('full');
        }
        document.body.classList.add('no-scrolling');
        
    }

  
    function exitFullscreen() {
        game.classList.remove('full', 'full-mobile');
        document.body.classList.remove('no-scrolling');
        unlockOrientation();
    }

    function toggleFullscreen() {
        const isFullscreen = game.classList.contains('full') || game.classList.contains('full-mobile');
        
        if (isFullscreen) {
            exitFullscreen();
        } else {
            enterFullscreen();
        }
    }

    
    if (isMobileDevice()) {
  
        setTimeout(() => {
            enterFullscreen();
        }, 100);
    }

    if (btnFullscreen) {
        btnFullscreen.addEventListener('click', function(e) {
            e.preventDefault();
            toggleFullscreen();
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const isFullscreen = game.classList.contains('full') || game.classList.contains('full-mobile');
            if (isFullscreen) {
                exitFullscreen();
            }
        }
    });

    window.addEventListener('orientationchange', function() {
        if (isMobileDevice() && (game.classList.contains('full-mobile'))) {

            setTimeout(() => {
                lockLandscapeOrientation();
            }, 100);
        }
    });


    window.addEventListener('resize', function() {

        if (!isMobileDevice() && game.classList.contains('full-mobile')) {
            game.classList.remove('full-mobile');
            game.classList.add('full');
        }
       
        else if (isMobileDevice() && game.classList.contains('full')) {
            game.classList.remove('full');
            game.classList.add('full-mobile');
            lockLandscapeOrientation();
        }
    });


    if (isMobileDevice()) {
        window.addEventListener('beforeunload', function(e) {
            unlockOrientation();
        });
    }


    }
}