"use strict"
import Card from "./Card.js";
import {initialCards, page, cardsContainer, closePopup, closeByEsc, openPopup, classes} from './data.js';
import FormValidator from "./FormValidator.js";

const buttonEdit = document.querySelector(".profile__edit-button");
const buttonAdd = document.querySelector('.profile__add-btn');
const profilePopup = document.querySelector(".popup_edit");
const cardAddingPopup = document.querySelector(".popup_add");
const formElementEditName = profilePopup.querySelector(".popup__input_section_name");
const formElementEditProfession = profilePopup.querySelector(".popup__input_section_profession");
const formElementCloseButton = profilePopup.querySelector(".popup__close-btn");
const profileSavingButton = profilePopup.querySelector(classes.submitButtonSelector);
const profileName = document.querySelector(".profile__title");
const profileProfession = document.querySelector(".profile__subtitle");
const popupFormAdd = cardAddingPopup.querySelector(".popup__form");
const popupFormEdit = profilePopup.querySelector(".popup__form");
const formAddName = cardAddingPopup.querySelector(".popup__input_section_name");
const formAddLink = cardAddingPopup.querySelector(".popup__input_section_link");
const cardSavingButton = cardAddingPopup.querySelector(classes.submitButtonSelector);
const cardAddingPopupCloseBtn = cardAddingPopup.querySelector(".popup__close-btn");

const validation = () => {
  const formList = Array.from(document.querySelectorAll(classes.formSelector));
  formList.forEach((form) => {
    const validateForm = new FormValidator(classes, form);
    validateForm.enableValidation();
  });
}

const renderInitialCards = () => initialCards.forEach(element => {
  const card = new Card(element.link, element.name, '#element');
  cardsContainer.prepend(card.createCard());
});

function renderCard (image, text) {
  const card = new Card(image, text, '#element');
  cardsContainer.prepend(card.createCard());
}

function showProfilePopup() {
  formElementEditName.value = profileName.textContent;
  formElementEditProfession.value = profileProfession.textContent;
  openPopup(profilePopup);

  profileSavingButton.setAttribute('disabled', 'disabled');
  profileSavingButton.classList.add(classes.inactiveButtonClass);
}

function closeProfilePopup() {
  closePopup(profilePopup);
}

function saveFormProfilePopup (evt) {
  evt.preventDefault();
  profileName.textContent = formElementEditName.value;
  profileProfession.textContent = formElementEditProfession.value;
  closePopup(profilePopup);
}

buttonEdit.addEventListener('click', showProfilePopup);
formElementCloseButton.addEventListener('click', closeProfilePopup);
popupFormEdit.addEventListener('submit', saveFormProfilePopup);

buttonAdd.addEventListener('click', () => {
  formAddLink.value = '';
  formAddName.value = '';
  openPopup(cardAddingPopup);
  cardSavingButton.setAttribute('disabled', 'disabled');
  cardSavingButton.classList.add(classes.inactiveButtonClass);
});

cardAddingPopupCloseBtn.addEventListener('click', () => {
  closePopup(cardAddingPopup);
});

popupFormAdd.addEventListener('submit', (evt) => {
  evt.preventDefault();
  renderCard(formAddLink.value, formAddName.value);
  closePopup(cardAddingPopup);
});

page.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup-view')) {
    closePopup(evt.target);
  }
});

renderInitialCards();
validation();
