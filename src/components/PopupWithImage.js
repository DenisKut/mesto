import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup-view__image');
    this._popupSubtitle = this._popup.querySelector('.popup-view__subtitle');
  }

  open(image, subtitle) {
    this._popupImage.src = image;
    this._popupImage.alt = 'Изображение ' + subtitle;
    this._popupSubtitle.textContent = subtitle;
    super.open();
  }
}
