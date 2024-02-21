import '../pages/index.css';
import {initialCards} from './cards'

// @todo: Темплейт карточки

const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы

const placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки

function createCard(cardDetails) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');

  cardElement.querySelector(".card__title").textContent = cardDetails.name;
  cardImage.src = cardDetails.link; 
  cardImage.alt = cardDetails.name; 

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    deleteCard(cardElement);
  });

  deleteButton.addEventListener("click", () => {
    deleteCard(cardElement);
  });

  return cardElement;
}

console.log ('hello');
// @todo: Функция удаления карточки

function deleteCard(cardElement) {
  cardElement.remove();
}

// @todo: Вывести карточки на страницу

initialCards.forEach((item) => {
  placesList.append(createCard(item));
});


// profile__edit-button profile__add-button 

const accountInfo = document.querySelector('.profile__edit-button');
const addCard = document.querySelector('.profile__add-button');

accountInfo.addEventListener('click', )
