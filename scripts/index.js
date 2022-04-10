let profileNameElement = document.querySelector('.profile__name');
let profileDescriptionElement = document.querySelector('.profile__description');
let nameInputField = document.querySelector('.form-profile__item_element_name');
let descriptionInputField = document.querySelector('.form-profile__item_element_description');
let popupElement = document.querySelector('.popup');
let popupCloseButtonElement = document.querySelector('.popup__close-button');
let formProfileElement = document.querySelector('.form-profile');
let profileEditButtonElement = document.querySelector('.profile__edit-button');

function toggleProfilePopup () {
    popupElement.classList.toggle('popup_popup-opened');
}

function editProfile () {
    nameInputField.value = profileNameElement.textContent;
    descriptionInputField.value = profileDescriptionElement.textContent;
    toggleProfilePopup();
}

function saveProfileForm (e) {
    e.preventDefault();
    profileNameElement.textContent = nameInputField.value;
    profileDescriptionElement.textContent = descriptionInputField.value;
    toggleProfilePopup();
}

popupCloseButtonElement.addEventListener('click', toggleProfilePopup);
profileEditButtonElement.addEventListener('click', editProfile);
formProfileElement.addEventListener('submit', saveProfileForm);
