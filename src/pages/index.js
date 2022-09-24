"use strict"
import'./index.css';
import vector from '../images/Vector.svg';
import Group from '../images/Group.svg';
import Group2x from '../images/Group@2x.svg';
import Jak from '../images/jak-iv-kusto.jpg';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, cardsContainerSelector, imagePopupSelector,
  cardAddingPopupSelector, profilePopupSelector, profileNameSelector,
  profileProfessionSelector, buttonAdd, buttonEdit, profileName,
  profileProfession, classes, nameInput, professionInput
} from '../utils/constants.js';

const formValidators = {};

const imagesChange = [
  {name: 'vector', link: vector},
  {name: 'Group', link: Group},
  {name: 'Group2x', link: Group2x},
  {name: 'jak', link: Jak},
];

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

//profile info class example
const userInfo = new UserInfo({selectorName: profileNameSelector,
  selectorProfession: profileProfessionSelector});

//image popup initialization & setting listeners
const popupImage = new PopupWithImage(imagePopupSelector);
popupImage.setEventListeners();

//card adding popup initialization & setting listeners
const popupAddingCard = new PopupWithForm(cardAddingPopupSelector,
  (values) => {
    cardList.addItem(addCard(values['CardLink'] ,values['CardName']));
  }
);
popupAddingCard.setEventListeners();

//profile editing popup initialize & setting listeners
const popupProfileEdit = new PopupWithForm(profilePopupSelector,
  (values) => {
    userInfo.setUserInfo(values['ProfileName'], values['ProfileProfession']);
  }
);
popupProfileEdit.setEventListeners();

//handler for CardClick listeners
const handleCardClick = (link, name) => {
  popupImage.open(link, name);
}

//buttons listeners
buttonAdd.addEventListener('click', () => {
  formValidators['AddCard'].resetValidation();
  popupAddingCard.open();
});

console.log(userInfo.getUserInfo());

buttonEdit.addEventListener('click', () => {
  formValidators['EditProfile'].resetValidation();
  const profileData = userInfo.getUserInfo();
  nameInput.value = profileData.nameValue;
  professionInput.value = profileData.professionValue;
  popupProfileEdit.open();
})

const addCard = (link, name) => {
  const card = new Card(link, name, '#element', handleCardClick);
  return card.createCard();
}

// default card prepending
const cardList = new Section ({
  items: initialCards,
  renderer: item => {
    cardList.addItem(addCard(item.link, item.name));
  }},
  cardsContainerSelector
);

cardList.renderItems();
enableValidation();
