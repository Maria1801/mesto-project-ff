const fnOpenModal = function(elemnt) {
    elemnt.classList.add("popup_is-opened")
}

const fnCloseModal = function(elemnt) {
    elemnt.classList.remove("popup_is-opened")
}

export { fnOpenModal, fnCloseModal }
  