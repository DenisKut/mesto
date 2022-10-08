import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, callbackSubmitForm) {
    super(popupSelector);
    this._callbackSubmitForm = callbackSubmitForm;
    this._submitBtn = this._popup.querySelector(".popup__submit-btn");
    this._handleSubmitForm = this._handleSubmitForm.bind(this);
  }

  _handleSubmitForm(evt) {
    evt.preventDefault();
    this._callbackSubmitForm(this._data);
  }

  open(data) {
    super.open();
    this._submitBtn.addEventListener('click', this._handleSubmitForm);
    this._data = data;
  }

  close() {
    super.close();
    this._submitBtn.removeEventListener('click', this._handleSubmitForm);
  }
}
