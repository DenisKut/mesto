const classes = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error'
};

const isValid = (formElement, inputElement, classes) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, classes);
  } else {
    hideInputError(formElement, inputElement, classes);
  }
};

const showInputError = (formElement, inputElement, errorMessage, classes) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(classes.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(classes.errorClass);
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(classes.inputErrorClass);
  errorElement.classList.remove(classes.errorClass);
  errorElement.textContent = '';
};

const setEventListeners = (formElement, classes) => {
  const inputList = Array.from(formElement.querySelectorAll(classes.inputSelector));
  const buttonElement = formElement.querySelector(classes.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, classes);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, classes)
      toggleButtonState(inputList, buttonElement, classes);
    });
  });
};

const enableValidation = (classes) => {
  const formList = Array.from(document.querySelectorAll(classes.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, classes);
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement, classes) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', 'disabled');
    buttonElement.classList.add(classes.inactiveButtonClass);
  } else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(classes.inactiveButtonClass);
  }
};

enableValidation(classes);
export default classes;
