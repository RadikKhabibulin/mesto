let profileNameElement = document.querySelector('.profile__name');
let profileDescriptionElement = document.querySelector('.profile__description');
let profileEditButtonElement = document.querySelector('.profile__edit-button');
let profileAddButtonElement = document.querySelector('.profile__add-button');

let popupProfileElement = document.querySelector('.popup_type_edit-profile');
let profileFormElement = popupProfileElement.querySelector('.popup-form');
let profileCloseButtonElement = popupProfileElement.querySelector('.popup__close-button');
let profileSaveButtonElement = profileFormElement.querySelector('.popup-form__save-button');
let profileNameInputField = profileFormElement.querySelector('.popup-form__item_element_name');
let profileDescriptionInputField = profileFormElement.querySelector('.popup-form__item_element_description');

let popupPlaceElement = document.querySelector('.popup_type_add-place');
let placeFormElement = popupPlaceElement.querySelector('.popup-form');
let placeCloseButtonElement = popupPlaceElement.querySelector('.popup__close-button');
let placeSaveButtonElement = placeFormElement.querySelector('.popup-form__save-button');
let placeTitleInputField = placeFormElement.querySelector('.popup-form__item_element_title');
let placeLinkInputField = placeFormElement.querySelector('.popup-form__item_element_link');

let popupImageElement = document.querySelector('.popup_type_place-image');
let imageContainerElement = popupImageElement.querySelector('.popup__image');
let imageTitleElement = popupImageElement.querySelector('.popup__image-title');
let imageCloseButtonElement = popupImageElement.querySelector('.popup__close-button');

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

function togglePopupOpened (popup) {
    popup.classList.toggle('popup_popup-opened');
}

function editProfile () {
    profileNameInputField.value = profileNameElement.textContent;
    profileDescriptionInputField.value = profileDescriptionElement.textContent;
    profileSaveButtonElement.removeAttribute('disabled');
    togglePopupOpened(popupProfileElement);
}

function saveProfileForm (e) {
    e.preventDefault();
    profileNameElement.textContent = profileNameInputField.value;
    profileDescriptionElement.textContent = profileDescriptionInputField.value;
    profileSaveButtonElement.setAttribute('disabled', true);
    togglePopupOpened(popupProfileElement);
}

function addPlace () {
    placeTitleInputField.value = '';
    placeLinkInputField.value = '';
    placeSaveButtonElement.removeAttribute('disabled');
    togglePopupOpened(popupPlaceElement);
}

function fillOutCard (card=null) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImageElement = cardElement.querySelector('.card__image');

    if (card && card.name && card.link) {
        cardImageElement.style.backgroundImage = `url(${card.link})`;
        cardImageElement.setAttribute('alt', card.name);
        cardElement.querySelector('.card__title').textContent = card.name;
    }
    else {
        cardImageElement.style.backgroundImage = `url(${placeLinkInputField.value})`;
        cardImageElement.setAttribute('alt', placeLinkInputField.value);
        cardElement.querySelector('.card__title').textContent = placeTitleInputField.value;
    }

    cardImageElement.addEventListener('click', openImage);
    cardElement.querySelector('.card__trash-button').addEventListener('click', removeCard);
    cardElement.querySelector('.card__like-button').addEventListener('click', toggleLike);
    cardListElement.prepend(cardElement);
}

function createCard (e) {
    e.preventDefault();
    fillOutCard();
    placeSaveButtonElement.setAttribute('disabled', true);
    togglePopupOpened(popupPlaceElement);
}

function removeCard () {
    this.closest('.card').remove();
}

function toggleLike () {
    this.classList.toggle('card__like-button_liked');
}

function openImage () {
    imageContainerElement.setAttribute('src', this.style.backgroundImage.replace('url("', '').replace('")', ''));
    if (this.nextElementSibling)
        imageTitleElement.textContent = this.nextElementSibling.querySelector('.card__title').textContent;
    togglePopupOpened(popupImageElement);
}

// Edit Profile
profileEditButtonElement.addEventListener('click', editProfile);
profileCloseButtonElement.addEventListener('click', () => togglePopupOpened(popupProfileElement));
profileFormElement.addEventListener('submit', saveProfileForm);

// Add Card
profileAddButtonElement.addEventListener('click', addPlace);
placeCloseButtonElement.addEventListener('click', () => togglePopupOpened(popupPlaceElement));
placeFormElement.addEventListener('submit', createCard);

// Image Popup
imageCloseButtonElement.addEventListener('click', () => togglePopupOpened(popupImageElement));

// Init cards
initialCards.forEach(card => {
    fillOutCard(card);
})
