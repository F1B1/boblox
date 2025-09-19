import './_functions.js';


import { lazyLoad } from './functions/lazyLoad.js';
import { onClickBtn } from './functions/onAnyClick.js';
import { onScrollEvent } from './functions/onScrollEvent.js';
import { setSwipers } from './functions/allSwiper.js';
import { gameHandler } from './functions/gameHandler.js';
import { observeBody } from './functions/watchBody.js';




window.addEventListener('DOMContentLoaded', () => {
  onScrollEvent();
  onClickBtn();
  setSwipers();
  lazyLoad();
  observeBody(['no-scrolling', 'is-start', 'loading']);
  gameHandler();

});


