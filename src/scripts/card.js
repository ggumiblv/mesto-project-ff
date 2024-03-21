// @todo: Функция создания карточки

export function createCard(
  cardDetails,
  deleteMyCard,
  likeCard,
  openPopUp,
  openImage,
  getProfileData,
  putLike,
  deleteLike,
  deleteCallback
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const imagePopUp = document.querySelector(".popup_type_image");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeCounter = cardElement.querySelector(".likes-counter");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardTitle.textContent = cardDetails.name;
  cardImage.src = cardDetails.link;
  cardImage.alt = cardDetails.name;
  cardElement.LikedByMe = false;

  const myProfileData = getProfileData();

  if (cardDetails.owner === undefined) {
    cardElement.CreatorID = myProfileData._id;
    likeCounter.remove;
  } else {
    cardElement.CreatorID = cardDetails.owner._id;
    cardElement.ElementId = cardDetails._id;

    initLikeCounter(cardDetails);

    deleteButton.addEventListener("click", () => {
      deleteCallback(cardElement, myProfileData, deleteButton);
    });
    if (cardElement.CreatorID !== myProfileData._id) {
      deleteButton.remove();
    }

    likeButton.addEventListener("click", () => {
      likeCard(cardElement, putLike, deleteLike, myProfileData, cardDetails);
    });

    cardImage.addEventListener("click", () => {
      openImage(cardDetails);
    });

    return cardElement;
  }

  function initLikeCounter(cardDetails) {
    likeCounter.textContent = cardDetails.likes.length || "";
    if (
      cardDetails.likes.some((element) => element._id === myProfileData._id)
    ) {
      cardElement.LikedByMe = true;
      likeButton.classList.add("card__like-button_is-active");
    } 
  }
}

export const likeCard = (
  card,
  putLike,
  deleteLike,
  myProfileData,
  cardDetails
) => {
  const likeMethod = card.LikedByMe ? deleteLike : putLike;
  const likeButton = card.querySelector(".card__like-button");
  const likeCounter = card.querySelector(".likes-counter");

  likeMethod(card)
    .then((res) => {
      card.LikedByMe = !card.LikedByMe;
      likeCounter.textContent = res.likes.length || "";
      likeButton.classList.toggle("card__like-button_is-active");
    })
    .catch((err) => console.log(err));
};
