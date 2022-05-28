import openPopup from './index.js';

export default class Card {
    constructor(card, templateSelector) {
        this.cardName = card.name;
        this.cardLink = card.link;
        this.cardTemplate = document.querySelector(templateSelector).content;
        this.popupImageElement = document.querySelector('.popup_type_place-image');
        this.imageContainerElement = this.popupImageElement.querySelector('.popup__image');
        this.imageTitleElement = this.popupImageElement.querySelector('.popup__image-title');
    }

    _handleClickOpenImage () {
        this.imageContainerElement.setAttribute('src', this.cardLink);
        this.imageContainerElement.setAttribute('alt', this.cardName);
        this.imageTitleElement.textContent = this.cardName;
        openPopup(this.popupImageElement);
    }

    _removeCard () {
        this.closest('.card').remove();
    }

    _toggleLike () {
        this.classList.toggle('card__like-button_liked');
    }

    createCard () {
        const cardElement = this.cardTemplate.querySelector('.card').cloneNode(true);
        const cardImageElement = cardElement.querySelector('.card__image');

        cardImageElement.setAttribute('src', this.cardLink);
        cardImageElement.setAttribute('alt', this.cardName);
        cardElement.querySelector('.card__title').textContent = this.cardName;

        cardImageElement.addEventListener('click', () => this._handleClickOpenImage());
        cardElement.querySelector('.card__trash-button').addEventListener('click', this._removeCard);
        cardElement.querySelector('.card__like-button').addEventListener('click', this._toggleLike);
        return cardElement;
    }
}
