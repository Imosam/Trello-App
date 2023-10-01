import GlobalEventListener from "./GlobalEventListener.js"

export default function dragAndDrop() {
  GlobalEventListener("mousedown", "[data-draggable]", e => {
    const selectedItem = e.target
    const itemClone = selectedItem.cloneNode(true)
    const ghost = selectedItem.cloneNode()
    let dropZone = getDropZone(e)
    ghost.classList.add("ghost")
    ghost.style.height = `${selectedItem.getBoundingClientRect().height}px`
    ghost.style.width = `${selectedItem.getBoundingClientRect().width}px`
    itemClone.classList.add("dragging")
    document.body.append(itemClone)
    const offset = {
      x: e.clientX - selectedItem.getBoundingClientRect().x,
      y: e.clientY - selectedItem.getBoundingClientRect().y,
    }
    clonePosition(itemClone, e, offset)
    const mouseMoveFunction = e => {
      dropZone = getDropZone(e)
      selectedItem.classList.add("hide")
      if (dropZone != null) placeGhost(ghost, dropZone, e)
      clonePosition(itemClone, e, offset)
    }
    document.addEventListener("mousemove", mouseMoveFunction)
    document.addEventListener(
      "mouseup",
      e => {
        if (dropZone != null) dropZone.insertBefore(selectedItem, ghost)
        document.removeEventListener("mousemove", mouseMoveFunction)
        itemClone.remove()
        ghost.remove()
        selectedItem.classList.remove("hide")
      },
      { once: true }
    )
  })
  function clonePosition(element, mousePos, offset) {
    element.style.top = `${mousePos.clientY - offset.y}px`
    element.style.left = `${mousePos.clientX - offset.x}px`
  }
  function placeGhost(ghost, dropZone, mousePos) {
    const closestChild = Array.from(dropZone.children).find(child => {
      return (
        mousePos.clientY <
        child.getBoundingClientRect().y +
          child.getBoundingClientRect().height / 2
      )
    })
    if (closestChild) dropZone.insertBefore(ghost, closestChild)
    else dropZone.append(ghost)
  }
  function getDropZone(e) {
    if (e.target.matches("[data-drop-zone]")) return e.target
    else if (e.target.closest("[data-drop-zone]")) return e.target.parentElement
  }
}
