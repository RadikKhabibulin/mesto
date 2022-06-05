import '../../pages/index.css';

import Card from '../components/Card.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import {
    initialCards,
    selectorsToValidate,
    popupSelectors,
    profileEditButtonElement,
    profileAddButtonElement,
    profileFormElement,
    placeFormElement,
    profileNameInputField,
    profileDescriptionInputField
} from '../utils/constants.js';


function handleClickEditProfile () {
    const { name, description } = userInfo.getUserInfo();
    profileNameInputField.value = name;
    profileDescriptionInputField.value = description;

    validateProfileForm.resetValidation();
    popupProfileForm.open();
}

function handleClickAddPlace () {
    validatePlaceForm.resetValidation();
    popupCardForm.open();
}

const userInfo = new UserInfo({
    nameSelector: '.profile__name',
    descriptionSelector: '.profile__description'
});

const popupWithImage = new PopupWithImage(popupSelectors.image);
popupWithImage.setEventListeners();

const popupProfileForm = new PopupWithForm({
    popupSelector: popupSelectors.profile,
    handleSubmitForm: (evt, values) => {
        evt.preventDefault();
        userInfo.setUserInfo(values['profile-name'], values['profile-description']);
        popupProfileForm.close();
    }
});
popupProfileForm.setEventListeners();

const popupCardForm = new PopupWithForm({
    popupSelector: popupSelectors.place,
    handleSubmitForm: (evt, values) => {
        evt.preventDefault();
        const card = new Card(
            { cardName: values['place-title'], cardLink: values['place-link'] },
            '#card-template',
            popupWithImage.open.bind(popupWithImage)
        );
        const cardElement = card.createCard();
        cardList.addItem(cardElement);
        popupCardForm.close();
    }
});
popupCardForm.setEventListeners();

const cardList = new Section({
    items: initialCards,
    renderer: (cardItem) => {
        const card = new Card(
            { cardName: cardItem.name, cardLink: cardItem.link },
            '#card-template',
            popupWithImage.open.bind(popupWithImage)
        );
        const cardElement = card.createCard();

        cardList.addItem(cardElement);
    },
}, '.cards__list');
cardList.renderItems();

const validateProfileForm = new FormValidator(selectorsToValidate, profileFormElement);
validateProfileForm.enableValidation();

const validatePlaceForm = new FormValidator(selectorsToValidate, placeFormElement);
validatePlaceForm.enableValidation();

profileEditButtonElement.addEventListener('click', handleClickEditProfile);
profileAddButtonElement.addEventListener('click', handleClickAddPlace);
