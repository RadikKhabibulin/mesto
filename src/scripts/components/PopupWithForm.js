import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({ popupSelector, handleSubmitForm }) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup-form');
        this._handleSubmitForm = handleSubmitForm;
        this._inputList = Array.from(this._form.querySelectorAll('.popup-form__input'));
    }

    _getInputValues() {
        const inputValues = {};
        this._inputList.forEach(item => inputValues[item.name] = item.value);
        return inputValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', (evt) => this._handleSubmitForm(evt, this._getInputValues()));
    }

    close() {
        this._form.reset();
        super.close();
    }
}
