import "../pages/index.css";
import { initialCards } from "./cards";
import { createCard, deleteCard, likeCard } from "./card";
import { openPopUp, closePopup } from "./modals";

const placesList = document.querySelector(".places__list");
const openingButtonProfilePopUp = document.querySelector(
  ".profile__edit-button"
);
const profilePopUp = document.querySelector(".popup_type_edit");
const openingButtonAddPopUp = document.querySelector(".profile__add-button");
const addPopUp = document.querySelector(".popup_type_new-card");
const imagePopUp = document.querySelector(".popup_type_image");
const profileFormElement = document.querySelector('[name="edit-profile"]');
const addFormElement = document.querySelector('[name="new-place"]');
const currentName = document.querySelector(".profile__title");
const currentDescription = document.querySelector(".profile__description");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const namePlaceInput = document.querySelector(".popup__input_type_card-name");
const linkPlaceInput = document.querySelector(".popup__input_type_url");
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
let myProfileData = "";
// @todo: Вывести карточки на страницу

// initialCards.forEach((cardDetails) => {
//   placesList.append(
//     createCard(cardDetails, deleteCard, likeCard, openPopUp, openImage)
//   );
// });

function openImage(newCardDetails) {
  openPopUp(imagePopUp);

  popupImage.src = newCardDetails.link;
  popupImage.alt = newCardDetails.name;
  popupCaption.textContent = newCardDetails.name;
}

//Открытие и закрытие попапов

openingButtonProfilePopUp.addEventListener("click", function (evt) {
  evt.preventDefault();
  clearValidation(profilePopUp, validationConfig);
  openPopUp(profilePopUp);

  nameInput.value = currentName.textContent;
  jobInput.value = currentDescription.textContent;
});

openingButtonAddPopUp.addEventListener("click", function (evt) {
  evt.preventDefault();
  clearValidation(addPopUp, validationConfig);
  openPopUp(addPopUp);
});

const popups = document.querySelectorAll(".popup"); // Выбираем все существующие попапы в коллекцию
popups.forEach((popup) => {
  // Для каждого попапа делаем следуюущее
  const closeButton = popup.querySelector(".popup__close"); // Находим в попапе кнопку крестик
  closeButton.addEventListener("click", () => closePopup(popup)); // Устанавливаем слушатель на крестик
  popup.addEventListener("mousedown", (evt) => {
    // Устанавливаем слушатель оверлея
    if (evt.target === popup) {
      closePopup(popup);
    }
  });
});

// закрытие кликом по оверлею

profilePopUp.addEventListener("click", (evt) => {
  if (evt.target === profilePopUp) {
    closePopup(profilePopUp);
  }
});

addPopUp.addEventListener("click", (evt) => {
  if (evt.target === addPopUp) {
    closePopup(addPopUp);
  }
});

imagePopUp.addEventListener("click", (evt) => {
  if (evt.target === imagePopUp) {
    closePopup(imagePopUp);
  }
});

// Редактирование профиля

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  currentName.textContent = nameInput.value;
  currentDescription.textContent = jobInput.value;

  const name = currentName.textContent;
  const about = currentDescription.textContent;

  updateProfile(name, about);

  closePopup(profilePopUp);
}

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

//добавление карточки

function createNewCard(evt) {
  evt.preventDefault();

  const name = namePlaceInput.value;
  const link = linkPlaceInput.value;
  
  const myNewCard = {name: placesList, alt: placesList, link: link};
  const newCardElement = createCard(myNewCard, deleteMyCard, likeCard, likeMyCard, openPopUp, openImage, getProfileData)

  placesList.prepend(newCardElement, placesList.firstChild);

  createMyCard(name, link)

//createCard(newCardDetails, deleteCard, likeCard, openPopUp, openImage)

  closePopup(addPopUp);
  evt.target.reset();
}

//Добавление новой карточки

addFormElement.addEventListener("submit", createNewCard);

// Валидация

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = "";
};

// Функция, которая проверяет валидность поля

const isValid = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  } else {
    // иначе сделай кнопку активной
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});

// очистка формы

const clearValidation = (formElement, validationConfig) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const submitButton = formElement.querySelector(
    validationConfig.submitButtonSelector
  );

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement);
    validationConfig.formSelector.reset;
  });
  submitButton.classList.add(validationConfig.inactiveButtonClass);
};

// API

const getCards = (userID) => {
  return fetch("https://nomoreparties.co/v1/wff-cohort-8/cards ", {
    headers: {
      authorization: "275e97d7-7ef3-4926-bcb7-3f2c8fd87314",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {
      result.forEach(function (item) {
        placesList.append(
          createCard(item, deleteMyCard, likeCard, likeMyCard, openPopUp, openImage, getProfileData)
        );
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

const getProfile = () => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-8/users/me`, {
    headers: {
      authorization: "275e97d7-7ef3-4926-bcb7-3f2c8fd87314",
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();;
    }
    return Promise.reject(`Ошибка: ${res.status}`)
    }).then((result) => {
      myProfileData  = result;
    })
  .catch((error) => {
    console.log(error);
  });
};

const updateProfile = (name, about) => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-8/users/me`, {
    method: "PATCH",
    headers: {
      authorization: "275e97d7-7ef3-4926-bcb7-3f2c8fd87314",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

const createMyCard = (name, link) => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-8/cards`, {
    method: "POST",
    headers: {
      authorization: "275e97d7-7ef3-4926-bcb7-3f2c8fd87314",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

const deleteMyCard = (card) => {
  if (card.CreatorID === myProfileData._id) {
    return fetch(`https://nomoreparties.co/v1/wff-cohort-8/cards/${card.ElementId}`, {
      method: "DELETE",
      headers: {
        authorization: "275e97d7-7ef3-4926-bcb7-3f2c8fd87314",
      },
    })
  }
};

const getProfileData = () => {
  return myProfileData;
};

const likeMyCard = (card) => {
  const likeButton = card.querySelector(".card__like-button");
  const likeCounter = card.querySelector(".likes-counter");
  if (card.LikedByMe !== true)
  {
    return fetch(`https://nomoreparties.co/v1/wff-cohort-8/cards/likes/${card.ElementId}`, {
      method: "PUT",
      headers: {
        authorization: "275e97d7-7ef3-4926-bcb7-3f2c8fd87314",
     }
      }).then((res) => {
      if (res.ok) {
        likeCounter.textContent = Number(likeCounter.textContent) + 1;
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }).then(() => {
      card.LikedByMe = true;
      likeButton.classList.toggle("card__like-button_is-active");
    })
  .catch((error) => {
    console.log(error);
  });
  }
  else
  {
      card.LikedByMe = false;
      likeCounter.textContent = Number(likeCounter.textContent) - 1;
      if (likeCounter === 0)
      {
        likeCounter.remove;
      }
      else
      {
        likeButton.classList.toggle("card__like-button_is-active");
      }
      return fetch(`https://nomoreparties.co/v1/wff-cohort-8/cards/likes/${card.ElementId}`, {
    method: "DELETE",
      headers: {
        authorization: "275e97d7-7ef3-4926-bcb7-3f2c8fd87314",
      },
  }) 
  }
};

//   Токен: 275e97d7-7ef3-4926-bcb7-3f2c8fd87314
// Идентификатор группы: wff-cohort-8

Promise.all([getCards(), getProfile()])//, updateProfile(), createMyCard()
.then(([allCards]) => {
  console.log({
    allCards,
    //profile
  });
});
