class FormValidator {
  constructor(classes, form) {
    this._classes = classes;
    this._form = form;
    this._inputList = Array.from(this._form.querySelectorAll(this._classes.inputSelector));
    this._buttonElement = this._form.querySelector(this._classes.submitButtonSelector);
  }

  _showInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._classes.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._classes.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._classes.inputErrorClass);
    errorElement.classList.remove(this._classes.errorClass);
    errorElement.textContent = '';
  };

  _isValid(inputElement) {
    if(!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  _toggleButtonState () {
    if(this._hasInvalidInput()) {
      this._buttonElement.setAttribute('disabled', 'disabled');
      this._buttonElement.classList.add(this._classes.inactiveButtonClass);
    } else {
      this._buttonElement.removeAttribute('disabled');
      this._buttonElement.classList.remove(this._classes.inactiveButtonClass);
    }
  };

  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  };

  enableValidation() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  };
}
export default FormValidator;
