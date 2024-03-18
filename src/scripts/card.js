// @todo: Функция создания карточки

import { closePopup } from "./modals";

export function createCard(cardDetails, deleteMyCard, likeCard, openPopUp, openImage, getProfileData, putLike, deleteLike) {

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
      cardElement.CreatorID = myProfileData._id;
      likeCounter.remove;
    }
    else
    {
      cardElement.CreatorID = cardDetails.owner._id;
      cardElement.ElementId = cardDetails._id;

   isLiked(cardDetails);
    
    if (cardElement.CreatorID === myProfileData._id)
    {
      deleteButton.addEventListener("click", () => {
      openPopUp(deleteCardPopup);
      deleteSureButton.addEventListener("click", () => {
        deleteMyCard(cardElement, myProfileData)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
        }).finally(() => {
          deleteSureButton.textContent = "Сохранить";
        });

        closePopup(deleteCardPopup);
        deleteSureButton.textContent = "Сохранение...";
     });
    });
    }
    else
    {
      deleteButton.remove();
    }    
    
    likeButton.addEventListener("click", () => {
    likeCard(cardElement, putLike, deleteLike, myProfileData);
    });

    cardImage.addEventListener("click", () => {
      openImage(cardDetails);
    });
  
    return cardElement;
  }
   
function isLiked (cardDetails) {
   // если лайков не 0
 if (cardDetails.likes.length != 0) 
 {
   // то присвоить счетчику кол-во
   likeCounter.textContent = cardDetails.likes.length;
   //и обходим каждый лайк и если там есть мой
   cardDetails.likes.forEach(element => {
     if (element._id === myProfileData._id)
     {
       //то отрисовываем что кнопка активна и присваиваем лайкедбай ми тру
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
}

export const likeCard = (card, putLike, deleteLike, myProfileData) => {
  const likeButton = card.querySelector(".card__like-button");
  const likeCounter = card.querySelector(".likes-counter");
  if (card.LikedByMe !== true) {
    putLike(card, myProfileData)
      .then((res) => {
        if (res.ok) {
          likeCounter.textContent = Number(likeCounter.textContent) + 1;
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(() => {
        card.LikedByMe = true;
        likeButton.classList.toggle("card__like-button_is-active");
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    card.LikedByMe = false;
    likeCounter.textContent = Number(likeCounter.textContent) - 1;
    if (likeCounter === 0) {
      likeCounter.remove;
    } else {
      likeButton.classList.toggle("card__like-button_is-active");
    }
    deleteLike(card, myProfileData);
  }
};

