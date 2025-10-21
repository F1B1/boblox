export const gameHandler = ()=>{
    if(document.querySelector(".game__game")) {
       const fullscreenBtn = document.getElementById('fullscreen-btn');
        const game = document.querySelector(".game__game");
        const header = document.querySelector("header");
        let isAutoFullscreen = false;

        function checkOrientation() {
            let isLandscape;
            
            if (screen.orientation) {
                isLandscape = screen.orientation.type.includes('landscape');
            } else {

                isLandscape = window.innerWidth > window.innerHeight;
            }
            
            if (isLandscape) {
                header.classList.add('horizontal');
            } else {
                header.classList.remove('horizontal');
            }
            
            return isLandscape;
        }

        function checkScreenSize() {
            const isLandscape = checkOrientation();
            
            const shouldAutoFullscreen = (window.innerWidth < 1024 || !isLandscape) && !isFullscreen();
            
            if (shouldAutoFullscreen) {
                isAutoFullscreen = true;
                launchFullScreen();
                game.classList.add('full');
            }
        }

        function isFullscreen() {
            return !!(document.fullscreenElement || 
                    document.webkitFullscreenElement || 
                    document.mozFullScreenElement || 
                    document.msFullscreenElement);
        }

        document.addEventListener('DOMContentLoaded', function() {
            checkOrientation();
            checkScreenSize();
        });

        window.addEventListener('resize', function() {
            checkOrientation();

            setTimeout(checkScreenSize, 50);
        });

        window.addEventListener('orientationchange', function() {
            setTimeout(() => {
                checkOrientation();
                checkScreenSize();
            }, 150);
        });

        if (screen.orientation) {
            screen.orientation.addEventListener('change', function() {
                checkOrientation();
                checkScreenSize();
            });
        }

        fullscreenBtn.addEventListener('click', function(event) {
            event.preventDefault();
            isAutoFullscreen = false;
            
            if (isFullscreen()) {
                exitFullScreen();
                game.classList.remove('full');
            } else {
                launchFullScreen();
                game.classList.add('full');
            }
        });

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
        document.addEventListener('mozfullscreenchange', handleFullscreenChange);
        document.addEventListener('MSFullscreenChange', handleFullscreenChange);

        function handleFullscreenChange() {
            if (!isFullscreen()) {
                game.classList.remove('full');
                
                const isLandscape = checkOrientation();
                if (isAutoFullscreen && (window.innerWidth < 1024 || !isLandscape)) {
                    setTimeout(() => {
                        if (!isFullscreen()) {
                            launchFullScreen();
                            game.classList.add('full');
                        }
                    }, 100);
                }
            }
        }

        function launchFullScreen() {
            const element = document.documentElement; 
            if (element.requestFullscreen) element.requestFullscreen();
            else if (element.mozRequestFullScreen) element.mozRequestFullScreen();
            else if (element.webkitRequestFullscreen) element.webkitRequestFullscreen();
            else if (element.msRequestFullscreen) element.msRequestFullscreen();
        }

        function exitFullScreen() {
            if (document.exitFullscreen) document.exitFullscreen();
            else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
            else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
            else if (document.msExitFullscreen) document.msExitFullscreen();
        }

    }
}