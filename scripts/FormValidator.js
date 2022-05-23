export default class FormValidator {
    constructor(selectorsToValidate, formElement) {
        this.selectors = selectorsToValidate;
        this.formElement = formElement;
        this.inputList = Array.from(this.formElement.querySelectorAll(this.selectors.inputSelector));
        this.buttonElement = this.formElement.querySelector(this.selectors.submitButtonSelector);
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this.formElement.querySelector(`.${inputElement.id}-error`);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this.selectors.errorClass);
        inputElement.classList.add(this.selectors.inputErrorClass);
    }

    _hideInputError(inputElement) {
        const errorElement = this.formElement.querySelector(`.${inputElement.id}-error`);
        errorElement.textContent = '';
        errorElement.classList.remove(this.selectors.errorClass);
        inputElement.classList.remove(this.selectors.inputErrorClass);
    }

    _hasInvalidInput() {
        return this.inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this.buttonElement.classList.add(this.selectors.inactiveButtonClass);
            this.buttonElement.setAttribute('disabled', true);
        } else {
            this.buttonElement.classList.remove(this.selectors.inactiveButtonClass);
            this.buttonElement.removeAttribute('disabled');
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
        this.inputList.forEach(inputElement => {
            this._hideInputError(inputElement);
        });
    }

    enableValidation() {
        this._toggleButtonState();
        this.inputList.forEach((inputElement) => {
            this._setEventListeners(inputElement);
        });
    }

    resetValidation() {
        this._toggleButtonState();
        this._cleanErrors();
    }
}
