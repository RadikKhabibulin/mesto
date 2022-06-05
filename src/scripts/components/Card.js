export default class Card {
    constructor({ cardName, cardLink }, templateSelector, handleCardClick) {
        this._cardName = cardName;
        this._cardLink = cardLink;
        this._cardTemplate = document.querySelector(templateSelector).content;
        this._popupImageElement = document.querySelector('.popup_type_place-image');
        this._imageContainerElement = this._popupImageElement.querySelector('.popup__image');
        this._imageTitleElement = this._popupImageElement.querySelector('.popup__image-title');
        this._handleCardClick = handleCardClick;
    }

    _removeCard () {
        this.closest('.card').remove();
    }

    _toggleLike () {
        this.classList.toggle('card__like-button_liked');
    }

    createCard () {
        const cardElement = this._cardTemplate.querySelector('.card').cloneNode(true);
        const cardImageElement = cardElement.querySelector('.card__image');

        cardImageElement.setAttribute('src', this._cardLink);
        cardImageElement.setAttribute('alt', this._cardName);
        cardElement.querySelector('.card__title').textContent = this._cardName;

        cardImageElement.addEventListener('click', () => { this._handleCardClick(this._cardLink, this._cardName) });
        cardElement.querySelector('.card__trash-button').addEventListener('click', this._removeCard);
        cardElement.querySelector('.card__like-button').addEventListener('click', this._toggleLike);
        return cardElement;
    }
}
