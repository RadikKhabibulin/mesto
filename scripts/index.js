let profileNameElement = document.querySelector('.profile__name');
let profileDescriptionElement = document.querySelector('.profile__description');
let profileEditButtonElement = document.querySelector('.profile__edit-button');
let profileAddButtonElement = document.querySelector('.profile__add-button');

let popupProfileElement = document.querySelector('.popup_type_edit-profile');
let profileFormElement = popupProfileElement.querySelector('.popup-form');
let profileCloseButtonElement = popupProfileElement.querySelector('.popup__close-button');
let profileNameInputField = profileFormElement.querySelector('.popup-form__item_element_name');
let profileDescriptionInputField = profileFormElement.querySelector('.popup-form__item_element_description');

let popupPlaceElement = document.querySelector('.popup_type_add-place');
let placeFormElement = popupPlaceElement.querySelector('.popup-form');
let placeCloseButtonElement = popupPlaceElement.querySelector('.popup__close-button');
let placeTitleInputField = placeFormElement.querySelector('.popup-form__item_element_title');
let placeLinkInputField = placeFormElement.querySelector('.popup-form__item_element_link');

const cardListElement = document.querySelector('.cards__list');
const cardTemplate = document.querySelector('#card-template').content;
// let cardElement = document.querySelector('.card');
// let cardImageElement = cardElement.querySelector('.card__image');
// let cardTitleElement = cardElement.querySelector('.card__title');

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
    togglePopupOpened(popupProfileElement);
}

function saveProfileForm (e) {
    e.preventDefault();
    profileNameElement.textContent = profileNameInputField.value;
    profileDescriptionElement.textContent = profileDescriptionInputField.value;
    togglePopupOpened(popupProfileElement);
}

function addPlace () {
    placeTitleInputField.value = '';
    placeLinkInputField.value = '';
    togglePopupOpened(popupPlaceElement);
}

function createCard (e) {
    e.preventDefault();
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImageElement = cardElement.querySelector('.card__image');
    const cardTitleElement = cardElement.querySelector('.card__title');
    const trashButtonElement = cardElement.querySelector('.card__trash-button');
    const likeButtonElement = cardElement.querySelector('.card__like-button');
    cardImageElement.style.backgroundImage = `url(${placeLinkInputField.value})`;
    cardTitleElement.textContent = placeTitleInputField.value;
    trashButtonElement.addEventListener('click', removeCard);
    likeButtonElement.addEventListener('click', toggleLike);
    cardListElement.prepend(cardElement);
    togglePopupOpened(popupPlaceElement);
}

function removeCard () {
    this.closest('.card').remove();
}

function toggleLike () {
    this.classList.toggle('card__like-button_liked');
}

// Edit Profile
profileEditButtonElement.addEventListener('click', editProfile);
profileCloseButtonElement.addEventListener('click', () => togglePopupOpened(popupProfileElement));
profileFormElement.addEventListener('submit', saveProfileForm);

// Add Card
profileAddButtonElement.addEventListener('click', addPlace);
placeCloseButtonElement.addEventListener('click', () => togglePopupOpened(popupPlaceElement));
placeFormElement.addEventListener('submit', createCard);

// Init cards
initialCards.forEach(card => {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImageElement = cardElement.querySelector('.card__image');
    const cardTitleElement = cardElement.querySelector('.card__title');
    const trashButtonElement = cardElement.querySelector('.card__trash-button');
    const likeButtonElement = cardElement.querySelector('.card__like-button');

    cardImageElement.style.backgroundImage = `url(${card.link})`;
    cardTitleElement.textContent = card.name;
    trashButtonElement.addEventListener('click', removeCard);
    likeButtonElement.addEventListener('click', toggleLike);

    cardListElement.prepend(cardElement);
    togglePopupOpened(popupPlaceElement);
})
