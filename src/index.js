import './styles/index.css';
import { openPopup, closePopup } from './components/modal.js';
import { deleteCard, createElement, fnLikeButton } from './components/card.js';
import { enableValidation, clearValidation } from './validation.js';
import { getCards, getUser, editUser, addCard, deleteCard as deleteCardApi, likeCard, unlikeCard } from './api.js';

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
const profileImage = document.querySelector('.profile__image');
const avatarButton = document.querySelector(".profile__image"); 
const popupTypeAvatar = document.querySelector(".popup_type_change-avatar");
// const popupAvatar = document.querlySelector('.popup__content_type-avatar');
const formElement = document.forms['edit-profile']
const formCreateCard = document.forms['new-place']
const formAvatar = document.forms['avatar']

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

editButton.addEventListener("click", () => {
    openPopup(popupEdit);
    createInfo();
    clearValidation(formElement, validationConfig);
});

addButton.addEventListener("click", () => {
    openPopup(popupNewCard);
    clearValidation(formCreateCard, validationConfig);
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
        closePopup(popupImage);
    }
});

function addCardModal(event) {
    const card = event.target.closest('.card__image');

    popupImageImg.src = card.src;
    popupImageImg.alt = card.alt;
    popupCaption.textContent = card.alt;

    openPopup(popupImage);
}

function createCard(evt) {
    addCard(popupCardName.value, popupUrl.value)
        .then(res => {
            console.log(res)
            placesList.prepend(createElement(popupCardName.value, popupUrl.value, 0, true, false, res.owner, res._id, deleteCard, deleteCardApi, fnLikeButton, likeCard, unlikeCard, addCardModal))
            closePopup(popupNewCard);
            evt.target.reset();
        }
        )
}

function createInfo() {
    popupName.value = profileTitle.innerText;
    popupDescription.value = profileDescription.innerText;
}


function handleFormSubmit(evt) {
    const nameValue = popupName.value;
    const jobValue = popupDescription.value;

    profileTitle.textContent = nameValue;
    profileDescription.textContent = jobValue;

    closePopup(popupEdit);
    editUser(nameValue, jobValue);
}

formElement.addEventListener('submit', handleFormSubmit);

formCreateCard.addEventListener('submit', createCard);

enableValidation(validationConfig);

Promise.all([getCards(), getUser()])
    .then(([initialCards, user]) => {
        console.log(initialCards)
        initialCards.forEach(cardInfo => {
            const author = cardInfo.owner.name;
            const isAuthor = author === user.name;
            const isLiked = cardInfo.likes.some(u => u._id === user._id)
            placesList.append(createElement(cardInfo.name, cardInfo.link, cardInfo.likes.length, isAuthor, isLiked, user, cardInfo._id, deleteCard, deleteCardApi, fnLikeButton, likeCard, unlikeCard, addCardModal));
        })
        profileTitle.textContent = user.name;
        profileDescription.textContent = user.about;
        profileImage.backgraundImage = user.avatar;
    }
    )

    
    avatarButton.addEventListener("click", () => {
        console.log(popupTypeAvatar)
        openPopup(popupTypeAvatar);
        clearValidation(formAvatar, validationConfig);
    });
  
