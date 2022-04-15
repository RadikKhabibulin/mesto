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
let imageCloseButtonElement = popupImageElement.querySelector('.popup__close-button');

const cardListElement = document.querySelector('.cards__list');
const cardTemplate = document.querySelector('#card-template').content;

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


const formsContent = {
    profile: {
        popupTitle: 'Редактировать профиль',
        formName: 'edit-profile',
        fields: [
            {
                placeholder: 'Имя',
                name: 'profile-name',
            },
            {
                placeholder: 'О себе',
                name: 'profile-description',
            }
        ],
        buttonText: 'Сохранить',
        buttonAriaLabel: 'Сохранить изменения',
    },
    place: {
        popupTitle: 'Новое место',
        formName: 'add-place',
        fields: [
            {
                placeholder: 'Название',
                name: 'place-title',
            },
            {
                placeholder: 'Ссылка на картинку',
                name: 'place-link',
            }
        ],
        buttonText: 'Сохранить',
        buttonAriaLabel: 'Создать карточку места',
    },
}

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

function createCard (e) {
    e.preventDefault();
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__image').style.backgroundImage = `url(${placeLinkInputField.value})`;
    cardElement.querySelector('.card__title').textContent = placeTitleInputField.value;
    cardElement.querySelector('.card__trash-button').addEventListener('click', removeCard);
    cardElement.querySelector('.card__like-button').addEventListener('click', toggleLike);
    cardListElement.prepend(cardElement);
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
    imageContainerElement.setAttribute('src', this.style.backgroundImage.split('"')[1]);
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
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__image').style.backgroundImage = `url(${card.link})`;
    cardElement.querySelector('.card__title').textContent = card.name;
    cardElement.querySelector('.card__image').addEventListener('click', openImage);
    cardElement.querySelector('.card__trash-button').addEventListener('click', removeCard);
    cardElement.querySelector('.card__like-button').addEventListener('click', toggleLike);
    cardListElement.prepend(cardElement);
    togglePopupOpened(popupPlaceElement);
})
