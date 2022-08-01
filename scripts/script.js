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
const cardList = document.querySelector('.elements');
const popupView = document.querySelector('#popup-view').content;
const page = document.querySelector('body');

//заполнение страницы 6-тью карточками
initialCards.forEach(element => {
  const cardCopy = card.querySelector('.element').cloneNode(true);
  cardCopy.querySelector('.element__image').src = element.link;
  cardCopy.querySelector('.element__text').textContent = element.name;
  cardCopy.querySelector('.element__like').addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__like_enabled');
  });
  cardCopy.querySelector('.element__delete-btn').addEventListener('click', (evt) => {
    evt.target.parentElement.remove();
  });
  cardCopy.querySelector('.element__image').addEventListener('click', (evt) => {
    const popupViewCopy = popupView.querySelector('.popup-view').cloneNode(true);
    popupViewCopy.querySelector('.popup-view__image').src = evt.target.src;
    popupViewCopy.querySelector('.popup-view__subtitle').textContent = cardCopy.querySelector('.element__text').textContent;
    popupViewCopy.querySelector('.popup-view__close-btn').addEventListener('click', (evt) => {
      setTimeout(() => {
        evt.target.parentElement.parentElement.remove();
      }, 500);
      popupViewCopy.classList.remove('popup-view_visible');
    });
    page.append(popupViewCopy);
    setTimeout(() => {
      popupViewCopy.classList.add('popup-view_visible');
    }, 10);
  });
  cardList.prepend(cardCopy);
});

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector('.profile__add-btn');
const popupEdit = document.querySelector(".popup_edit");
const popupAdd = document.querySelector(".popup_add");
const editFormName = popupEdit.querySelector(".popup__input_section_name");
const editFormProfession = popupEdit.querySelector(".popup__input_section_profession");
const profileName = document.querySelector(".profile__title");
const profileProfession = document.querySelector(".profile__subtitle");
const editCloseButton = popupEdit.querySelector(".popup__close-btn");
const popupFormEdit = popupEdit.querySelector(".popup__form");

const popupAddCloseBtn = popupAdd.querySelector(".popup__close-btn");
const popupFormAdd = popupAdd.querySelector(".popup__form");
const addFormName = popupAdd.querySelector(".popup__input_section_name");
const addFormLink = popupAdd.querySelector(".popup__input_section_link");

//Открытие попапа редактирования
function showPopupEdit() {
  editFormName.value = profileName.textContent;
  editFormProfession.value = profileProfession.textContent;
  popupEdit.classList.add("popup_opened");
}

//Закрытие попапа редактирования
function closePopupEdit() {
  popupEdit.classList.remove("popup_opened");
}

//Отправка формы в попапе редактирования
function saveFormPopupEdit (evt) {
  evt.preventDefault();
  profileName.textContent = editFormName.value;
  profileProfession.textContent = editFormProfession.value;
  closePopupEdit();
}

editButton.addEventListener('click', showPopupEdit);
editCloseButton.addEventListener('click', closePopupEdit);
popupFormEdit.addEventListener('submit', saveFormPopupEdit);

addButton.addEventListener('click', () => {
  popupAdd.classList.add("popup_opened");
})
popupAddCloseBtn.addEventListener('click', () => {
  popupAdd.classList.remove("popup_opened");
})
popupFormAdd.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const cardCopy = card.querySelector('.element').cloneNode(true);
  cardCopy.querySelector('.element__image').src = addFormLink.value;
  cardCopy.querySelector('.element__text').textContent = addFormName.value;
  cardCopy.querySelector('.element__like').addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__like_enabled');
  });
  cardCopy.querySelector('.element__delete-btn').addEventListener('click', (evt) => {
    evt.target.parentElement.remove();
  });
  cardCopy.querySelector('.element__image').addEventListener('click', (evt) => {
    const popupViewCopy = popupView.querySelector('.popup-view').cloneNode(true);
    popupViewCopy.querySelector('.popup-view__image').src = evt.target.src;
    popupViewCopy.querySelector('.popup-view__subtitle').textContent = cardCopy.querySelector('.element__text').textContent;
    popupViewCopy.querySelector('.popup-view__close-btn').addEventListener('click', (evt) => {
      setTimeout(() => {
        evt.target.parentElement.parentElement.remove();
      }, 500);
      popupViewCopy.classList.remove('popup-view_visible');
    });
    page.append(popupViewCopy);
    setTimeout(() => {
      popupViewCopy.classList.add('popup-view_visible');
    }, 10);
  });
  cardList.prepend(cardCopy);
  popupAdd.classList.remove("popup_opened");
})

