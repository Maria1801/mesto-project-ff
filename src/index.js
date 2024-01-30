import './styles/index.css';
import { initialCards } from './cards.js';
import { openPopup, closePopup } from './components/modal.js';
import { deleteCard, createElement, fnLikeButton } from './components/card.js';

const placesList = document.querySelector('.places__list');
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupsClose = document.querySelectorAll(".popup__close");
const popupImage = document.querySelector(".popup_type_image");
const popupName = document.querySelector('.popup__input_type_name');
const popupDescription = document.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popupCardName = document.querySelector('.popup__input_type_card-name');
const popupUrl = document.querySelector('.popup__input_type_url');
const popupImageImg = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");

editButton.addEventListener("click", () => {
    openPopup(popupEdit);
    createInfo();
});

addButton.addEventListener("click", () => {
    openPopup(popupNewCard);
});

popupsClose.forEach(popup =>
    popup.addEventListener("click", () => {
        closePopup(popupEdit);
        closePopup(popupNewCard);
        closePopup(popupImage);
    })
)

document.addEventListener("click", (event) => {
    if (event.target == popupEdit ||
        event.target == popupNewCard ||
        event.target == popupImage) {
        closePopup(popupEdit)
        closePopup(popupNewCard)
        closePopup(popupImage)
    }
});

function addCardModal(event) {
    const card = event.target.closest('.card__image');

    popupImageImg.src = card.src;
    popupImageImg.alt = card.alt;
    popupCaption.textContent = card.alt;

    openPopup(popupImage);
}

initialCards.forEach(cardInfo => {
    placesList.append(createElement(cardInfo.name, cardInfo.link, deleteCard, fnLikeButton, addCardModal));
})

function createCard(evt) {
    placesList.prepend(createElement(popupCardName.value, popupUrl.value, deleteCard, fnLikeButton, addCardModal))
    closePopup(popupNewCard);

    evt.target.reset()
}

function createInfo() {
    popupName.value = profileTitle.innerText;
    popupDescription.value = profileDescription.innerText;
}

const formElement = document.forms['edit-profile']

function handleFormSubmit(evt) {
    const nameValue = popupName.value;
    const jobValue = popupDescription.value;

    profileTitle.textContent = nameValue;
    profileDescription.textContent = jobValue;

    closePopup(popupEdit);
}

formElement.addEventListener('submit', handleFormSubmit);

const formCreateCard = document.forms['new-place']
formCreateCard.addEventListener('submit', createCard);
