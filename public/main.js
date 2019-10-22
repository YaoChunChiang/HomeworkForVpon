let socket;

const domainName = window.location.hostname;
(function(){
    socket = io.connect(`http://${domainName}:3000`);
    socket.on('update', function(data){
        console.log(data)
    }) 
    socket.on('changeDirection', function(direction){
        let pic = document.getElementById('pic');

        if(direction === 'landscape'){
            console.log('landscape')
            pic.style.transform = 'rotate(90deg)'
        }else if(direction === 'portrait'){
            console.log('portrait')
            pic.style.transform = 'rotate(0deg)'

        }
    }) 
})()




function init(){
    // function changeTitle(){
    //     document.getElementById('title').innerHTML = 'You clicked';
    //     let data = {ccc: 'ccc'};
    //     socket.emit('clicking', data); 
    // }
    // document.getElementById('btn').onclick = changeTitle;
}
window.addEventListener('load', init);


function rotate(){
    let orientation = window.innerWidth > window.innerHeight ? "landscape" : "portrait";
    if(orientation === 'landscape'){
        socket.emit('rotate', orientation)
    }else if(orientation === 'portrait'){
        socket.emit('rotate', orientation)
    }
}
window.addEventListener('resize', rotate);