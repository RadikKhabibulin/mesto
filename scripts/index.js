const profileNameElement = document.querySelector('.profile__name');
const profileDescriptionElement = document.querySelector('.profile__description');
const profileEditButtonElement = document.querySelector('.profile__edit-button');
const profileAddButtonElement = document.querySelector('.profile__add-button');

const popupProfileElement = document.querySelector('.popup_type_edit-profile');
const profileFormElement = popupProfileElement.querySelector('.popup-form');
const profileCloseButtonElement = popupProfileElement.querySelector('.popup__close-button');
const profileSaveButtonElement = popupProfileElement.querySelector('.popup-form__save-button');
const profileInputList = Array.from(profileFormElement.querySelectorAll('.popup-form__input'));
const profileNameInputField = profileFormElement.querySelector('.popup-form__input_element_name');
const profileDescriptionInputField = profileFormElement.querySelector('.popup-form__input_element_description');

const popupPlaceElement = document.querySelector('.popup_type_add-place');
const placeFormElement = popupPlaceElement.querySelector('.popup-form');
const placeCloseButtonElement = popupPlaceElement.querySelector('.popup__close-button');
const placeSaveButtonElement = popupPlaceElement.querySelector('.popup-form__save-button');
const placeInputList = Array.from(placeFormElement.querySelectorAll('.popup-form__input'));
const placeTitleInputField = placeFormElement.querySelector('.popup-form__input_element_title');
const placeLinkInputField = placeFormElement.querySelector('.popup-form__input_element_link');

const popupImageElement = document.querySelector('.popup_type_place-image');
const imageContainerElement = popupImageElement.querySelector('.popup__image');
const imageTitleElement = popupImageElement.querySelector('.popup__image-title');
const imageCloseButtonElement = popupImageElement.querySelector('.popup__close-button');

const popupList = Array.from(document.querySelectorAll('.popup'));
const cardListElement = document.querySelector('.cards__list');

const cardTemplate = document.querySelector('#card-template').content;

function cleanErrors (popup, inputList) {
    const errorList = Array.from(popup.querySelectorAll('.popup-form__input-error'));
    errorList.forEach(error => {
        error.textContent = '';
    });
    inputList.forEach(inputElement => {
        inputElement.classList.remove('popup-form__input_type_error');
    });
}

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
            closePopup(popup)
        })
    }
}

function handleClickEditProfile () {
    profileNameInputField.value = profileNameElement.textContent;
    profileDescriptionInputField.value = profileDescriptionElement.textContent;
    toggleButtonState(profileInputList, profileSaveButtonElement, 'popup-form__save-button_disabled');
    cleanErrors(popupProfileElement, profileInputList);
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
    toggleButtonState(placeInputList, placeSaveButtonElement, 'popup-form__save-button_disabled');
    cleanErrors(popupPlaceElement, placeInputList);
    openPopup(popupPlaceElement);
}

function fillOutCard (cardName, cardLink) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImageElement = cardElement.querySelector('.card__image');

    cardImageElement.setAttribute('src', cardLink);
    cardImageElement.setAttribute('alt', cardName);
    cardElement.querySelector('.card__title').textContent = cardName;

    cardImageElement.addEventListener('click', () => handleClickOpenImage(cardName, cardLink));
    cardElement.querySelector('.card__trash-button').addEventListener('click', removeCard);
    cardElement.querySelector('.card__like-button').addEventListener('click', toggleLike);
    return cardElement;
}

function renderCard (card) {
    const newCard = fillOutCard(card.name, card.link);
    cardListElement.prepend(newCard);
}

function handleSubminAddCard (evt) {
    evt.preventDefault();
    renderCard(placeTitleInputField.value, placeLinkInputField.value);
    closePopup(popupPlaceElement);
}

function removeCard () {
    this.closest('.card').remove();
}

function toggleLike () {
    this.classList.toggle('card__like-button_liked');
}

function handleClickOpenImage (name, link) {
    imageContainerElement.setAttribute('src', link);
    imageContainerElement.setAttribute('alt', name);
    imageTitleElement.textContent = name;
    openPopup(popupImageElement);
}

profileEditButtonElement.addEventListener('click', handleClickEditProfile);
profileFormElement.addEventListener('submit', handleSubmitSaveProfile);

profileAddButtonElement.addEventListener('click', handleClickAddPlace);
placeFormElement.addEventListener('submit', handleSubminAddCard);

popupList.forEach(popup => {
    popup.addEventListener('click', handleClosePopup)
})

initialCards.forEach(card => {
    renderCard(card)
});
