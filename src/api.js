const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-7',
    headers: {
      authorization: 'c5139b1d-af8c-4edd-a1ef-591582a9e812',
      'Content-Type': 'application/json'
    }
  }

function handleResponse(res) {   
    if (res.ok) {
      return res.json();
    }  
    return Promise.reject(`Ошибка: ${res.status}`)    
  };

function getFromServer(url) {
    return fetch(url, {
        method: 'GET',
        headers: config.headers
    })
        .then(res => handleResponse(res))
}

function getCards() {
    return getFromServer(config.baseUrl + '/cards');
}

function getUser() {
    return getFromServer(config.baseUrl + '/users/me');
}

function editUser(nameInput, aboutInput) {
    return fetch(config.baseUrl + '/users/me', {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: nameInput,
            about: aboutInput
        })
    })
    .then(res => handleResponse(res))
}

function addCard(nameInput, linkInput) {
    return fetch(config.baseUrl + '/cards', {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: nameInput,
            link: linkInput
        })
    })
    .then(res => handleResponse(res))
}

function deleteCard(cardId) {
    return fetch(config.baseUrl + '/cards/' + cardId, {
        method: 'DELETE',
        headers: config.headers
    }).then(res => handleResponse(res))
}

function likeCard(cardId) {
    return fetch(config.baseUrl + '/cards/likes/' + cardId, {
        method: 'PUT',
        headers: config.headers
    }).then(res => handleResponse(res))
}

function unlikeCard(cardId) {
    return fetch(config.baseUrl + '/cards/likes/' + cardId, {
        method: 'DELETE',
        headers: config.headers
    }).then(res => handleResponse(res))
}

function avatarEdit(linkAvatar) {
    return fetch(config.baseUrl + '/users/me/avatar', {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: linkAvatar
        })
    })
    .then(res => handleResponse(res))
}


export { getCards, getUser, editUser, addCard, deleteCard, likeCard, unlikeCard, avatarEdit }