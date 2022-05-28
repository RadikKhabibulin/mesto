export default class FormValidator {
    constructor(selectorsToValidate, formElement) {
        this._selectors = selectorsToValidate;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._selectors.inputSelector));
        this._buttonElement = this._formElement.querySelector(this._selectors.submitButtonSelector);
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._selectors.errorClass);
        inputElement.classList.add(this._selectors.inputErrorClass);
    }

    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        errorElement.textContent = '';
        errorElement.classList.remove(this._selectors.errorClass);
        inputElement.classList.remove(this._selectors.inputErrorClass);
    }

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._buttonElement.classList.add(this._selectors.inactiveButtonClass);
            this._buttonElement.setAttribute('disabled', true);
        } else {
            this._buttonElement.classList.remove(this._selectors.inactiveButtonClass);
            this._buttonElement.removeAttribute('disabled');
        }
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _setEventListeners(inputElement) {
        inputElement.addEventListener('input', () => {
            this._checkInputValidity(inputElement);
            this._toggleButtonState();
        });
    }

    _cleanErrors () {
        this._inputList.forEach(inputElement => {
            this._hideInputError(inputElement);
        });
    }

    enableValidation() {
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            this._setEventListeners(inputElement);
        });
    }

    resetValidation() {
        this._toggleButtonState();
        this._cleanErrors();
    }
}
