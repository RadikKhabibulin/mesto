import '../../pages/index.css';

import Api from '../components/Api';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithConfirm from '../components/PopupWithConfirm';
import {
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
} from '../utils/constants.js';


const api = new Api({
    baseUrl: mestoApiLink,
    headers: {
        authorization: token,
        'Content-Type': 'application/json'
    }
})

const userInfo = new UserInfo({
    nameSelector: '.profile__name',
    descriptionSelector: '.profile__description',
    avatarSelector: '.profile__avatar',
});

const cardList = new Section({
    renderer: (cardData) => {
        const card = initCardItem(cardData);
        const cardElement = card.createCard(userInfo.getUserInfo());
        cardList.addItem(cardElement);
    },
    containerSelector: '.cards__list'
});

const popupWithImage = new PopupWithImage(popupSelectors.image);

const popupProfileForm = new PopupWithForm({
    popupSelector: popupSelectors.profile,
    handleSubmitForm: (evt, values) => {
        evt.preventDefault();
        const data = { name: values['profile-name'], about: values['profile-description']};
        popupProfileForm.updateStatus('Сохранение...');
        api.updateUserInfo(data)
        .then(res => {
            userInfo.setUserInfo(res.name, res.about);
            popupProfileForm.close();
        })
        .catch(err => {
            console.log(`Ошибка сохранения данных пользователя: ${err}`);
        })
        .finally(() => {
            popupProfileForm.updateStatus('Сохранить');
        });
    }
});

const popupCardForm = new PopupWithForm({
    popupSelector: popupSelectors.place,
    handleSubmitForm: (evt, values) => {
        evt.preventDefault();
        popupCardForm.updateStatus('Создание...');
        api.createCard({
            name: values['place-title'],
            link: values['place-link']
        })
        .then(res => {
            const card = initCardItem(res);
            const cardElement = card.createCard(userInfo.getUserInfo());
            cardList.addItem(cardElement);
            popupCardForm.close();
        })
        .catch(err => {
            console.log(`Ошибка создания карточки: ${err}`);
        })
        .finally(() => {
            popupCardForm.updateStatus('Создать');
        });
    }
});

const popupAvatarForm = new PopupWithForm({
    popupSelector: popupSelectors.avatar,
    handleSubmitForm: (evt, values) => {
        evt.preventDefault();
        popupAvatarForm.updateStatus('Сохранение...');
        const data = { avatar: values['avatar-link']};
        api.updateUserAvatar(data)
        .then(res => {
            userInfo.setUserAvatar(res.avatar);
            popupAvatarForm.close();
        })
        .catch(err => {
            console.log(`Ошибка сохранения нового аватара: ${err}`);
        })
        .finally(() => {
            popupAvatarForm.updateStatus('Сохранить');
        });
    }
})

const popupDeleteCardForm = new PopupWithConfirm({
    popupSelector: popupSelectors.deleteCard,
    handleSubmitForm: (evt, card) => {
        evt.preventDefault();
        popupDeleteCardForm.updateStatus('Удаление...');
        api.deleteCard(card.getId())
        .then(() => {
            card.removeCard();
            popupDeleteCardForm.close();
        })
        .catch(err => {
            console.log(`Ошибка удаления карточки: ${err}`);
        })
        .finally(() => {
            popupDeleteCardForm.updateStatus('Да');
        });
    }
})

const validateAvatarForm = new FormValidator(selectorsToValidate, avatarFormElement);
const validateProfileForm = new FormValidator(selectorsToValidate, profileFormElement);
const validatePlaceForm = new FormValidator(selectorsToValidate, placeFormElement);

function handleClickEditAvatar() {
    validateAvatarForm.resetValidation();
    popupAvatarForm.open();
}

function handleClickEditProfile() {
    const { name, description } = userInfo.getUserInfo();
    profileNameInputField.value = name;
    profileDescriptionInputField.value = description;

    validateProfileForm.resetValidation();
    popupProfileForm.open();
}

function handleClickAddPlace() {
    validatePlaceForm.resetValidation();
    popupCardForm.open();
}

function initCardItem(data) {
    const card = new Card({
        data,
        handleCardClick: (name, link) => {
            popupWithImage.open(name, link);
        },
        handleTrashClick: (card) => {
            popupDeleteCardForm.open(card);
        },
        handleLikeClick: (isLiked) => {
            if (isLiked) {
                api.deleteLike(card.getId())
                .then(res => {
                    card.updateCard(res);
                })
                .catch(err => {
                    console.log(`Ошибка удаления лайка: ${err}`);
                })
            } else {
                api.setLike(card.getId())
                .then(res => {
                    card.updateCard(res);
                })
                .catch(err => {
                    console.log(`Ошибка добавления лайка: ${err}`);
                })
            }
        }
    },
        '#card-template'
    );
    return card;
}

popupWithImage.setEventListeners();
popupProfileForm.setEventListeners();
popupCardForm.setEventListeners();
popupAvatarForm.setEventListeners();
popupDeleteCardForm.setEventListeners();

validateAvatarForm.enableValidation();
validateProfileForm.enableValidation();
validatePlaceForm.enableValidation();

profileAvatarButtonElement.addEventListener('click', handleClickEditAvatar);
profileEditButtonElement.addEventListener('click', handleClickEditProfile);
profileAddButtonElement.addEventListener('click', handleClickAddPlace);

Promise.all([
    api.getUserInfo(),
    api.getCards()
])
.then(([info, initialCards]) => {
    userInfo.setUserInfo(info.name, info.about, info._id);
    userInfo.setUserAvatar(info.avatar);
    cardList.renderItems(initialCards.reverse());
})
.catch(err => {
    console.log(`Ошибка получения данных от сервера: ${err}`);
})
