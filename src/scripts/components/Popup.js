export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
        else {
            document.addEventListener('keydown', this._handleEscClose.bind(this), { once: true })
        }
    }

    open() {
        this._popup.classList.add('popup_popup-opened');
        this._handleEscClose.bind(this);
        document.addEventListener('keydown', this._handleEscClose.bind(this), { once: true });
    }

    close() {
        this._popup.classList.remove('popup_popup-opened');
    }

    setEventListeners() {
        this._popup.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup') ||
                evt.target.classList.contains('popup__close-button')) {
                this.close();
            }
        });
    }
}
