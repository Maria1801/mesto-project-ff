const cardTemplate = document.querySelector('#card-template');
const placesList = document.querySelector('.places__list');

function createElement(name, link, deleteCard) {
    const cardElement = cardTemplate.content.cloneNode(true);

    const cardTitle = cardElement.querySelector('.card__title');
    const cardImage = cardElement.querySelector('.card__image');
    const removeButton = cardElement.querySelector('.card__delete-button');

    cardTitle.textContent = name;
    cardImage.src = link;
    cardImage.alt = name;
    removeButton.addEventListener("click", deleteCard);

    return cardElement;
}

function deleteCard(event) {
    const cardToDelete = event.target.closest('.card');
    cardToDelete.remove();
}

initialCards.forEach(cardInfo => {
    placesList.append(createElement(cardInfo.name, cardInfo.link, deleteCard));
})
