let socket = io();
let el;

const messageForm = document.querySelector('.msgForm');
const messageContainer = document.querySelector('.message-container');
const messageInput = document.querySelector('.message-input');


const name = prompt('what is your name?');
appendMsg('You joined', true);
socket.emit('new-user', name);
socket.on('chat-message', data => {
    appendMsg(`${data.name}: ${data.message}`, false)
})

socket.on('user-connected', name => {
    appendMsg(`${name} joined`, false);
})

socket.on('user-disconnected', name => {
    appendMsg(`${name} left`, false);
})

messageForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = messageInput.value;
    appendMsg(`You: ${message}`, true)
    socket.emit('send-chat-msg', message);
    messageInput.value = '';
})

function appendMsg(message, isoutgoing){
    msgElement = document.createElement('div');
    isoutgoing && msgElement.classList.add('outgoing');
    msgElement.innerText = message;
    messageContainer.append(msgElement);
}