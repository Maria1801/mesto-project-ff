function handleResponse(res) {   
    if (res.ok) {
      return res.json();
    }  
    return Promise.reject(res.status)    
  };

function getFromServer(url) {
    return fetch(url, {
        method: 'GET',
        headers: {
            authorization: 'c5139b1d-af8c-4edd-a1ef-591582a9e812'
        }
    })
        .then(res => handleResponse(res))
}

function getCards() {
    return getFromServer('https://nomoreparties.co/v1/wff-cohort-7/cards');
}

function getUser() {
    return getFromServer('https://nomoreparties.co/v1/wff-cohort-7/users/me');
}

function editUser(nameInput, aboutInput) {
    return fetch('https://nomoreparties.co/v1/wff-cohort-7/users/me', {
        method: 'PATCH',
        headers: {
            authorization: 'c5139b1d-af8c-4edd-a1ef-591582a9e812',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: nameInput,
            about: aboutInput
        })
    })
    .then(res => handleResponse(res))
}

function addCard(nameInput, linkInput) {
    return fetch('https://nomoreparties.co/v1/wff-cohort-7/cards', {
        method: 'POST',
        headers: {
            authorization: 'c5139b1d-af8c-4edd-a1ef-591582a9e812',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: nameInput,
            link: linkInput
        })
    })
    .then(res => handleResponse(res))
}

function deleteCard(cardId) {
    return fetch('https://nomoreparties.co/v1/wff-cohort-7/cards/' + cardId, {
        method: 'DELETE',
        headers: {
            authorization: 'c5139b1d-af8c-4edd-a1ef-591582a9e812'
        }
    }).then(res => handleResponse(res))
}

function likeCard(cardId) {
    return fetch('https://nomoreparties.co/v1/wff-cohort-7/cards/likes/' + cardId, {
        method: 'PUT',
        headers: {
            authorization: 'c5139b1d-af8c-4edd-a1ef-591582a9e812'
        }
    }).then(res => handleResponse(res))
}

function unlikeCard(cardId) {
    return fetch('https://nomoreparties.co/v1/wff-cohort-7/cards/likes/' + cardId, {
        method: 'DELETE',
        headers: {
            authorization: 'c5139b1d-af8c-4edd-a1ef-591582a9e812'
        }
    }).then(res => handleResponse(res))
}

function avatarEdit(linkAvatar) {
    return fetch('https://nomoreparties.co/v1/wff-cohort-7/users/me/avatar', {
        method: 'PATCH',
        headers: {
            authorization: 'c5139b1d-af8c-4edd-a1ef-591582a9e812',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            avatar: linkAvatar
        })
    })
    .then(res => handleResponse(res))
}


export { getCards, getUser, editUser, addCard, deleteCard, likeCard, unlikeCard, avatarEdit }