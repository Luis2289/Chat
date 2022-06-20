const path = require('path');
const express = require('express');
const app = express();

//Port Config Init
app.set('port', process.env.PORT || 3000);
//Port Config End

//Static Files Init
app.use(express.static(path.join(__dirname, 'public')));
//Static Files End

//server start Init
const server = app.listen(app.get('port'), () => {
  console.log('server on port', app.get('port'));
});
//server start End

const SocketIO = require('socket.io');
const io = SocketIO(server);

//Websockets
io.on('connection', (socket)=>{
console.log('new Connection', socket.id);

socket.on('chat:message', (data) =>{
console.log(data);
io.sockets.emit('chat:message', data);
});

socket.on('chat:typing', (data) =>{
  socket.broadcast.emit('chat:typing', data);
})
});





