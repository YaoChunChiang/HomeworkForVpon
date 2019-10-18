let socket;

function updating(data){
    console.log(data)
}
(function(){
    socket = io.connect('http://localhost:3000');
    socket.on('update', updating)
})()




function init(){
    document.getElementById('btn').onclick = changeTitle;

    function changeTitle(){
        document.getElementById('title').innerHTML = 'You clicked';
        let data = {ccc: 'ccc'};
        socket.emit('clicking', data); 
    }
}

window.addEventListener('load', init)