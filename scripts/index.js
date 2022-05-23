import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { initialCards, selectorsToValidate } from './constants.js';

const profileNameElement = document.querySelector('.profile__name');
const profileDescriptionElement = document.querySelector('.profile__description');
const profileEditButtonElement = document.querySelector('.profile__edit-button');
const profileAddButtonElement = document.querySelector('.profile__add-button');

const popupProfileElement = document.querySelector('.popup_type_edit-profile');
const profileFormElement = popupProfileElement.querySelector('.popup-form');
const validateProfileForm = new FormValidator(selectorsToValidate, profileFormElement);

const profileNameInputField = profileFormElement.querySelector('.popup-form__input_element_name');
const profileDescriptionInputField = profileFormElement.querySelector('.popup-form__input_element_description');

const popupPlaceElement = document.querySelector('.popup_type_add-place');
const placeFormElement = popupPlaceElement.querySelector('.popup-form');
const validatePlaceForm = new FormValidator(selectorsToValidate, placeFormElement);

const placeTitleInputField = placeFormElement.querySelector('.popup-form__input_element_title');
const placeLinkInputField = placeFormElement.querySelector('.popup-form__input_element_link');

const popupList = Array.from(document.querySelectorAll('.popup'));
const cardListElement = document.querySelector('.cards__list');

function openPopup (popup) {
    document.addEventListener('keydown', handleCloseOnEscape);
    popup.classList.add('popup_popup-opened');
}

function closePopup (popup) {
    document.removeEventListener('keydown', handleCloseOnEscape);
    popup.classList.remove('popup_popup-opened');
}

function handleClosePopup (evt) {
    if (evt.target.classList.contains('popup') ||
        evt.target.classList.contains('popup__close-button')) {
        closePopup(evt.currentTarget);
    }
}

function handleCloseOnEscape (evt) {
    if (evt.key === 'Escape') {
        popupList.forEach(popup => {
            if (popup.classList.contains('popup_popup-opened'))
                closePopup(popup);
        })
    }
}

function handleClickEditProfile () {
    profileNameInputField.value = profileNameElement.textContent;
    profileDescriptionInputField.value = profileDescriptionElement.textContent;
    validateProfileForm.resetValidation();
    openPopup(popupProfileElement);
}

function handleSubmitSaveProfile (e) {
    e.preventDefault();
    profileNameElement.textContent = profileNameInputField.value;
    profileDescriptionElement.textContent = profileDescriptionInputField.value;
    closePopup(popupProfileElement);
}

function handleClickAddPlace () {
    placeTitleInputField.value = '';
    placeLinkInputField.value = '';
    validatePlaceForm.resetValidation();
    openPopup(popupPlaceElement);
}

function renderCard (card) {
    const newCard = new Card(card, '#card-template');
    cardListElement.prepend(newCard.createCard());
}

function handleSubminAddCard (evt) {
    evt.preventDefault();
    renderCard({
        name: placeTitleInputField.value,
        link: placeLinkInputField.value
    });
    closePopup(popupPlaceElement);
}

validateProfileForm.enableValidation();
profileEditButtonElement.addEventListener('click', handleClickEditProfile);
profileFormElement.addEventListener('submit', handleSubmitSaveProfile);
popupProfileElement.addEventListener('click', handleClosePopup);

validatePlaceForm.enableValidation();
profileAddButtonElement.addEventListener('click', handleClickAddPlace);
placeFormElement.addEventListener('submit', handleSubminAddCard);
popupPlaceElement.addEventListener('click', handleClosePopup);

initialCards.forEach(card => {
    renderCard(card);
});
