class Card {
  constructor(image, text, templateSelector, handleCardClick) {
    this._image = image;
    this._text = text;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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
    this._likeButton.classList.toggle('element__like_enabled');
  }

  _handleDeleteCard() {
    this._element.remove();
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._text, this._image);
    });

    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._handleLikeCard();
    });

    this._element.querySelector('.element__delete-btn').addEventListener('click', () => {
      this._handleDeleteCard();
    });
  }

  createCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.element__image');
    this._likeButton = this._element.querySelector('.element__like');
    this._cardImage.src = this._image;
    this._cardImage.alt = 'Изображение' + this._text;
    this._element.querySelector('.element__text').textContent = this._text;
    this._setEventListeners();
    return this._element;
  }
}
export default Card;
