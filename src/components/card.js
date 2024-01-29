import { fnCloseModal, addCardModal } from './modal.js'
import { initialCards } from '../cards.js';

function createElement(name, link, deleteCard, fnLikeButton, addCardModal) {
    const cardTemplate = document.querySelector('#card-template');
    const cardElement = cardTemplate.content.cloneNode(true);

    const cardTitle = cardElement.querySelector('.card__title');
    const cardImage = cardElement.querySelector('.card__image');
    const cardToLike = cardElement.querySelector('.card__like-button');
    const removeButton = cardElement.querySelector('.card__delete-button');

    cardTitle.textContent = name;
    cardImage.src = link;
    cardImage.alt = name;
    cardImage.addEventListener("click", addCardModal)
    removeButton.addEventListener("click", deleteCard);
    cardToLike.addEventListener("click", fnLikeButton);

    return cardElement;
}

function deleteCard(event) {
    const cardToDelete = event.target.closest('.card');
    cardToDelete.remove();
}

function fnLikeButton(event) {
    const cardToLike = event.target.closest('.card__like-button');
    cardToLike.classList.toggle("card__like-button_is-active")
}

export { deleteCard, createElement, fnLikeButton }
