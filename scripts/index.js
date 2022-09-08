"use strict"
import Card from "./Card.js";
import {initialCards, page, cardsContainer, closePopup,
  imagePopup, pictureImagePopup, subtitleImagePopup, closeByEsc,
  openPopup, classes} from './data.js';
import FormValidator from "./FormValidator.js";

const closePopupSelector = ".popup__close-btn";
const buttonEdit = document.querySelector(".profile__edit-button");
const buttonAdd = document.querySelector('.profile__add-btn');
const profilePopup = document.querySelector(".popup_edit");
const cardAddingPopup = document.querySelector(".popup_add");
const imagePopupCloseBtn = imagePopup.querySelector(closePopupSelector);
const formElementEditName = profilePopup.querySelector(".popup__input_section_name");
const formElementEditProfession = profilePopup.querySelector(".popup__input_section_profession");
const profileName = document.querySelector(".profile__title");
const profileProfession = document.querySelector(".profile__subtitle");
const popupFormAdd = cardAddingPopup.querySelector(".popup__form");
const popupFormEdit = profilePopup.querySelector(".popup__form");
const formAddName = cardAddingPopup.querySelector(".popup__input_section_name");
const formAddLink = cardAddingPopup.querySelector(".popup__input_section_link");

const popups = document.querySelectorAll('.popup');
const formValidators = {};

// Включение валидации
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(classes.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(classes, formElement)
// получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute('name')

   // вот тут в объект записываем под именем формы
    formValidators[formName] = validator;
   validator.enableValidation();
  });
};

const renderInitialCards = () => initialCards.forEach(element => {
  cardsContainer.prepend(createCard(element.link, element.name));
});

function createCard(image, text) {
  const card = new Card(image, text, '#element', handleCardClick);
  const cardElement = card.createCard()
  return cardElement
}

function renderCard (image, text) {
  cardsContainer.prepend(createCard(image, text));
}

function handleCardClick(name, link) {
  pictureImagePopup.src = link;
  pictureImagePopup.alt = 'Изображение ' + name;
  subtitleImagePopup.textContent = name;
  openPopup(imagePopup);
}

function closeImagePopup() {
  pictureImagePopup.src = '';
  pictureImagePopup.alt = '';
  subtitleImagePopup.textContent = '';
  closePopup(imagePopup);
}

function showProfilePopup() {
  formElementEditName.value = profileName.textContent;
  formElementEditProfession.value = profileProfession.textContent;
  openPopup(profilePopup);
}

function saveFormProfilePopup (evt) {
  evt.preventDefault();
  profileName.textContent = formElementEditName.value;
  profileProfession.textContent = formElementEditProfession.value;
  closePopup(profilePopup);
}

function formConditionReset(popup) {
  if(popup.classList.contains('popup_add')) {
    formValidators['AddCard'].resetValidation();
  } else if(popup.classList.contains('popup_edit')){
    formValidators['EditProfile'].resetValidation();
  }
}

buttonEdit.addEventListener('click', showProfilePopup);
popupFormEdit.addEventListener('submit', saveFormProfilePopup);
imagePopupCloseBtn.addEventListener('click', () => {
  closeImagePopup();
});

buttonAdd.addEventListener('click', () => {
  formAddLink.value = '';
  formAddName.value = '';
  openPopup(cardAddingPopup);
});

popupFormAdd.addEventListener('submit', (evt) => {
  evt.preventDefault();
  renderCard(formAddLink.value, formAddName.value);
  closePopup(cardAddingPopup);
  formValidators['AddCard'].resetValidation();
});

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        closePopup(popup);
        formConditionReset(popup);
      } else if(evt.target.classList.contains('popup-view')) {
        closeImagePopup();
      }
      if (evt.target.classList.contains('popup__close-btn')) {
        closePopup(popup);
        formConditionReset(popup)
      }
  });
});

renderInitialCards();
enableValidation();
