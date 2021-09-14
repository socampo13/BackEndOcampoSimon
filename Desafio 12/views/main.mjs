const socket = io.connect();
const date = () => {
    const dt = newDate();
    const date = `${(dt.getMonth() + 1).toString().padStart(2, '0')}/${dt
    .getDate()
    .toString()
    .padStart(2, '0')}/${dt.getFullYear().toString().padStart(4, '0')} ${dt
    .getHours()
    .toString()
    .padStart(2, '0')}:${dt.getMinutes().toString().padStart(2, '0')}:${dt
    .getSeconds()
    .toString()
    .padStart(2, '0')}`;

    return date;
};

socket.on("messages", (data) => {
    document.getElementById("messages").innerHTML = data
    .map(
        (entry) => `<div>
                        <strong>${entry.author}</strong>
                        <em>${entry.text}</em>
                        </div>`
    )
    .join(" ");
    clearInputs();
});

function clearInputs() {
    document.getElementById("username").value = "";
    document.getElementById("texto").value = "";
};

function addMessage() {
    const message = {
        author: document.getElementById("username").value,
        text: document.getElementById("texto").value,
    };

    socket.emit("new-message", message);

    return false;
};

const message = {
    author: `${inputEmail.value} <span style="color: brown">[${date()}]:</span>`,
    text: inputTexto.value,
};
inputEmail.value = '';
inputTexto.value = '';
socket.emit('new-message', message);
return false;