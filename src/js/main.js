import './_functions.js';


import { lazyLoad } from './functions/lazyLoad.js';
import { onClickBtn } from './functions/onAnyClick.js';
import { onScrollEvent } from './functions/onScrollEvent.js';
import { setSwipers } from './functions/allSwiper.js';

import { observeBody } from './functions/watchBody.js';




window.addEventListener('DOMContentLoaded', () => {
  onScrollEvent();
  onClickBtn();
  setSwipers();
  lazyLoad();
  observeBody(['no-scrolling', 'is-start', 'loading']);


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

  function handleFullScreen(){
    if(window.innerWidth <= 1024){
      if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
      } else if (iframe.webkitRequestFullscreen) {
        iframe.webkitRequestFullscreen();
      } else if (iframe.msRequestFullscreen) {
        iframe.msRequestFullscreen();
      }
    } else{
      game.classList.toggle('full');
      document.body.classList.toggle('no-scrolling');
    }
  }

  if(btnFullscreen){
    btnFullscreen.addEventListener("click", handleFullScreen);

    window.addEventListener('resize',()=>{
        btnFullscreen.addEventListener("click", handleFullScreen);
    })
  }


});


