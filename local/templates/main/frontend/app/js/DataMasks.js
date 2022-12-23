import IMask from "imask";

export default class DataMasks {
  constructor() {
    this.init();
  }

  init() {
    $('[data-inputmask]').each(function () {
      IMask($(this)[0], {mask: "+7 (000) 000-00-00"});
    });

    $('[data-inputmask-cadastr]').each(function () {
      IMask($(this)[0], {mask: "00-00-000000-000"});
    });
  }
}
