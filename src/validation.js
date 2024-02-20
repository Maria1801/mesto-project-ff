const isValid = (formElement, inputElement, validationConfig) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
    }
    if (inputElement.validity.valid) {
        hideInputError(formElement, inputElement, validationConfig);
    } else {
        showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
    }
};

const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
    const spanElement = formElement.querySelector(`.${inputElement.name}-input-error`);

    inputElement.classList.add("input-error-border-red")

    spanElement.textContent = errorMessage;
    spanElement.classList.add(validationConfig.errorClass);
};

const hideInputError = (formElement, inputElement, validationConfig) => {
    const spanElement = formElement.querySelector(`.${inputElement.name}-input-error`);

    inputElement.classList.remove("input-error-border-red")

    spanElement.textContent = '';
    spanElement.classList.remove(validationConfig.errorClass);
};

const setEventListeners = (formElement, validationConfig) => {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, validationConfig);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement, validationConfig);
            toggleButtonState(inputList, buttonElement, validationConfig);
        });
    });
};

const enableValidation = (validationConfig) => {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));

    formList.forEach((formElement) => {
        setEventListeners(formElement, validationConfig);
    });
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

function clearValidation(profileForm, validationConfig) {
    profileForm.querySelectorAll(validationConfig.inputSelector).forEach((inputElement) => {
        hideInputError(profileForm, inputElement, validationConfig)
    })
    const buttonElement = profileForm.querySelector(validationConfig.submitButtonSelector);
    disableSubmitButton(buttonElement, validationConfig)
}

const toggleButtonState = (inputList, buttonElement, validationConfig) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(validationConfig.inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        disableSubmitButton(buttonElement, validationConfig)
    }
};

const disableSubmitButton = (buttonElement, validationConfig) => {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
}

export { enableValidation, clearValidation };