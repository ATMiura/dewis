import {Swiper, Navigation, Pagination} from 'swiper/dist/js/swiper.esm.js'
import 'swiper/dist/css/swiper.min.css'

Swiper.use([Navigation, Pagination]);

export default class Sliders {
  constructor() {
    this.init();
  }

  init() {

    $('.project-item').each(function (index) {
      const swiperContainer = $(this).find('.swiper-container');
      const pagination = $(this).find('.swiper-pagination');
      const prevEl = $(this).find('.swiper-button-next');
      const nextEl = $(this).find('.swiper-button-prev');

      const slider = new Swiper(swiperContainer, {
        spaceBetween: 10,
        slidesPerView: 1,
        speed: 700,
        freeMode: false,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        lazy: false,
        pagination: {
          el: pagination,
          clickable: false,
        },
        navigation: {
          nextEl: prevEl,
          prevEl: nextEl
        },
      });
    })
  }
}

export class Slider {
  constructor(selector, options) {
    new Swiper(selector, options);
  }
}
