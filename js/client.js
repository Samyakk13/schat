const socket =  io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageinput = document.getElementById('messageInp');
const messagecontainer = document.querySelector(".container");
var audio = new Audio('tone.mp3')
const append =(message, position) =>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messagecontainer.append(messageElement);
    if(position == 'left'){
        audio.play();

    }
}



const name = prompt("enter your name to join the chat");



socket.emit('new-user-joined', name);

socket.on('user-joined', name =>{
    append(`${name} joined the chat`, 'right');
})

form.addEventListener('submit', (e) =>{
    e.preventDefault();
    const message = messageinput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageinput.value = ''
})

socket.on('receive', data =>{
    append(`${data.name}: ${data.message}`, 'left');
})
socket.on('left', data =>{
    append(`${name} left the chat`, 'left');
})


