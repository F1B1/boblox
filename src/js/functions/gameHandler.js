export const gameHandler = () => {
  if (document.querySelector(".game__game")) {
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    const game = document.querySelector(".game__game");
    const header = document.querySelector("header");
    let isAutoFullscreen = false;

    function isMobileDevice() {
      return window.innerWidth < 1024;
    }

    function checkOrientation() {
      if (!isMobileDevice()) return false;
      
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

    function isFullscreen() {
      return !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement);
    }

    function launchFullscreenImmediately() {
      if (!isMobileDevice()) return;
      
      if (!isFullscreen()) {
        isAutoFullscreen = true;
        game.classList.add('full');
        
        const element = document.documentElement;
        if (element.requestFullscreen) {
          element.requestFullscreen().catch(err => {
            console.log('Ошибка при автоматическом включении полноэкранного режима:', err);
            setTimeout(launchFullscreenImmediately, 100);
          });
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
          element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
          element.msRequestFullscreen();
        }
      }
    }

    function initFullscreen() {
      checkOrientation();

      setTimeout(() => {
        if (isMobileDevice()) {
          launchFullscreenImmediately();
        }
      }, 100);
    }

    initFullscreen();

    window.addEventListener('load', initFullscreen);

    window.addEventListener('resize', function () {
      checkOrientation();

      if (isMobileDevice()) {
        setTimeout(() => {
          if (!isFullscreen()) {
            launchFullscreenImmediately();
          }
        }, 50);
      }
    });

    window.addEventListener('orientationchange', function () {
      if (!isMobileDevice()) return;
      
      setTimeout(() => {
        checkOrientation();

        if (!isFullscreen()) {
          launchFullscreenImmediately();
        }
      }, 150);
    });

    if (screen.orientation && isMobileDevice()) {
      screen.orientation.addEventListener('change', function () {
        checkOrientation();

        if (!isFullscreen()) {
          launchFullscreenImmediately();
        }
      });
    }

    if (fullscreenBtn) {
      fullscreenBtn.addEventListener('click', function (event) {
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
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);
    
    function handleFullscreenChange() {
      if (!isFullscreen()) {
        game.classList.remove('full');

        if (isAutoFullscreen && isMobileDevice()) {
          setTimeout(() => {
            if (!isFullscreen()) {
              launchFullscreenImmediately();
            }
          }, 100);
        }
      } else {
        game.classList.add('full');
      }
    }

    function launchFullScreen() {
      const element = document.documentElement;
      if (element.requestFullscreen) {
        element.requestFullscreen().catch(err => {
          console.log('Ошибка при включении полноэкранного режима:', err);
        });
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    }
    
    function exitFullScreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }

    if (isMobileDevice()) {
      document.addEventListener('click', function firstClickHandler() {
        if (!isFullscreen()) {
          launchFullscreenImmediately();
        }

        document.removeEventListener('click', firstClickHandler);
      });

      document.addEventListener('touchstart', function firstTouchHandler() {
        if (!isFullscreen()) {
          launchFullscreenImmediately();
        }
        document.removeEventListener('touchstart', firstTouchHandler);
      });
    }
  }
};