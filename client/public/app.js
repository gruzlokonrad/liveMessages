const loginForm = document.querySelector('#welcome-form');
const messagesSection = document.querySelector('#messages-section');
const messagesList = document.querySelector('#messages-list');
const addMessageForm = document.querySelector('#add-messages-form');
const userNameInput = document.querySelector('#username');
const messageContentInput = document.querySelector('#message-content');

let userName;

const login = (event) => {
  event.preventDefault();
  if (!userNameInput?.value) {
    alert('Fill in your name, please.')
  } else {
    userName = userNameInput.value
    loginForm.classList.remove('show')
    messagesSection.classList.add('show')
  }
}

const sendMessage = (event) => {
  const addMessage = (name, content) => {
    const author = name
    const message = document.createElement('li')
    message.classList.add('message')
    message.classList.add('message--received')

    if (author === userName) message.classList.add('message--self')
    message.innerHTML = `
    <h3 class="message__author">${userName === author ? 'You' : author}</h3>
    <div class="message__content">
      ${content}
    </div>
    `
    messagesList.appendChild(message)
  }

  event.preventDefault()
  if (!messageContentInput?.value) {
    alert('Your message is empty')
  } else {
    addMessage(userName, messageContentInput.value)
    messageContentInput.value = ''
  }
}

loginForm.addEventListener('submit', (event) => login(event))
addMessageForm.addEventListener('submit', (event) => sendMessage(event))