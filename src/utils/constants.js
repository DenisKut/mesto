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

const classes = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error'
};

const cardsContainerSelector = '.elements';
const imagePopupSelector = '.popup-view';
const cardAddingPopupSelector = ".popup_add";
const profilePopupSelector = ".popup_edit";
const profileNameSelector = ".profile__title";
const profileProfessionSelector = ".profile__subtitle";
const buttonEdit = document.querySelector(".profile__edit-button");
const buttonAdd = document.querySelector('.profile__add-btn');
const profileName = document.querySelector(profileNameSelector);
const profileProfession = document.querySelector(profileProfessionSelector);
const popupEdit = document.querySelector('.popup_edit');
const nameInput = popupEdit.querySelector('.popup__input_section_name');
const professionInput = popupEdit.querySelector('.popup__input_section_profession');

export {initialCards, cardsContainerSelector, imagePopupSelector,
  cardAddingPopupSelector, profilePopupSelector, profileNameSelector,
  profileProfessionSelector, buttonAdd, buttonEdit, profileName,
  profileProfession, classes, nameInput, professionInput};
