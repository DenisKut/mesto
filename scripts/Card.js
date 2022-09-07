import {imagePopup, pictureImagePopup, subtitleImagePopup, openPopup,
closePopup} from "./data.js";

class Card {
  constructor(image, text, templateSelector) {
    this._image = image;
    this._text = text;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  _handleLikeCard() {
    this._element.querySelector('.element__like').classList.toggle('element__like_enabled');
  }

  _handleDeleteCard() {
    this._element.remove();
  }

  _handleOpenPopup() {
    pictureImagePopup.src = this._image;
    pictureImagePopup.alt = 'Изображение ' + this._text;
    subtitleImagePopup.textContent = this._text;
    openPopup(imagePopup);
  }

  _handleClosePopup() {
    pictureImagePopup.src = '';
    pictureImagePopup.alt = '';
    subtitleImagePopup.textContent = '';
    closePopup(imagePopup);
  }

  _setEventListeners() {
    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._handleLikeCard();
    });

    this._element.querySelector('.element__delete-btn').addEventListener('click', () => {
      this._handleDeleteCard();
    });

    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleOpenPopup();
    });

    imagePopup.querySelector('.popup-view__close-btn').addEventListener('click', (evt) => {
      this._handleClosePopup();
    });
  }

  createCard() {
    this._element = this._getTemplate();

    this._setEventListeners();
    const cardImage = this._element.querySelector('.element__image');
    cardImage.src = this._image;
    cardImage.alt = 'Изображение' + this._text;
    this._element.querySelector('.element__text').textContent = this._text;

    return this._element;
  }
}
export default Card;
