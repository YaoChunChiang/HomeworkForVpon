let express = require('express');
let app = express();
let server = app.listen('3000');

app.use(express.static('public'));

let socket = require('socket.io');
let io = socket(server);
io.on('connection', newConnection)

function newConnection(socket){
    // console.log('new Connection');
    console.log('new connection ',socket.id);
    socket.on('clicking', getMsg);
}
function getMsg(data){
    // socket.broadcast.emit('broadcast', 'hello friends!');
    
    console.log(data);
}
console.log('Running');