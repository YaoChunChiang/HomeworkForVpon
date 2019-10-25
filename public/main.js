let socket;

const domainName = window.location.hostname;
console.log(domainName)
let idCode = '';

(function(){
    socket = io.connect(`http://${domainName}:3000`);
    socket.on('id', function(id){
        console.log(id.id);
        idCode = id.id;
        // location.replace(`localhost:3000?id=${id.id}`);
    })
    
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
    // $.getJSON('http://www.geoplugin.net/json.gp?jsoncallback=?', function(data) {
    //     console.log(data);
    //     new QRCode(document.getElementById("qrcode"), `http://${data.ip}:3000`);
    // });


    const findLocalIp = (logInfo = true) => new Promise( (resolve, reject) => {
        window.RTCPeerConnection = window.RTCPeerConnection 
                                || window.mozRTCPeerConnection 
                                || window.webkitRTCPeerConnection;
    
        if ( typeof window.RTCPeerConnection == 'undefined' )
            return reject('WebRTC not supported by browser');
    
        let pc = new RTCPeerConnection();
        let ips = [];
    
        pc.createDataChannel("");
        pc.createOffer()
         .then(offer => pc.setLocalDescription(offer))
         .catch(err => reject(err));
        pc.onicecandidate = event => {
            if ( !event || !event.candidate ) {
                // All ICE candidates have been sent.
                if ( ips.length == 0 )
                    return reject('WebRTC disabled or restricted by browser');
    
                return resolve(ips);
            }
    
            let parts = event.candidate.candidate.split(' ');
            let [base,componentId,protocol,priority,ip,port,,type,...attr] = parts;
            let component = ['rtp', 'rtpc'];
    
            if ( ! ips.some(e => e == ip) )
                ips.push(ip);
    
            // if ( ! logInfo )
            if(ip.length < 15){
                console.log(ip)
                new QRCode(document.getElementById("qrcode"), `http://${ip}:3000/?id=${idCode}`);
            }
            // console.log("        ip: " + ip);
            //     return;
    
            // console.log(" candidate: " + base.split(':')[1]);
            // console.log(" component: " + component[componentId - 1]);
            // console.log("  protocol: " + protocol);
            // console.log("  priority: " + priority);
            // console.log("      port: " + port);
            // console.log("      type: " + type);
    
            // if ( attr.length ) {
            //     console.log("attributes: ");
            //     for(let i = 0; i < attr.length; i += 2)
            //         console.log("> " + attr[i] + ": " + attr[i+1]);
            // }
    
            // console.log();

        };
    } );
    findLocalIp()



}//init
window.addEventListener('load', init);


function rotate(){
    let windowUrl = new URL(window.location.href);
    let id = windowUrl.searchParams.get('id') || 'noID';
    // if(id != 'noID'){
    //     alert(id)
    //     socket.emit('phoneConnection', id)
    // }



    let orientation = window.innerWidth > window.innerHeight ? "landscape" : "portrait";
    let rotateData = {orientation, id};
    if(orientation === 'landscape'){
        socket.emit('rotate', rotateData)
    }else if(orientation === 'portrait'){
        socket.emit('rotate', rotateData)
    }
}
window.addEventListener('resize', rotate);