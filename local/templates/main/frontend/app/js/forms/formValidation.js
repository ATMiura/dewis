export default class FormValidation {
  form = '[data-form]';
  formInput = '[data-input-required]';

  emptyMsg = {
    default: {
      ru: 'Обязательное поле',
      en: 'Fill in the field'
    },
    file: {
      ru: 'Укажите файл',
      en: 'Specify a file'
    },
    email: {
      ru: 'Укажите email',
      en: 'Wrong email'
    },
    phone: {
      ru: 'Укажите телефон',
      en: 'Wrong phone'
    },
    name: {
      ru: 'Укажите имя',
      en: 'Wrong name'
    },
    surname: {
      ru: 'Укажите Фамилию',
      en: 'Wrong surname'
    },
    inn: {
      ru: 'Укажите ИНН',
      en: 'Wrong surname'
    },
    requiredPassword: {
      ru: 'Введите пароль',
      en: 'Wrong password'
    },
  };

  invalidMsg = {
    default: {
      ru: 'Неверный формат',
      en: 'Wrong format'
    },
    email: {
      ru: 'Проверьте email, кажется, в нём ошибка',
      en: 'Wrong email'
    },
    phone: {
      ru: 'Проверьте номер, кажется, в нём ошибка',
      en: 'Wrong phone'
    }
  };

  constructor() {
    this.events();
  }

  formInputSelector() {
    return this.formInput.substring(1, this.formInput.length - 1)
  }

  events() {
    var self = this;

    $(document).on('submit', this.form, function () {
      self.validate($(this));
      return false;
    });

  }

  validate($form) {
    var self = this;
    var $inputs = $form.find(this.formInput);
    var valid = [];

    $inputs.each(function () {
      let type = $(this).attr(self.formInputSelector()) || 'text';
      let val = $(this).val();

      let formBlock = $(this).closest('.form-block');
      let errorMsg = $(this).attr('data-input-error') || null;

      $(this).removeClass('invalid');
      formBlock.find('.form-block__error').empty();

      if (!val.length) {
        switch (type) {
          case 'default':
            valid.push(self.invalid($(this), self.emptyMsg.default[App.lang]));
            break;

          case 'name':
            valid.push(self.invalid($(this), self.emptyMsg.name[App.lang]));
            break;

          case 'email':
            valid.push(self.invalid($(this), self.emptyMsg.email[App.lang]));
            break;

          case 'phone':
            valid.push(self.invalid($(this), self.emptyMsg.phone[App.lang]));
            break;
        }
      } else {
        switch (type) {
          case 'default':
            valid.push(self.validateText(val, $(this))
              ? self.valid($(this))
              : self.invalid($(this), self.invalidMsg.default[App.lang])
            );
            break;

          case 'name':
            valid.push(self.validateText(val, $(this))
              ? self.valid($(this))
              : self.invalid($(this), self.emptyMsg.name[App.lang])
            );
            break;

          case 'email':
            valid.push(self.validateEmail(val)
              ? self.valid($(this))
              : self.invalid($(this), self.invalidMsg.default[App.lang])
            );
            break;

          case 'phone':
            valid.push(self.validatePhone(val)
              ? self.valid($(this))
              : self.invalid($(this), self.invalidMsg.default[App.lang])
            );
            break;

          case 'cadastr':
            valid.push(self.validateCadastr(val, $(this))
              ? self.valid($(this))
              : self.invalid($(this), self.invalidMsg.default[App.lang])
            );
            break;
        }
      }
    });

    var validCount = 0;

    valid.forEach(function (item) {
      item ? validCount++ : null
    });

    if (valid.length === validCount) $form.trigger('form::valid');

    return valid.length === validCount;
  }

  validateText(val, $this) {
    if ($.trim($this.val()) === '') {
      this.invalid($this);
      return false;
    } else {
      this.valid($this);
      return true;
    }
  }

  validateCadastr (val, $this) {
    if (val.length === 16) {
      this.valid($this);
      return true;
    } else {
      this.invalid($this, this.invalidMsg.default[App.lang]);
      return false;
    }
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  validatePhone(phone) {
    var cleanPhone = phone.replace(/\s/g, "");
    var re = /(([(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{2})([-\s\.]?[0-9]{2})/g;
    return re.test(cleanPhone);
  }

  invalid(elem, errorMessage) {

    let message = errorMessage || this.emptyMsg.default[App.lang];
    elem.closest('.form-group').removeClass('valid').addClass('invalid');
    elem.siblings('.error-tooltip').remove();
    elem.closest('.form-group').append("<span class='error-tooltip'></span>");
    elem.siblings('.error-tooltip').text(errorMessage);
    return false;
  }

  valid(elem) {
    elem.closest('.form-group').removeClass('invalid').addClass('valid');
    elem.siblings('.error-tooltip').remove();
    return true;
  }
};
