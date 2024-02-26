import "../pages/index.css";
import { initialCards } from "./cards";

// @todo: Темплейт карточки

const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы

const placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки

function createCard(cardDetails) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardTitle.textContent = cardDetails.name;
  cardImage.src = cardDetails.link;
  cardImage.alt = cardDetails.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    deleteCard(cardElement);
  });

   const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", likeCard);

  cardImage.addEventListener("click", () => {
    openPopUp(ImagePopUp);
    openImage(cardDetails);
  });

  //открыть карточку нажатием

  return cardElement;
}

function openImage(newCardDetails) {
  const popupImage = document.querySelector(".popup__image");
  const popupCaption = document.querySelector(".popup__caption");
  popupImage.src = newCardDetails.link;
  popupImage.alt = newCardDetails.name;
  popupCaption.textContent = newCardDetails.name;
}

function likeCard(event) {
  event.target.classList.toggle("card__like-button_is-active");
}

// @todo: Функция удаления карточки

function deleteCard(cardElement) {
  cardElement.remove();
}

// @todo: Вывести карточки на страницу

initialCards.forEach((item) => {
  placesList.append(createCard(item));
});

//Открытие и закрытие попапов

function openPopUp(evt) {
  evt.classList.add("popup_is-opened");
}

function closePopup(evt) {
  evt.classList.remove("popup_is-opened");
}

const openProfilePopUp = document.querySelector(".profile__edit-button");
const closeProfilePopUp = document.querySelector(".popup_type_edit_close");
const ProfilePopUp = document.querySelector(".popup_type_edit");

openProfilePopUp.addEventListener("click", function (evt) {
  evt.preventDefault();
  openPopUp(ProfilePopUp);
});

closeProfilePopUp.addEventListener("click", () => {
  closePopup(ProfilePopUp);
});

const openAddPopUp = document.querySelector(".profile__add-button");
const closeAddPopUp = document.querySelector(".popup_type_new-card_close");
const AddPopUp = document.querySelector(".popup_type_new-card");

openAddPopUp.addEventListener("click", function (evt) {
  evt.preventDefault();
  openPopUp(AddPopUp);
});

closeAddPopUp.addEventListener("click", () => {
  closePopup(AddPopUp);
});

const openImagePopUp = document.querySelector(".card");
const closeImagePopUp = document.querySelector(".popup_type_image_close");
const ImagePopUp = document.querySelector(".popup_type_image");

// openImagePopUp.addEventListener("click", function (evt) {
//   evt.preventDefault();
//   openPopUp(ImagePopUp);
// });

closeImagePopUp.addEventListener("click", () => {
  closePopup(ImagePopUp);
});

// закрытие кликом по оверлею

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    const openPopup = document.querySelector(".popup_is-opened");
    closePopup(openPopup);
  }
});

ProfilePopUp.addEventListener("click", (event) => {
  if (event.target === ProfilePopUp) {
    closePopup(ProfilePopUp);
  }
});

AddPopUp.addEventListener("click", (event) => {
  if (event.target === AddPopUp) {
    closePopup(AddPopUp);
  }
});

ImagePopUp.addEventListener("click", (event) => {
  if (event.target === ImagePopUp) {
    closePopup(ImagePopUp);
  }
});

// Редактирование профиля

const profileFormElement = document.querySelector('[name="edit-profile"]');

const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const nameInputValue = nameInput.value;
  const jobInputValue = jobInput.value;

  const currentName = document.querySelector(".profile__title");
  const currentDescription = document.querySelector(".profile__description");

  currentName.textContent = nameInputValue;
  currentDescription.textContent = jobInputValue;
  closePopup(ProfilePopUp);
}
profileFormElement.addEventListener("submit", handleProfileFormSubmit);

//добавление карточки

const newCardFormElement = document.querySelector('.popup_type_new-card')
const namePlaceInput = document.querySelector(".popup__input_type_card-name");
const linkPlaceInput = document.querySelector(".popup__input_type_url");

function createNewCard(evt) {
  evt.preventDefault();
  
  const newCardDetails = {
    'name': namePlaceInput.value,
    'link': linkPlaceInput.value,
};

placesList.prepend(createCard(newCardDetails));
   closePopup(AddPopUp);
}

 newCardFormElement.addEventListener("submit", createNewCard);
