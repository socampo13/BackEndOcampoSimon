const socket = io();

const hbsTemplate = Handlebars.compile(`
<div class="container">
  {{#if products}}
    <h1>Productos:</h1>
    <table class="table table-danger">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Timestamp</th>
          <th scope="col">Nombre</th>
          <th scope="col">Descripcion</th>
          <th scope="col">Codigo</th>
          <th scope="col">Precio</th>
          <th scope="col">Stock</th>
          <th scope="col">Foto Url</th>
        </tr>
      </thead>
      <tbody>
        {{#each products}}
          <tr>
            <th scope="row">{{this.id}}</th>
            <td>{{this.templateDate}}</td>
            <td>{{this.title}}</td>
            <td>{{this.description}}</td>
            <td>{{this.code}}</td>
            <td>{{this.price}}</td>
            <td>{{this.stock}}</td>
            <td><img src="{{this.thumbnail}}" width=50px height=50px alt="img"></td>
          </tr>
        {{/each}}
      </tbody>
    </table>
    {{else}}
        <h2 class="text-center mt-4">No hay productos</h2>
    {{/if}}
</div>`);

socket.on("loadProduct", (products) => {
    console.log(products);
    const html = hbsTemplate({products: products});
    document.getElementById("table-template").innerHTML = html;
});

socket.on("messages", (data) => {
    document.getElementById("messages").innerHTML = data.map((entry) => 
    `<div>
        <strong class="author">${entry.author}</strong>
        <span class="date-chat">${entry.date}</span>
        <em class="author-text">${entry.text}</em>
    </div>`
    )
    .join(" ");
    clearInputs();
});

function clearInputs(){
    document.getElementById("text").value = "";
}

function addMessage(){
    const date = new Date();

    const dateTemplate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} `;

    const message = {
        author: document.getElementById("username").value,
        date: `[${dateTemplate}] : `,
        text: document.getElementById("text").value,
    };

    socket.emit("new-message", message);
    return false;
}
