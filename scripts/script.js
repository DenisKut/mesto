"use strict"

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//Выбор templat-а и родительского Grid-контейнера
const card = document.querySelector('#element').content;
const cardsContainer = document.querySelector('.elements');
const imagePopup = document.querySelector('.popup-view');
const pictureImagePopup = imagePopup.querySelector('.popup-view__image');
const subtitleImagePopup = imagePopup.querySelector('.popup-view__subtitle');
const page = document.querySelector('body');
const cardCopy = card.querySelector('.element');

const buttonEdit = document.querySelector(".profile__edit-button");
const buttonAdd = document.querySelector('.profile__add-btn');
const profilePopup = document.querySelector(".popup_edit");
const cardAddingPopup = document.querySelector(".popup_add");
const formElementEditName = profilePopup.querySelector(".popup__input_section_name");
const formElementEditProfession = profilePopup.querySelector(".popup__input_section_profession");
const profileName = document.querySelector(".profile__title");
const profileProfession = document.querySelector(".profile__subtitle");
const formElementCloseButton = profilePopup.querySelector(".popup__close-btn");
const popupFormEdit = profilePopup.querySelector(".popup__form");

const cardAddingPopupCloseBtn = cardAddingPopup.querySelector(".popup__close-btn");
const popupFormAdd = cardAddingPopup.querySelector(".popup__form");
const formAddName = cardAddingPopup.querySelector(".popup__input_section_name");
const formAddLink = cardAddingPopup.querySelector(".popup__input_section_link");
const popups = [imagePopup, profilePopup, cardAddingPopup];

function createCard(elementLink, elementName) {
  const card = cardCopy.cloneNode(true);
  const cardImage = card.querySelector('.element__image');
  const cardText = card.querySelector('.element__text');
  cardImage.src = elementLink;
  cardImage.alt = 'Изображение' + elementName;
  cardText.textContent = elementName;
  return card;
}

function renderCard (createCard) {
  cardsContainer.prepend(createCard);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

//Открытие попапа редактирования
function showProfilePopup() {
  formElementEditName.value = profileName.textContent;
  formElementEditProfession.value = profileProfession.textContent;
  openPopup(profilePopup);
}

function closeProfilePopup() {
  closePopup(profilePopup);
}

//Отправка формы в попапе редактирования
function saveFormProfilePopup (evt) {
  evt.preventDefault();
  profileName.textContent = formElementEditName.value;
  profileProfession.textContent = formElementEditProfession.value;
  closePopup(profilePopup);
}

//заполнение страницы 6-тью карточками
initialCards.forEach(element => {
  renderCard(createCard(element.link, element.name));
});

imagePopup.querySelector('.popup-view__close-btn').addEventListener('click', (evt) => {
  closePopup(imagePopup);
});

buttonEdit.addEventListener('click', showProfilePopup);
formElementCloseButton.addEventListener('click', closeProfilePopup);
popupFormEdit.addEventListener('submit', saveFormProfilePopup);

buttonAdd.addEventListener('click', () => {
  formAddLink.value = '';
  formAddName.value = '';
  openPopup(cardAddingPopup);
})
cardAddingPopupCloseBtn.addEventListener('click', () => {
  closePopup(cardAddingPopup);
})
popupFormAdd.addEventListener('submit', (evt) => {
  evt.preventDefault();
  renderCard(createCard(formAddLink.value, formAddName.value));
  closePopup(cardAddingPopup);
})

cardsContainer.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('element__like')) {
    evt.target.classList.toggle('element__like_enabled');
  }
});

cardsContainer.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('element__delete-btn')) {
    evt.target.closest('.element').remove();
  }
});

cardsContainer.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('element__image')) {
    pictureImagePopup.src = evt.target.src;
    pictureImagePopup.alt = 'Изображение' + evt.target.alt;
    subtitleImagePopup.textContent = evt.target.closest('.element').querySelector('.element__text').textContent;
    openPopup(imagePopup);
  }
});

page.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup-view')) {
    closePopup(evt.target);
  }
});

page.addEventListener('keydown', (evt) => {
  if(evt.key === "Escape") {
    popups.forEach(element => {
      closePopup(element);
    });
  }
});
