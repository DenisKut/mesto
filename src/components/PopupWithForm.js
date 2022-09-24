import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, callbackSubmitForm) {
    super(popupSelector);
    this._callbackSubmitForm = callbackSubmitForm;
    this._inputList = Array.from(this._popup.querySelectorAll('.popup__input'));
    this._popupForm = this._popup.querySelector('.popup__form');
    this._inputValues = {};
  }

  _getInputValues() {
    this._inputList.forEach(item =>
      this._inputValues[item.name] = item.value
      );
    return this._inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', () => {
      this._callbackSubmitForm(this._getInputValues());
      this.close();
    });
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}
