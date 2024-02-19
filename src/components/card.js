function createElement(name, link, likeCount, isAuthor, isLikedMe, user, cardId, deleteCard, deleteCardApi, fnLikeButton, fnLikeButtonApi, fnUnlikeButtonApi, addCardModal) {
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
        if (isLikedMeNow) {
            fnUnlikeButtonApi(cardId).then((res) => {
                console.log('fnUnlikeButtonApi')
                console.log(res)
                const isLikedMe = res.likes.some(u => u._id === user._id)
                fnLikeButton(cardToLike, likeCounter, isLikedMe, res.likes.length)
            })
        } else {
            fnLikeButtonApi(cardId).then((res) => {
                console.log('fnLikeButtonApi')
                console.log(res)
                const isLikedMe = res.likes.some(u => u._id === user._id)
                fnLikeButton(cardToLike, likeCounter, isLikedMe, res.likes.length)
            })
        }
    });

    if (!isAuthor) {
        removeButton.style.display = 'none';
    } else {
        removeButton.addEventListener("click", (event) => {
            deleteCardApi(cardId).then(deleteCard(event))
        });
    }

    return cardElement;
}

function deleteCard(event) {
    const cardToDelete = event.target.closest('.card');
    cardToDelete.remove();
}

function fnLikeButton(cardToLike, likeCounter, isLikedMe, count) {
    if(isLikedMe) {
        cardToLike.classList.add("card__like-button_is-active");
    } else {
        cardToLike.classList.remove("card__like-button_is-active");
    }
    likeCounter.textContent = count;
}

export { deleteCard, createElement, fnLikeButton }
