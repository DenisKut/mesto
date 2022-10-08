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
const popupConfirmSelector = ".popup-confirm";
const popupProfileImage = '.popup-avatar-edit';
const buttonEdit = document.querySelector(".profile__edit-button");
const buttonAdd = document.querySelector('.profile__add-btn');
const buttonConfirm = document.querySelector('.popup-confirm__submit-btn');
const profileName = document.querySelector(profileNameSelector);
const profileProfession = document.querySelector(profileProfessionSelector);
const popupEdit = document.querySelector('.popup_edit');
const nameInput = popupEdit.querySelector('.popup__input_section_name');
const professionInput = popupEdit.querySelector('.popup__input_section_profession');
const avatarSelector = '.profile__avatar';
const avatar = document.querySelector(avatarSelector);

export {cardsContainerSelector, imagePopupSelector,
  cardAddingPopupSelector, profilePopupSelector, profileNameSelector,
  profileProfessionSelector, buttonAdd, buttonEdit, profileName,
  profileProfession, classes, nameInput, professionInput, avatarSelector,
  avatar, popupConfirmSelector, buttonConfirm, popupProfileImage};
