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

// @todo: Вывести карточки на страницу

initialCards.forEach((cardDetails) => {
  placesList.append(
    createCard(cardDetails, deleteCard, likeCard, openPopUp, openImage)
  );
});

export function openImage(newCardDetails) {
  openPopUp(imagePopUp)

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

openingButtonAddPopUp.addEventListener("click", function (evt) {
  evt.preventDefault();
  openPopUp(addPopUp);
});

const popups = document.querySelectorAll(".popup");  // Выбираем все существующие попапы в коллекцию
popups.forEach( popup => { // Для каждого попапа делаем следуюущее
  const closeButton = popup.querySelector(".popup__close");  // Находим в попапе кнопку крестик
  closeButton.addEventListener("click", () => closePopup( popup ) );  // Устанавливаем слушатель на крестик
  popup.addEventListener('mousedown', (evt) => {    // Устанавливаем слушатель оверлея
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

addFormElement.addEventListener("submit", createNewCard);
