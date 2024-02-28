//Открытие и закрытие попапов

export function openPopUp(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupEsc);
}

export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupEsc);
}

const closePopupEsc = (evt) => {
    if (evt.key === "Escape") {
      const openedPopup = document.querySelector(".popup_is-opened");
      closePopup(openedPopup);
    }
  };

