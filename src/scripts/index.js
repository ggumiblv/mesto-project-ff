import "../pages/index.css";
import { initialCards } from "./cards";
import { createCard, deleteCard, likeCard } from "./card";
import { openPopUp, closePopup } from "./modals";

const placesList = document.querySelector(".places__list");
const openingButtonProfilePopUp = document.querySelector(
  ".profile__edit-button"
);
const closingButtonProfilePopUp = document.querySelector(
  ".popup_type_edit_close"
);
const profilePopUp = document.querySelector(".popup_type_edit");
const openingButtonAddPopUp = document.querySelector(".profile__add-button");
const closingButtonAddPopUp = document.querySelector(
  ".popup_type_new-card_close"
);
const addPopUp = document.querySelector(".popup_type_new-card");
const closingButtonImagePopUp = document.querySelector(
  ".popup_type_image_close"
);
const imagePopUp = document.querySelector(".popup_type_image");
const profileFormElement = document.querySelector('[name="edit-profile"]');
const currentName = document.querySelector(".profile__title");
const currentDescription = document.querySelector(".profile__description");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const namePlaceInput = document.querySelector(".popup__input_type_card-name");
const linkPlaceInput = document.querySelector(".popup__input_type_url");

// @todo: Вывести карточки на страницу

initialCards.forEach((cardDetails) => {
  placesList.append(
    createCard(cardDetails, deleteCard, likeCard, openPopUp, openImage)
  );
});

export function openImage(newCardDetails) {
  const popupImage = document.querySelector(".popup__image");
  const popupCaption = document.querySelector(".popup__caption");
  popupImage.src = newCardDetails.link;
  popupImage.alt = newCardDetails.name;
  popupCaption.textContent = newCardDetails.name;
}

//Открытие и закрытие попапов

openingButtonProfilePopUp.addEventListener("click", function (evt) {
  evt.preventDefault();
  openPopUp(profilePopUp);
  nameInput.value = currentName.textContent;
  jobInput.value = currentDescription.textContent;
});

closingButtonProfilePopUp.addEventListener("click", () => {
  closePopup(profilePopUp);
});

openingButtonAddPopUp.addEventListener("click", function (evt) {
  evt.preventDefault();
  openPopUp(addPopUp);
});

closingButtonAddPopUp.addEventListener("click", () => {
  closePopup(addPopUp);
});

closingButtonImagePopUp.addEventListener("click", () => {
  closePopup(imagePopUp);
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

  closePopup(profilePopUp);
}

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

//добавление карточки

function createNewCard(evt) {
  evt.preventDefault();

  const newCardDetails = {
    name: namePlaceInput.value,
    link: linkPlaceInput.value,
  };

  placesList.prepend(
    createCard(newCardDetails, deleteCard, likeCard, openPopUp, openImage)
  );
  closePopup(addPopUp);
  evt.target.reset();
}

//Добавление новой карточки

addPopUp.addEventListener("submit", createNewCard);
