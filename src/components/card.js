function createElement(cardInfo, myId, isLikedMe, deleteCardCallback, likeCardCallback, addCardModal) {
    const name = cardInfo.name;
    const link = cardInfo.link;
    const likeCount = cardInfo.likes.length;
    const user = cardInfo.owner;
    const cardId = cardInfo._id;
    const isAuthor = cardInfo.owner._id === myId;

    const cardTemplate = document.querySelector('#card-template');
    const cardElement = cardTemplate.content.cloneNode(true);

    const cardTitle = cardElement.querySelector('.card__title');
    const cardImage = cardElement.querySelector('.card__image');
    const cardToLike = cardElement.querySelector('.card__like-button');
    const removeButton = cardElement.querySelector('.card__delete-button');
    const likeCounter = cardElement.querySelector('.card__like-counter');

    fnLikeButton(cardToLike, likeCounter, isLikedMe, likeCount);

    cardTitle.textContent = name;
    cardImage.src = link;
    cardImage.alt = name;
    cardImage.addEventListener("click", addCardModal)
    cardToLike.addEventListener("click", () => {
        const isLikedMeNow = cardToLike.classList.contains("card__like-button_is-active");
        likeCardCallback(cardId, cardToLike, likeCounter, isLikedMeNow, myId)
    });

    if (!isAuthor) {
        removeButton.style.display = 'none';
    } else {
        removeButton.addEventListener("click", (event) => deleteCardCallback(event, cardId));
    }

    return cardElement;
}

function deleteCard(event) {
    const cardToDelete = event.target.closest('.card');
    cardToDelete.remove();
}

function fnLikeButton(cardToLike, likeCounter, isLikedMe, count) {
    if (isLikedMe) {
        cardToLike.classList.add("card__like-button_is-active");
    } else {
        cardToLike.classList.remove("card__like-button_is-active");
    }
    likeCounter.textContent = count;
}

export { deleteCard, createElement, fnLikeButton }
