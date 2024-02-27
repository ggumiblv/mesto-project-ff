import "../pages/index.css";
import { initialCards, createCard, createNewCard } from "./cards";
import { openPopUp, closePopup, handleProfileFormSubmit } from "./modals";

// @todo: DOM узлы

export const placesList = document.querySelector(".places__list");

// @todo: Темплейт карточки

export const cardTemplate = document.querySelector("#card-template").content;

// @todo: Вывести карточки на страницу

initialCards.forEach((item) => {
  placesList.append(createCard(item));
});

//Открытие и закрытие попапов

const openProfilePopUp = document.querySelector(".profile__edit-button");
const closeProfilePopUp = document.querySelector(".popup_type_edit_close");
export const ProfilePopUp = document.querySelector(".popup_type_edit");

openProfilePopUp.addEventListener("click", function (evt) {
  evt.preventDefault();
  openPopUp(ProfilePopUp);
});

closeProfilePopUp.addEventListener("click", () => {
  closePopup(ProfilePopUp);
});

const openAddPopUp = document.querySelector(".profile__add-button");
const closeAddPopUp = document.querySelector(".popup_type_new-card_close");
export const AddPopUp = document.querySelector(".popup_type_new-card");

openAddPopUp.addEventListener("click", function (evt) {
  evt.preventDefault();
  openPopUp(AddPopUp);
});

closeAddPopUp.addEventListener("click", () => {
  closePopup(AddPopUp);
});

const closeImagePopUp = document.querySelector(".popup_type_image_close");
export const ImagePopUp = document.querySelector(".popup_type_image");

closeImagePopUp.addEventListener("click", () => {
  closePopup(ImagePopUp);
});

// закрытие кликом по оверлею, esc

export const closePopupEsc = (evt) => {
  if (evt.key === "Escape") {
    const openPopup = document.querySelector(".popup_is-opened");
    closePopup(openPopup);
  }
}

ProfilePopUp.addEventListener("click", (evt) => {
  if (evt.target === ProfilePopUp) {
    closePopup(ProfilePopUp);
  }
});

AddPopUp.addEventListener("click", (evt) => {
  if (evt.target === AddPopUp) {
    closePopup(AddPopUp);
  }
});

ImagePopUp.addEventListener("click", (evt) => {
  if (evt.target === ImagePopUp) {
    closePopup(ImagePopUp);
  }
});

// Редактирование профиля

const profileFormElement = document.querySelector('[name="edit-profile"]');

export const nameInput = document.querySelector(".popup__input_type_name");
export const jobInput = document.querySelector(".popup__input_type_description");

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

//Добавление новой карточки

export const namePlaceInput = document.querySelector(".popup__input_type_card-name");
export const linkPlaceInput = document.querySelector(".popup__input_type_url");

const newCardFormElement = document.querySelector(".popup_type_new-card");
newCardFormElement.addEventListener("submit", createNewCard);