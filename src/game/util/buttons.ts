export const createButtons = (
  onClick: (this: GlobalEventHandlers, ev: MouseEvent) => any,
) => {
  document.body.style.display = 'flex'

  const playBtn = document.createElement('button')

  playBtn.innerHTML = 'Start'
  playBtn.onclick = onClick
  addStyle(playBtn)

  const containerDiv = document.createElement('div')

  containerDiv.style.position = 'absolute'
  containerDiv.style.top = '0px'
  containerDiv.style.height = '100%'
  containerDiv.style.width = '200px'

  containerDiv.appendChild(playBtn)

  document.body.appendChild(containerDiv)

  return playBtn
}

const addStyle = (btn: HTMLButtonElement) => {
  btn.style.width = '100%'
  btn.style.padding = '2rem'
  btn.style.fontSize = '1rem'
  btn.style.fontWeight = 'bold'
  btn.style.color = '#9B2226'
  btn.style.backgroundColor = '#EE9B00'
  btn.style.border = '2px solid #9B2226'
}
