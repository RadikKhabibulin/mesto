const profileNameElement = document.querySelector('.profile__name');
const profileDescriptionElement = document.querySelector('.profile__description');
const profileEditButtonElement = document.querySelector('.profile__edit-button');
const profileAddButtonElement = document.querySelector('.profile__add-button');

const popupProfileElement = document.querySelector('.popup_type_edit-profile');
const profileFormElement = popupProfileElement.querySelector('.popup-form');
const profileCloseButtonElement = popupProfileElement.querySelector('.popup__close-button');
const profileNameInputField = profileFormElement.querySelector('.popup-form__input_element_name');
const profileDescriptionInputField = profileFormElement.querySelector('.popup-form__input_element_description');

const popupPlaceElement = document.querySelector('.popup_type_add-place');
const placeFormElement = popupPlaceElement.querySelector('.popup-form');
const placeCloseButtonElement = popupPlaceElement.querySelector('.popup__close-button');
const placeTitleInputField = placeFormElement.querySelector('.popup-form__input_element_title');
const placeLinkInputField = placeFormElement.querySelector('.popup-form__input_element_link');

const popupImageElement = document.querySelector('.popup_type_place-image');
const imageContainerElement = popupImageElement.querySelector('.popup__image');
const imageTitleElement = popupImageElement.querySelector('.popup__image-title');
const imageCloseButtonElement = popupImageElement.querySelector('.popup__close-button');

const cardListElement = document.querySelector('.cards__list');
const cardTemplate = document.querySelector('#card-template').content;

const initialCards = [
    {
        name: 'Корги номер 6',
        link: 'https://funart.pro/uploads/posts/2021-07/1627468263_9-funart-pro-p-mini-korgi-sobaka-zhivotnie-krasivo-foto-9.jpg'
    },
    {
        name: 'Корги номер 5',
        link: 'https://www.domashniy-comfort.ru/images/stories/picture/00000korgi/korg_001.jpg'
    },
    {
        name: 'Корги номер 4',
        link: 'https://i.pinimg.com/originals/48/4e/1d/484e1d58121facb5a1b07bb7a5daa725.jpg'
    },
    {
        name: 'Корги номер 3',
        link: 'https://kartinkin.net/uploads/posts/2022-03/1647134927_16-kartinkin-net-p-kartinki-sobaki-korgi-16.jpg'
    },
    {
        name: 'Корги номер 2',
        link: 'https://kartinkin.net/uploads/posts/2022-02/1644963112_27-kartinkin-net-p-kartinki-korgi-28.jpg'
    },
    {
        name: 'Корги номер 1',
        link: 'https://i.pinimg.com/736x/9d/99/23/9d9923377bd4c35c45a0a4a313fa8fc4.jpg'
    }
];

function cleanErrors (popup) {
    const errorList = Array.from(popup.querySelectorAll('.popup-form__input-error'));
    errorList.forEach(error => {
        error.textContent = '';
    });
}

function openPopup (popup) {
    const inputList = Array.from(popup.querySelectorAll('.popup-form__input'));
    const buttonElement = popup.querySelector('.popup-form__save-button');
    toggleButtonState(inputList, buttonElement, 'popup-form__save-button_disabled');
    cleanErrors(popup);
    popup.classList.add('popup_popup-opened');
}

function closePopup (popup) {
    popup.classList.remove('popup_popup-opened');
}

function editProfile () {
    profileNameInputField.value = profileNameElement.textContent;
    profileDescriptionInputField.value = profileDescriptionElement.textContent;
    openPopup(popupProfileElement);
}

function saveProfileForm (e) {
    e.preventDefault();
    profileNameElement.textContent = profileNameInputField.value;
    profileDescriptionElement.textContent = profileDescriptionInputField.value;
    closePopup(popupProfileElement);
}

function addPlace () {
    placeTitleInputField.value = '';
    placeLinkInputField.value = '';
    openPopup(popupPlaceElement);
}

function fillOutCard (cardName, cardLink) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImageElement = cardElement.querySelector('.card__image');

    cardImageElement.setAttribute('src', cardLink);
    cardImageElement.setAttribute('alt', cardName);
    cardElement.querySelector('.card__title').textContent = cardName;

    cardImageElement.addEventListener('click', () => openImage(cardName, cardLink));
    cardElement.querySelector('.card__trash-button').addEventListener('click', removeCard);
    cardElement.querySelector('.card__like-button').addEventListener('click', toggleLike);
    return cardElement;
}

function renderCard (cardName, cardLink) {
    const newCard = fillOutCard(cardName, cardLink)
    cardListElement.prepend(newCard);
}

function createCard (e) {
    e.preventDefault();
    renderCard(placeTitleInputField.value, placeLinkInputField.value);
    closePopup(popupPlaceElement);
}

function removeCard () {
    this.closest('.card').remove();
}

function toggleLike () {
    this.classList.toggle('card__like-button_liked');
}

function openImage (name, link) {
    imageContainerElement.setAttribute('src', link);
    imageContainerElement.setAttribute('alt', name);
    imageTitleElement.textContent = name;
    openPopup(popupImageElement);
}

// Edit Profile
profileEditButtonElement.addEventListener('click', editProfile);
profileCloseButtonElement.addEventListener('click', () => closePopup(popupProfileElement));
profileFormElement.addEventListener('submit', saveProfileForm);

// Add Card
profileAddButtonElement.addEventListener('click', addPlace);
placeCloseButtonElement.addEventListener('click', () => closePopup(popupPlaceElement));
placeFormElement.addEventListener('submit', createCard);

// Image Popup
imageCloseButtonElement.addEventListener('click', () => closePopup(popupImageElement));

// Init cards
initialCards.forEach(card => {
    renderCard(card.name, card.link)
});

enableValidation({
    formSelector: '.popup-form',
    inputSelector: '.popup-form__input',
    submitButtonSelector: '.popup-form__save-button',
    inactiveButtonClass: 'popup-form__save-button_disabled',
    inputErrorClass: 'popup-form__input_type_error',
    errorClass: 'popup-form__error_visible'
});
