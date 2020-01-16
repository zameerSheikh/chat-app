let socket = io();
let el;

const messageForm = document.getElementById('send-container');
const messageContainer = document.getElementById('message-container');
const messageInput = document.getElementById('message-input');


const name = prompt('what is your name?');
appendMsg('You joined');
socket.emit('new-user', name);
socket.on('chat-message', data => {
    appendMsg(`${data.name}: ${data.message}`)
})

socket.on('user-connected', name => {
    appendMsg(`${name} joined`);
})

socket.on('user-disconnected', name => {
    appendMsg(`${name} left`);
})

messageForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = messageInput.value;
    appendMsg(`You: ${message}`)
    socket.emit('send-chat-msg', message);
    messageInput.value = '';
})

function appendMsg(message){
    msgElement = document.createElement('div');
    msgElement.innerText = message;
    messageContainer.append(msgElement);
}