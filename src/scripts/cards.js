import {closePopup, openPopUp} from "./modals";
import {ImagePopUp, placesList, AddPopUp, cardTemplate, namePlaceInput, linkPlaceInput} from "./index";

export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

// @todo: Функция создания карточки

export function createCard(cardDetails) {
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

  return cardElement;
}

function openImage(newCardDetails) {
  const popupImage = document.querySelector(".popup__image");
  const popupCaption = document.querySelector(".popup__caption");
  popupImage.src = newCardDetails.link;
  popupImage.alt = newCardDetails.name;
  popupCaption.textContent = newCardDetails.name;
}

function likeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

// @todo: Функция удаления карточки

function deleteCard(cardElement) {
  cardElement.remove();
}

//добавление карточки

export function createNewCard(evt) {
  evt.preventDefault();

  const newCardDetails = {
    name: namePlaceInput.value,
    link: linkPlaceInput.value,
  };

  placesList.prepend(createCard(newCardDetails));
  closePopup(AddPopUp);
  evt.target.reset();
}

