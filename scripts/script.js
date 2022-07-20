"use strict"

let editButton = document.querySelector(".profile__edit-button");
let popupEdit = document.querySelector(".popup");
let editFormName = popupEdit.querySelector(".popup__input_section_name");
let editFormProfession = popupEdit.querySelector(".popup__input_section_profession");
let profileName = document.querySelector(".profile__title");
let profileProfession = document.querySelector(".profile__subtitle");
let editCloseButton = popupEdit.querySelector(".popup__close-btn");
let popupForm = popupEdit.querySelector(".popup__form");

//Открытие попапа
function showPopup() {
  editFormName.value = profileName.textContent;
  editFormProfession.value = profileProfession.textContent;
  popupEdit.classList.add("popup_opened");
}

//Закрытие попапа
function closePopup() {
  popupEdit.classList.remove("popup_opened");
}

//Отправка формы в попапе
function saveFormPopup (evt) {
  evt.preventDefault();
  profileName.textContent = editFormName.value;
  profileProfession.textContent = editFormProfession.value;
  closePopup();
}

editButton.addEventListener('click', showPopup);
editCloseButton.addEventListener('click', closePopup);
popupForm.addEventListener('submit', saveFormPopup);
