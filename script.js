import dragAndDrop from "./dragAndDrop.js"
import GlobalEventListener from "./GlobalEventListener.js"
dragAndDrop() //add the drag and drop functionality

//selection template
const card = document.querySelector("#card")

const addCard = e => {
  const input = e.target.nextElementSibling
  if (!input.value) return
  const cards = e.target.parentElement.previousElementSibling
  const newCard = card.content.cloneNode(true)
  const div = newCard.querySelector(".card")
  div.innerText = input.value
  cards.appendChild(newCard)
  input.value = ""
}
GlobalEventListener("click", ".add-card", addCard)
