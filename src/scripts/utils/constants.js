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

const selectorsToValidate = {
    formSelector: '.popup-form',
    inputSelector: '.popup-form__input',
    submitButtonSelector: '.popup-form__save-button',
    inactiveButtonClass: 'popup-form__save-button_disabled',
    inputErrorClass: 'popup-form__input_type_error',
    errorClass: 'popup-form__error_visible'
};

const popupSelectors = {
    profile: '.popup_type_edit-profile',
    place: '.popup_type_add-place',
    image: '.popup_type_place-image',
};

const profileButtonsSelectors = {
    editProfile: '.profile__edit-button',
    addPlace: '.profile__add-button',
};

const profileInputFieldsSelectors = {
    name: '.popup-form__input_element_name',
    description: '.popup-form__input_element_description',
};

const popupFormSelector = '.popup-form';

const profileEditButtonElement = document.querySelector(profileButtonsSelectors.editProfile);
const profileAddButtonElement = document.querySelector(profileButtonsSelectors.addPlace);

const popupProfileElement = document.querySelector(popupSelectors.profile);
const profileFormElement = popupProfileElement.querySelector(popupFormSelector);

const popupPlaceElement = document.querySelector(popupSelectors.place);
const placeFormElement = popupPlaceElement.querySelector(popupFormSelector);

const profileNameInputField = profileFormElement.querySelector(profileInputFieldsSelectors.name);
const profileDescriptionInputField = profileFormElement.querySelector(profileInputFieldsSelectors.description);

export {
    initialCards,
    selectorsToValidate,
    popupSelectors,
    profileEditButtonElement,
    profileAddButtonElement,
    profileFormElement,
    placeFormElement,
    profileNameInputField,
    profileDescriptionInputField
};
