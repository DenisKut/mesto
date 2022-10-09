import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, callbackSubmitForm) {
    super(popupSelector);
    this._submitBtn = this._popup.querySelector(".popup__submit-btn");
    this._callbackSubmitForm = callbackSubmitForm;
    this._handleSubmitForm = this._handleSubmitForm.bind(this);
  }

  _handleSubmitForm(evt) {
    evt.preventDefault();
    this._callbackSubmitForm(this._data, this._card);
  }

  open(data, card) {
    super.open();
    this._submitBtn.addEventListener('click', this._handleSubmitForm);
    this._data = data;
    this._card = card;
  }

  close() {
    super.close();
    this._submitBtn.removeEventListener('click', this._handleSubmitForm);
  }
}
