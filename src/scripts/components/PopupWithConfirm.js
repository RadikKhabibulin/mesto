import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
    constructor({ popupSelector, handleSubmitForm }) {
        super(popupSelector);
        this._handleSubmitForm = handleSubmitForm;
        this._removedItem = null;
    }

    open(removedItem) {
        this._removedItem = removedItem;
        super.open();
    }

    updateStatus(status) {
        this._popup.querySelector('.popup-form__save-button').textContent = status;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', (evt) => this._handleSubmitForm(evt, this._removedItem));
    }
}
