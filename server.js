const express = require('express');
const socketIO = require('socket.io');

const PORT = process.env.PORT || 5200;
const INDEX = '/index.html';

const server = express()
  .use(express.static('public'))
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = socketIO(server);

const users = {};



io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('send-chat-msg', message => {
      socket.broadcast.emit('chat-message', {message, name: users[socket.id]});
  })

  socket.on('new-user', name => {
      users[socket.id] = name;
      socket.broadcast.emit('user-connected', name);
  })

  socket.on('disconnect' , () => {
      socket.broadcast.emit('user-disconnected', users[socket.id]);
      delete users[socket.id]
  })
});