export default class Card {
    constructor({ data, handleCardClick, handleTrashClick, handleLikeClick }, templateSelector) {
        this._cardData = data;
        this._cardTemplate = document.querySelector(templateSelector).content;
        this._cardElement = this._cardTemplate.querySelector('.card').cloneNode(true);
        this._cardTitleElement = this._cardElement.querySelector('.card__title');
        this._cardImageElement = this._cardElement.querySelector('.card__image');
        this._cardLikeElement = this._cardElement.querySelector('.card__like-button');
        this._cardLikesCounterElement = this._cardElement.querySelector('.card__likes-counter');
        this._cardTrashElement = this._cardElement.querySelector('.card__trash-button');

        this._popupImageElement = document.querySelector('.popup_type_place-image');
        this._imageContainerElement = this._popupImageElement.querySelector('.popup__image');
        this._imageTitleElement = this._popupImageElement.querySelector('.popup__image-title');

        this._userId = null;
        this._handleCardClick = handleCardClick;
        this._handleTrashClick = handleTrashClick;
        this._handleLikeClick = handleLikeClick;
    }

    _toggleLike() {
        this._cardLikeElement.classList.toggle('card__like-button_liked');
    }

    _isLiked() {
        let isLiked = false;
        this._cardData.likes.forEach(like => {
            if (like._id === this._userId) {
                isLiked = true;
                return;
            }
        })
        return isLiked;
    }

    _userIsOwner() {
        if (this._cardData.owner._id === this._userId) {
            return true;
        }
        return false;
    }

    getId() {
        return this._cardData._id;
    }

    updateCard(cardData) {
        this._cardData = cardData;
        this._cardLikesCounterElement.textContent = cardData.likes.length;
        this._toggleLike();
    }

    createCard(user) {
        this._userId = user.id;

        this._cardImageElement.setAttribute('src', this._cardData.link);
        this._cardImageElement.setAttribute('alt', this._cardData.name);
        this._cardTitleElement.textContent = this._cardData.name;
        this._cardLikesCounterElement.textContent = this._cardData.likes.length;

        this._cardImageElement.addEventListener('click', () => { this._handleCardClick(this._cardData.name, this._cardData.link) });
        this._cardLikeElement.addEventListener('click', () => { this._handleLikeClick(this._isLiked()) });

        if (this._userIsOwner()) {
            this._cardElement.querySelector('.card__trash-button').addEventListener('click', () => { this._handleTrashClick(this) });
            this._cardTrashElement.classList.remove('card__trash-button_hidden');
        }

        if (this._isLiked()) {
            this._toggleLike();
        }

        return this._cardElement;
    }

    removeCard() {
        this._cardElement.closest('.card').remove();
    }
}
