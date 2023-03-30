const loginForm = document.querySelector('.welcome-form');
const messagesSection = document.querySelector('#messages-section');
const messagesList = document.querySelector('#messages-list');
const addMessageForm = document.querySelector('#add-messages-form');
const userNameInput = document.querySelector('#username');
const messageContentInput = document.querySelector('#message-content');

var userName;

const login = (event) => {
  event.preventDefault();
  console.log('stoped')
}

loginForm.addEventListener('submit', (event) => login(event))