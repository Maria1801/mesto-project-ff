function openPopup(elemnt) {
    elemnt.classList.add("popup_is-opened")
    document.addEventListener('keydown', closeByEscape);
}

function closePopup(elemnt) {
    elemnt.classList.remove("popup_is-opened")
    document.removeEventListener('keydown', closeByEscape);
}

function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened')
        closePopup(openedPopup)
    }
}

export { openPopup, closePopup }
