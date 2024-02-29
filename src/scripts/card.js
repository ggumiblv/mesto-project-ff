// @todo: Функция создания карточки

export function createCard(cardDetails, deleteCard, likeCard, openPopUp, openImage) {

    const cardTemplate = document.querySelector("#card-template").content;
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    const cardImage = cardElement.querySelector(".card__image");
    const cardTitle = cardElement.querySelector(".card__title");
    const imagePopUp = document.querySelector(".popup_type_image");
  
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
      openImage(cardDetails);
    });
  
    return cardElement;
  }
   
  export function likeCard(evt) {
    evt.target.classList.toggle("card__like-button_is-active");
  }
  
  // @todo: Функция удаления карточки
  
  export function deleteCard(cardElement) {
    cardElement.remove();
  }
