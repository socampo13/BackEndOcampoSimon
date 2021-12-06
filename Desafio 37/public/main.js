const chatMessages = document.querySelector('.chat-messages');

const socket = io.connect();

socket.emit('askData');

function renderMsg(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<div class="user-info">
    <p class="meta">${message.email}</p> <span class="time-right"> ${message.timestamp}</span>
    </div>
    <p class="text-msg"> ${message.msg} </p>`;

     chatMessages.appendChild(div);
}
  

socket.on('messages', function(data) { 
    console.log('RENDERIZANDO DATA');
    data.forEach((msg) => {
        renderMsg(msg); 
    })
});