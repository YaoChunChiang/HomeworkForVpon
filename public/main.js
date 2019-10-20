let socket;


(function(){
    socket = io.connect('http://localhost:3000');
    socket.on('update', function(data){
        console.log(data)
    }) 
})()




function init(){
    function changeTitle(){
        document.getElementById('title').innerHTML = 'You clicked';
        let data = {ccc: 'ccc'};
        socket.emit('clicking', data); 
    }
    document.getElementById('btn').onclick = changeTitle;
}
window.addEventListener('load', init)