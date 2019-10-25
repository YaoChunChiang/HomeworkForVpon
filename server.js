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
    socket.emit('id', { id: socket.id });

    // socket.on('phoneConnection', data => {
    //     console.log('here is the id: ' + data);
    //     // io.to(`${data}`).emit('hey', 'I just met you');
    // });

    socket.on('clicking', data => {
        console.log(data);
        socket.broadcast.emit('update', data);
    });

    socket.on('rotate', data => {
        console.log(data);
        io.to(`${data.id}`).emit('changeDirection', data.orientation);

        // socket.broadcast.emit('changeDirection', data);
    });
}