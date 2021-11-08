import socketIo from 'socket.io';
import Handlebars from 'handlebars';

const hbsTemplate = Handlebars.compile(`
<div class="container-table">
  {{#if productos}}
    <h2 class="table-title">Productos en base de datos:</h2>
    <input class="mt-1 mb-4" type="text" id="filterName" onkeyup="filterName()" placeholder="Filtrar por nombre.." title="">
    <input class="mt-1 mb-4" type="text" id="filterCode" onkeyup="filterCode()" placeholder="Filtrar por codigo.." title="">
    <table class="table table-light" id="myTable">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Descripcion</th>
          <th scope="col">Codigo</th>
          <th scope="col">Precio</th>
          <th scope="col">Stock</th>
          <th scope="col">Foto Url</th>
          <th scope="col">Timestamp</th>
        </tr>
      </thead>
      <tbody>
        {{#each productos}}
          <tr>
            <th scope="row">{{this.id}}</th>
            <td>{{this.title}}</td>
            <td>{{this.description}}</td>
            <td>{{this.code}}</td>
            <td>{{this.price}}</td>
            <td>{{this.stock}}</td>
            <td><img src="{{this.thumbnail}}" width=50px height=50px alt="imagen"></td>
            <td>{{this.templateDate}}</td>
          </tr>
        {{/each}}
      </tbody>
    </table>
    {{else}}
        <h2 class="no-productos text-center mt-4">Ups! No hay productos <i class="far fa-thumbs-down"></i></h2>
    {{/if}}
</div>`);

function filterName() {
  let input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("filterName");
  filter = input.value.toLowerCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toLowerCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

function filterCode() {
  let input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("filterCode");
  filter = input.value.toLowerCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[2];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toLowerCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

function filterCode() {
  let input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("filterCode");
  filter = input.value.toLowerCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[3];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toLowerCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

socket.on("cargarProducto", (productos) => {
  console.log(productos);
  const html = hbsTemplate({ productos: productos });
  document.getElementById("table-template").innerHTML = html;
});

socket.on("messages", (data) => {
  document.getElementById("messages").innerHTML = data
    .map(
      (entry) => `<div>
                      <strong class="author">${entry.author}</strong>
                      <span class="date-chat">${entry.date}</span>
                      <em class="author-text">${entry.text}</em>
                    </div>`
    )
    .join(" ");
  clearInputs();
});

function clearInputs() {
  document.getElementById("texto").value = "";
}

function addMessage() {
  const date = new Date();

  const templateDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} `;

  const message = {
    author: document.getElementById("username").value,
    date: `[${templateDate}] : `,
    text: document.getElementById("texto").value,
  };

  socket.emit("new-message", message);

  return false;
}