export default class Card {
    constructor(card, templateSelector) {
        this.cardName = card.name;
        this.cardLink = card.link;
        this.cardTemplate = document.querySelector(templateSelector).content;
        this.popupImageElement = document.querySelector('.popup_type_place-image');
        this.linkOfHandleCloseOnEsc = null;
    }

    _handleCloseOnEscape (evt) {
        if (evt.key === 'Escape') {
            this._closeImagePopup();
        }
    }

    _openImagePopup () {
        const that = this;
        if (!this.linkOfHandleCloseOnEsc) {
            document.addEventListener(
                'keydown',
                this.linkOfHandleCloseOnEsc = function (evt) {that._handleCloseOnEscape(evt)},
                { once: true }
            );
        }
        this.popupImageElement.classList.add('popup_popup-opened');
    }

    _closeImagePopup () {
        document.removeEventListener('keydown', this.linkOfHandleCloseOnEsc, { once: true });
        this.linkOfHandleCloseOnEsc = null;
        this.popupImageElement.classList.remove('popup_popup-opened');
    }

    _handleCloseImagePopup (evt) {
        if (evt.target.classList.contains('popup') ||
            evt.target.classList.contains('popup__close-button')) {
            this._closeImagePopup(evt.currentTarget);
        }
    }

    _handleClickOpenImage () {
        const imageContainerElement = this.popupImageElement.querySelector('.popup__image');
        const imageTitleElement = this.popupImageElement.querySelector('.popup__image-title');

        imageContainerElement.setAttribute('src', this.cardLink);
        imageContainerElement.setAttribute('alt', this.cardName);
        imageTitleElement.textContent = this.cardName;
        this._openImagePopup();
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
        this.popupImageElement.addEventListener('click', (evt) => this._handleCloseImagePopup(evt));
        cardElement.querySelector('.card__trash-button').addEventListener('click', this._removeCard);
        cardElement.querySelector('.card__like-button').addEventListener('click', this._toggleLike);
        return cardElement;
    }
}
