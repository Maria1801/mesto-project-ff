const addImage = new URL('./images/add-icon.svg', import.meta.url);
const avatarImage = new URL('./images/avatar.jpg', import.meta.url);
const card_1Image = new URL('./images/card_1.jpg', import.meta.url);
const card_2Image = new URL('./images/card_2.jpg', import.meta.url);
const card_3Image = new URL('./images/card_3.jpg', import.meta.url);
const closeImage = new URL('./images/close.svg', import.meta.url);
const deleteImage = new URL('./images/delete-icon.svg', import.meta.url);
const editImage = new URL('./images/edit-icon.svg', import.meta.url);
const activeImage = new URL('./images/like-active.svg', import.meta.url);
const inactiveImage = new URL('./images/like-inactive.svg', import.meta.url);
const logoImage = new URL('./images/logo.svg', import.meta.url);

const whoIsTheGoat = [

    { name: 'Add icon', link: addImage },
    { name: 'Avatar', link: avatarImage },
    { name: 'Card_1', link: card_1Image },
    { name: 'Card_2', link: card_2Image },
    { name: 'Card_3', link: card_3Image },
    { name: 'Close', link: closeImage },
    { name: 'Delete icon', link: deleteImage },
    { name: 'Edit icon', link: editImage },
    { name: 'Like active', link: activeImage },
    { name: 'Like inactive', link: inactiveImage },
    { name: 'Logo', link: logoImage }
];

import './styles/index.css';
import { initialCards } from './cards.js';
import { fnOpenModal, fnCloseModal } from './components/modal.js';



const cardTemplate = document.querySelector('#card-template');
const placesList = document.querySelector('.places__list');

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupsClose = document.querySelectorAll(".popup__close");
const popupImage = document.querySelector(".popup_type_image");
const popupImageImg = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");



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

function createElement(name, link, deleteCard) {
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

function addCardModal(event) {
    const card = event.target.closest('.card__image');

    popupImageImg.src = card.src
    popupImageImg.alt = card.alt
    popupCaption.textContent = card.alt

    popupImage.classList.add("popup_is-opened")
}
function fnLikeButton(event) {
    const cardToLike = event.target.closest('.card__like-button');
    cardToLike.classList.toggle("card__like-button_is-active")
}

function deleteCard(event) {
    const cardToDelete = event.target.closest('.card');
    cardToDelete.remove();
}

initialCards.forEach(cardInfo => {
    placesList.append(createElement(cardInfo.name, cardInfo.link, deleteCard));
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

const nameInput = document.querySelector('.popup__input_type_name');// Воспользуйтесь инструментом .querySelector()
const jobInput = document.querySelector('.popup__input_type_description');// Воспользуйтесь инструментом .querySelector()

function handleFormSubmit(evt) {
    const nameValue = nameInput.value;
    const  jobValue = jobInput.value;
 
    const profileDescription = document.querySelector('.profile__description');
    const profileTitle = document.querySelector('.profile__title');

    profileTitle.textContent = nameValue;
    profileDescription.textContent = jobValue;

    fnCloseModal(popupEdit);
}

formElement.addEventListener('submit', handleFormSubmit);

const formElement2 = document.forms['new-place']

function createCard() {
    const name = document.querySelector('.popup__input_type_card-name');
    const link = document.querySelector('.popup__input_type_url');

    const newCard = {
        name: name.value,
        link: link.value
    }
    initialCards.unshift(newCard)

    fnCloseModal(popupNewCard);

    document.querySelectorAll(".card").forEach( card => card.remove())
    initialCards.forEach(cardInfo => {
        placesList.append(createElement(cardInfo.name, cardInfo.link, deleteCard));
    })
}

formElement2.addEventListener('submit', createCard);






// const heart = document.querySelector('.card__like-button');
// heart.addEventListener("click", () => {
//     fnLikeButton(hearts);
// });
// const fnLikeButton = function(elemnt) {
//     elemnt.classList.add("card__like-button_is-active-opened")
//     console.log('ggggg')
// }

// heart.forEach(heart =>
//     heart.addEventListener("click", () => {
//         fnLikeButton()
//     })
// )