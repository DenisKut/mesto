"use strict"
import'./index.css';

import vector from '../images/Vector.svg';
import Group from '../images/Group.svg';
import Group2x from '../images/Group@2x.svg';
import Jak from '../images/jak-iv-kusto.jpg';
import avatarEdit from '../images/avatar-edit.svg';
import Card from "../components/Card.js";
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import { cardsContainerSelector, imagePopupSelector,
  cardAddingPopupSelector, profilePopupSelector, profileNameSelector,
  profileProfessionSelector, buttonAdd, buttonEdit, profileName,
  profileProfession, classes, nameInput, professionInput , avatarSelector,
  avatar, popupConfirmSelector, buttonConfirm, popupProfileImage
} from '../utils/constants.js';
import { data, error } from 'jquery';

const formValidators = {};

const imagesChange = [
  {name: 'vector', link: vector},
  {name: 'Group', link: Group},
  {name: 'Group2x', link: Group2x},
  {name: 'jak', link: Jak},
  {name: 'avatarEdit', link: avatarEdit},
];

//Creating Api example, wich working with server
const api = new Api({
  link: 'https://mesto.nomoreparties.co/v1/cohort-51',
  headers: {
    authorization: '22bb9c92-ea2e-40eb-b13f-953212e16dcb',
    'Content-Type': 'application/json'
  }
});

api.renderData()
  .then(([cards, user]) => {
    cardList.renderItems({cards: cards, userId: user._id});
    userInfo.setUserInfo({name: user.name, about: user.about, avatar: user.avatar});
  })
  .catch(error => console.log(error));


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


// default card prepending
const cardList = new Section ({
  renderer: data => {
    cardList.addItem(addCard(data.card, data.userId));
  }},
  cardsContainerSelector
);

//profile info class example
const userInfo = new UserInfo({selectorName: profileNameSelector,
  selectorProfession: profileProfessionSelector, avatarSelector: avatarSelector});

  const addCard = (data, userId) => {
    const card = new Card(data, '#element', handleCardClick, handleCardDelete,
    handleCardLikeAdd, handleCardLikeDelete, userId);
    return card.createCard();
  }

//handler for CardClick listeners
const handleCardClick = (link, name) => {
  popupImage.open(link, name);
}

const handleCardDelete = (element) => {
  popupConfirmDelete.open(element);
}

const handleCardLikeAdd = (evt, cardData) => {
  api.addLike(cardData.data)
    .then(res => {
      evt.target.classList.add('element__like_enabled');
      cardData.numberOfLikes.textContent = res.likes.length;
    })
    .catch(error => console.log(error));
};

const handleCardLikeDelete = (evt, cardData) => {
  api.deleteLike(cardData.data)
  .then(res => {
    cardData.numberOfLikes.textContent = res.likes.length;
    evt.target.classList.remove('element__like_enabled');
  })
  .catch(error => console.log(error));
}

//image popup initialization & setting listeners
const popupImage = new PopupWithImage(imagePopupSelector);
popupImage.setEventListeners();

//card adding popup initialization & setting listeners
const popupAddingCard = new PopupWithForm(cardAddingPopupSelector,
  (data, submitBtn) => {
    submitBtn.textContent = 'Сохранение...';
    api.addCard(data)
      .then(card => {
        cardList.addItem(addCard(card));
        popupAddingCard.close();
      })
      .catch(error => console.log(error))
      .finally(() => {
        submitBtn.textContent = 'Создать';
      })
  }
);
popupAddingCard.setEventListeners();

//profile editing popup initialize & setting listeners
const popupProfileEdit = new PopupWithForm(profilePopupSelector,
  (data, submitBtn) => {
    submitBtn.textContent ="Сохранение...";
    api.setUserInfo(data)
      .then((data) => {
        userInfo.setUserInfo(data)
      })
      .then(() => {
        popupProfileEdit.close();
      })
      .catch(error => console.log(error))
      .finally(() => {
        submitBtn.textContent = 'Сохранить'
      });
  }
);
popupProfileEdit.setEventListeners();

//Confirm deleting window
const popupConfirmDelete = new PopupWithConfirm(popupConfirmSelector, cardData => {
  buttonConfirm.textContent = 'Удаление...';
  api.deleteCard(cardData.data)
    .then(() => {
      cardData.element.remove();
      cardData.element = null;
      popupConfirmDelete.close();
    })
    .catch(error => {
      console.log(error)
    })
    .finally(() => buttonConfirm.textContent = 'Да')
});
popupConfirmDelete.setEventListeners();

//Avatar editing window
const popupAvatarEdit = new PopupWithForm(popupProfileImage,
  (data, submitBtn) => {
    submitBtn.textContent = 'Сохранение...';
    api.setAvatar(data)
    .then(data => {
      avatar.style.backgroundImage = `url(${data.avatar})`
      popupAvatarEdit.close(); //закрываем попап после сабмита
    })
    .catch(error => console.log(error))
    .finally(() => {
      submitBtn.textContent = 'Сохранить'
    })
  }
);
popupAvatarEdit.setEventListeners();

//buttons listeners
buttonAdd.addEventListener('click', () => {
  formValidators['AddCard'].resetValidation();
  popupAddingCard.open();
});

buttonEdit.addEventListener('click', () => {
  formValidators['EditProfile'].resetValidation();
  const profileData = userInfo.getUserInfo();
  // popupProfileEdit.setInputValues(profileData);
  nameInput.value = profileData.nameValue;
  professionInput.value = profileData.professionValue;
  popupProfileEdit.open();
})

avatar.addEventListener('click', () => {
  formValidators['EditAvatar'].resetValidation();
  popupAvatarEdit.open();
})

enableValidation();
