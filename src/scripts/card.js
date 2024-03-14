// @todo: Функция создания карточки

import { closePopup } from "./modals";

export function createCard(cardDetails, deleteMyCard, likeCard, likeMyCard, openPopUp, openImage, getProfileData) {

    const cardTemplate = document.querySelector("#card-template").content;
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    const cardImage = cardElement.querySelector(".card__image");
    const cardTitle = cardElement.querySelector(".card__title");
    const imagePopUp = document.querySelector(".popup_type_image");
    const deleteCardPopup = document.querySelector(".popup_type_delete-card");
    const deleteSureButton = document.querySelector(".popup__button_sure_delete");
    const deleteButton = cardElement.querySelector(".card__delete-button");
    const likeCounter = cardElement.querySelector(".likes-counter");
    const likeButton = cardElement.querySelector(".card__like-button");
    
    cardTitle.textContent = cardDetails.name;
    cardImage.src = cardDetails.link;
    cardImage.alt = cardDetails.name;
    cardElement.LikedByMe = false;

    const myProfileData  = getProfileData();

    if (cardDetails.owner === undefined)
    {
      likeCounter.textContent = 0;
      cardElement.CreatorID = myProfileData._id;
      likeCounter.remove;
    }
    else
    {
      cardElement.CreatorID = cardDetails.owner._id;
      cardElement.ElementId = cardDetails._id;
      if (cardDetails.likes.length != 0) {
        likeCounter.textContent = cardDetails.likes.length;
        cardDetails.likes.forEach(element => {
          if (element._id === myProfileData._id)
          {
            cardElement.LikedByMe = true;
            likeButton.classList.add("card__like-button_is-active");
          }
        });
      }
      else
      {
        likeCounter.remove;
      }
    }
    
    if (cardElement.CreatorID === myProfileData._id)
    {
      deleteButton.addEventListener("click", () => {
      openPopUp(deleteCardPopup);
      deleteSureButton.addEventListener("click", () => {
        deleteMyCard(cardElement);
        closePopup(deleteCardPopup);
     });
    });
    }
    else
    {
      deleteButton.remove();
    }    
    
    likeButton.addEventListener("click", () => {
    likeMyCard(cardElement);
    });

    cardImage.addEventListener("click", () => {
      openImage(cardDetails);
    });
  
    return cardElement;
  }
   
  export function likeCard(evt) {
    const likeCounter = evt.target.parentElement.querySelector(".likes-counter");
    if (evt.target.classList.contains("card__like-button_is-active"))
    {
      likeCounter.textContent = Number(likeCounter.textContent) - 1;
    }
    else
    {
      likeCounter.textContent = Number(likeCounter.textContent) + 1;
    }
    evt.target.classList.toggle("card__like-button_is-active");
  }
  

