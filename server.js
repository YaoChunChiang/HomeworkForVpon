let express = require('express');
let app = express();
const PORT = '3000';
let server = app.listen(PORT);

app.use(express.static('public'));

let socket = require('socket.io');
let io = socket(server);
io.sockets.on('connection', newConnection)

function newConnection(socket){
    console.log('new connection ', socket.id);
    socket.on('clicking', data => {
        console.log(data);
        socket.broadcast.emit('update', data);
    });

    socket.on('rotate', data => {
        console.log(data);
        socket.broadcast.emit('update', data);
    });
}