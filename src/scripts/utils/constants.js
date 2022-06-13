const selectorsToValidate = {
    formSelector: '.popup-form',
    inputSelector: '.popup-form__input',
    submitButtonSelector: '.popup-form__save-button',
    inactiveButtonClass: 'popup-form__save-button_disabled',
    inputErrorClass: 'popup-form__input_type_error',
    errorClass: 'popup-form__error_visible'
};

const popupSelectors = {
    avatar: '.popup_type_edit-avatar',
    profile: '.popup_type_edit-profile',
    place: '.popup_type_add-place',
    image: '.popup_type_place-image',
    deleteCard: '.popup_type_delete-place',
};

const profileButtonsSelectors = {
    editAvatar: '.profile__avatar-button',
    editProfile: '.profile__edit-button',
    addPlace: '.profile__add-button',
};

const profileInputFieldsSelectors = {
    avatar: '.popup-form__input_element_link',
    name: '.popup-form__input_element_name',
    description: '.popup-form__input_element_description',
};

const popupFormSelector = '.popup-form';

const profileAvatarButtonElement = document.querySelector(profileButtonsSelectors.editAvatar);
const profileEditButtonElement = document.querySelector(profileButtonsSelectors.editProfile);
const profileAddButtonElement = document.querySelector(profileButtonsSelectors.addPlace);

const popupProfileElement = document.querySelector(popupSelectors.profile);
const profileFormElement = popupProfileElement.querySelector(popupFormSelector);

const popupPlaceElement = document.querySelector(popupSelectors.place);
const placeFormElement = popupPlaceElement.querySelector(popupFormSelector);

const popupAvatarElement = document.querySelector(popupSelectors.avatar);
const avatarFormElement = popupAvatarElement.querySelector(popupFormSelector);

const profileNameInputField = profileFormElement.querySelector(profileInputFieldsSelectors.name);
const profileDescriptionInputField = profileFormElement.querySelector(profileInputFieldsSelectors.description);

const serverLink = 'https://mesto.nomoreparties.co';
const apiVersion = 'v1';
const group = 'cohort-42';
const mestoApiLink = `${serverLink}/${apiVersion}/${group}`;
const token = '396f2449-6428-4b74-b022-c9b3a7095f65';

export {
    selectorsToValidate,
    popupSelectors,
    profileAvatarButtonElement,
    profileEditButtonElement,
    profileAddButtonElement,
    avatarFormElement,
    profileFormElement,
    placeFormElement,
    profileNameInputField,
    profileDescriptionInputField,
    mestoApiLink,
    token
};
