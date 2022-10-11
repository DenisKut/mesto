class Card {
  constructor(dataObj, templateSelector, handleCardClick,
    handleCardDelete, handleLikeAdd, handlLikeDelete, userId
    ) {
    this._data = dataObj;
    this._image = dataObj.link;
    this._text = dataObj.name;
    this._likes = dataObj.likes;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleLikeAdd = handleLikeAdd;
    this._handleLikeDelete = handlLikeDelete;
    this._userId = userId;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  _isLiked() {
    return this._likes.some((like) => like._id === this._userId);
  }

  setLikes(likes) {
    this._likes = likes;
    this._updateLikeState();
  }

  _updateLikeState() {
    this._likesNumber.textContent = this._likes.length;
    if (this._isLiked()) {
      this._likeButton.classList.add("element__like_enabled");
    } else {
      this._likeButton.classList.remove("element__like_enabled");
    }
  }

  _checkForIdentity() {
    return this._userId == this._data.owner._id || this._userId == undefined;
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._image, this._text);
    });

    this._likeButton.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('element__like_enabled')) {
        this._handleLikeDelete(this._cardData);
      } else {
        this._handleLikeAdd(this._cardData);
      }
    });

    this._deleteButton.addEventListener('click', () => {
      this._handleCardDelete({data: this._data});
    });
  }

  createCard() {
    this._element = this._getTemplate();
    this._deleteButton = this._element.querySelector(".element__delete-btn");
    this._cardImage = this._element.querySelector('.element__image');
    this._likeButton = this._element.querySelector('.element__like');
    this._likesNumber = this._element.querySelector('.element__number-of-likes');
    this._setEventListeners();
    if (!this._checkForIdentity()) {
      this._deleteButton.remove();
      this._deleteButton = null;
    }
    this._cardData = {data: this._data, numberOfLikes: this._likesNumber}
    this._cardImage.src = this._image;
    this._cardImage.alt = 'Изображение' + this._text;
    this._element.querySelector('.element__text').textContent = this._text;
    this._updateLikeState();
    return this._element;
  }
}
export default Card;
