import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._imageContainerElement = this._popup.querySelector('.popup__image');
        this._imageTitleElement = this._popup.querySelector('.popup__image-title');
    }

    open(cardName, cardLink) {
        this._imageContainerElement.setAttribute('alt', cardName);
        this._imageContainerElement.setAttribute('src', cardLink);
        this._imageTitleElement.textContent = cardName;
        super.open();
    }
}
