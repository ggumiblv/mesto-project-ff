import "../pages/index.css";
import { createCard, likeCard } from "./card";
import { openPopUp, closePopup } from "./modals";
import {
  getCards,
  getProfile,
  updateAvatar,
  updateProfile,
  createMyCard,
  deleteMyCard,
  deleteLike,
  putLike,
} from "./api";
import { enableValidation, clearValidation } from "./validation";

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
const popupCardButton = document.querySelector(".popup__button-card");
const deleteSureButton = document.querySelector(".popup__button_sure_delete");
const avatarImage = document.querySelector(".profile__image");
const avatarPopup = document.querySelector(".popup_type_update-avatar");
const avatarInput = document.querySelector(".popup__input_avatar_url");
const avatarButton = document.querySelector(
  ".popup__button_sure_change-avatar"
);
let myProfileData = "";

let cardToDelete = "";
const deleteCardPopup = document.querySelector(".popup_type_delete-card");

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

  namePlaceInput.value = "";
  linkPlaceInput.value = "";
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

const popupProfileButton = document.querySelector(".popup__button-profile");

// Редактирование профиля

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const name = nameInput.value;
  const about = jobInput.value;

  popupProfileButton.textContent = "Сохранение...";

  updateProfile(name, about)
    .then((result) => {
      currentName.textContent = result.name;
      currentDescription.textContent = result.about;
    })
    .finally(() => {
      popupProfileButton.textContent = "Сохранить";
    });

  closePopup(profilePopUp);
}

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

//добавление карточки

function createNewCard(evt) {
  evt.preventDefault();

  const name = namePlaceInput.value;
  const link = linkPlaceInput.value;
  const idCard = myProfileData._id;

  popupCardButton.textContent = "Сохранение...";

  createMyCard(name, link, idCard)
    .then((data) => {
      placesList.prepend(
        createCard(
          data,
          deleteMyCard,
          likeCard,
          openPopUp,
          openImage,
          getProfileData,
          putLike,
          deleteLike,
          deleteCallback
        )
      );
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      popupCardButton.textContent = "Создать";
    });

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

enableValidation(validationConfig);

const getProfileData = () => {
  return myProfileData;
};

Promise.all([getCards(), getProfile()])
  .then(([cards, data]) => {
    myProfileData = data;
    const userName = data.name;
    const userAbout = data.about;
    const userAvatar = data.avatar;

    const profileImage = document.querySelector(".profile__image");
    profileImage.style.backgroundImage = `url(${userAvatar})`;

    const profileTitle = document.querySelector(".profile__title");
    profileTitle.textContent = userName;

    const profileDescription = document.querySelector(".profile__description");
    profileDescription.textContent = userAbout;

    cards.forEach(function (cardDetails) {
      placesList.append(
        createCard(
          cardDetails,
          deleteMyCard,
          likeCard,
          openPopUp,
          openImage,
          getProfileData,
          putLike,
          deleteLike,
          deleteCallback
        )
      );
    });
  })
  .catch((error) => console.error(error));

//change avatar

avatarImage.addEventListener("click", () => {
  openPopUp(avatarPopup);
});

avatarButton.addEventListener("click", () => {
  const link = avatarInput.value;
  avatarButton.textContent = "Сохранение...";
  updateAvatar(link)
    .then((result) => {
      avatarImage.style.backgroundImage = `url(${result.avatar})`;
    })
    .finally(() => {
      avatarButton.textContent = "Сохранить";
    });
});

//delete card

const deleteCallback = (cardElement) => {
  cardToDelete = cardElement;
  openPopUp(deleteCardPopup);
};

const deleteMyCardCallback = (cardToDelete, myProfileData) => {
  if (cardToDelete.CreatorID === myProfileData._id) {
    deleteMyCard(cardToDelete)
      .then(() => {
        cardToDelete.remove();
      })
      .finally(() => {
        deleteSureButton.textContent = "Да";
      });

    closePopup(deleteCardPopup);
    deleteSureButton.textContent = "Сохранение...";
  }
};

deleteSureButton.addEventListener("click", () => {
  deleteMyCardCallback(cardToDelete, myProfileData);
});
