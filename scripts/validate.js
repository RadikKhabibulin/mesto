const showInputError = (formElement, inputElement, errorMessage, selectors) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(selectors.errorClass);
    inputElement.classList.add(selectors.inputErrorClass);
};

const hideInputError = (formElement, inputElement, selectors) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = '';
    errorElement.classList.remove(selectors.errorClass);
    inputElement.classList.remove(selectors.inputErrorClass);
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(inactiveButtonClass);
        buttonElement.setAttribute('disabled', true);
    } else {
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
    }
}

const checkInputValidity = (formElement, inputElement, selectors) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, selectors);
    } else {
        hideInputError(formElement, inputElement, selectors);
    }
};

const setEventListeners = (formElement, inputElement, inputList, buttonElement, selectors) => {
    inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement, selectors);
        toggleButtonState(inputList, buttonElement, selectors.inactiveButtonClass);
    });
};

const enableValidation = (selectors) => {
    const formList = Array.from(document.querySelectorAll(selectors.formSelector));
    formList.forEach((formElement) => {
        const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
        const buttonElement = formElement.querySelector(selectors.submitButtonSelector);
        toggleButtonState(inputList, buttonElement, selectors.inactiveButtonClass);
        inputList.forEach((inputElement) => {
            setEventListeners(formElement, inputElement, inputList, buttonElement, selectors);
        });
    });
};
