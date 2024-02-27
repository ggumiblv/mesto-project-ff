import { ProfilePopUp, nameInput, jobInput, closePopupEsc } from "./index";

//Открытие и закрытие попапов

export function openPopUp(evt) {
  evt.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupEsc);
}

export function closePopup(evt) {
  evt.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupEsc);
}

export function handleProfileFormSubmit(evt) {

    evt.preventDefault();
  
    const nameInputValue = nameInput.value;
    const jobInputValue = jobInput.value;
  
    const currentName = document.querySelector(".profile__title");
    const currentDescription = document.querySelector(".profile__description");
  
    currentName.textContent = nameInputValue;
    currentDescription.textContent = jobInputValue;

    closePopup(ProfilePopUp);
  }