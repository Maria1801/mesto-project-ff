function fnOpenModal(elemnt) {
    elemnt.classList.add("popup_is-opened")
}

function fnCloseModal(elemnt) {
    elemnt.classList.remove("popup_is-opened")
}

function addCardModal(event) {
    const card = event.target.closest('.card__image');
    const popupImageImg = document.querySelector(".popup__image");
    const popupCaption = document.querySelector(".popup__caption");
    const popupImage = document.querySelector(".popup_type_image");

    popupImageImg.src = card.src
    popupImageImg.alt = card.alt
    popupCaption.textContent = card.alt

    popupImage.classList.add("popup_is-opened")
}

export { fnOpenModal, fnCloseModal, addCardModal }
