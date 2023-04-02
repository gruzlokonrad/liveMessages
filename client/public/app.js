const loginForm = document.querySelector('#welcome-form');
const messagesSection = document.querySelector('#messages-section');
const messagesList = document.querySelector('#messages-list');
const addMessageForm = document.querySelector('#add-messages-form');
const userNameInput = document.querySelector('#username');
const messageContentInput = document.querySelector('#message-content');
const socket = io({
  autoConnect: false
});

let userName;

const login = (event) => {
  event.preventDefault();
  if (!userNameInput?.value) {
    alert('Fill in your name, please.')
  } else {
    userName = userNameInput.value
    socket.emit('logged', userName)
    loginForm.classList.remove('show')
    messagesSection.classList.add('show')
    socket.open()
  }
}

const sendMessage = (event) => {
  event.preventDefault()
  let messageContent = messageContentInput.value
  if (!messageContent.length) {
    alert('Your message is empty')
  } else {
    addMessage(userName, messageContent)
    socket.emit('message', { author: userName, content: messageContent })
    messageContentInput.value = ''
  }
}

const addMessage = (name, content) => {
  const author = name
  const message = document.createElement('li')
  message.classList.add('message')
  message.classList.add('message--received')

  if (author === 'Chat Bot') message.classList.add('message--bot')
  if (author === userName) message.classList.add('message--self')
  message.innerHTML = `
  <h3 class="message__author">${userName === author ? 'You' : author}</h3>
  <div class="message__content">
    ${content}
  </div>
  `
  messagesList.appendChild(message)
}

loginForm.addEventListener('submit', (event) => login(event))
addMessageForm.addEventListener('submit', (event) => sendMessage(event))
socket.on('message', ({ author, content }) => addMessage(author, content))
