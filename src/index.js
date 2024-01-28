import './styles/index.css';
import { initialCards } from './cards.js';
import { fnOpenModal, fnCloseModal } from './components/modal.js';
import { deleteCard, createElement, createCard, fnLikeButton } from './components/card.js';

const placesList = document.querySelector('.places__list');

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupsClose = document.querySelectorAll(".popup__close");
const popupImage = document.querySelector(".popup_type_image");

editButton.addEventListener("click", () => {
    fnOpenModal(popupEdit);
    createInfo();
});

addButton.addEventListener("click", () => {
    fnOpenModal(popupNewCard);
});

popupsClose.forEach(popup =>
    popup.addEventListener("click", () => {
        fnCloseModal(popupEdit);
        fnCloseModal(popupNewCard);
        fnCloseModal(popupImage);
    })
)

document.addEventListener("click", (event) => {
    if (event.target == popupEdit ||
        event.target == popupNewCard ||
        event.target == popupImage) {
        fnCloseModal(popupEdit)
        fnCloseModal(popupNewCard)
        fnCloseModal(popupImage)
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key == "Escape") {
        fnCloseModal(popupEdit)
        fnCloseModal(popupNewCard)
        fnCloseModal(popupImage)
    }
});

initialCards.forEach(cardInfo => {
    placesList.append(createElement(cardInfo.name, cardInfo.link, deleteCard, fnLikeButton));
})

function createInfo() {
    const popupName = document.querySelector('.popup__input_type_name');
    const popupDescription = document.querySelector('.popup__input_type_description');
    const profileTitle = document.querySelector('.profile__title');
    const profileDescription = document.querySelector('.profile__description');

    popupName.value = profileTitle.innerText;
    popupDescription.value = profileDescription.innerText;
}

const formElement = document.forms['edit-profile']

const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

function handleFormSubmit(evt) {
    const nameValue = nameInput.value;
    const jobValue = jobInput.value;

    const profileDescription = document.querySelector('.profile__description');
    const profileTitle = document.querySelector('.profile__title');

    profileTitle.textContent = nameValue;
    profileDescription.textContent = jobValue;

    fnCloseModal(popupEdit);
}

formElement.addEventListener('submit', handleFormSubmit);

const formCreateCard = document.forms['new-place']
formCreateCard.addEventListener('submit', createCard);
