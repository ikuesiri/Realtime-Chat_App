
const socket = io.connect('http://localhost:8000');

//querying the DOM
const display = document.querySelector('#output');
const username = document.querySelector('#username');
const text = document.querySelector('#message');
const btn = document.querySelector('#send');
const initializing = document.querySelector('#initializing')



btn.addEventListener('click', () =>{
    socket.emit('chat', {
        username : username.value,
        text : text.value
    })
})

text.addEventListener('keypress', ()=>{
    socket.emit('typing', username.value)
})

//listening for events
socket.on('chat', (data) => {
        initializing.innerHTML = " "
        display.innerHTML += `<p><strong>${data.username}</strong>: ${data.text}</p>`
})


socket.on('typing', (data) =>{
    initializing.innerHTML = `<p><em>${data} is typing...</em></p>`
} )