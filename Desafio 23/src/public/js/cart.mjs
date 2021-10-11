import socket from 'socket.io';
import Handlebars from 'handlebars';

const hbsTemplate = Handlebars.compile(`
<div class="container">
  {{#if productos}}
    <h1>Productos en carrito:</h1>
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
        {{#each productos}}
        <tr>
        <th scope="row">{{this.id}}</th>
        <td>{{this.templateDate}}</td>
        <td>{{this.title}}</td>
        <td>{{this.descripcion}}</td>
        <td>{{this.codigo}}</td>
        <td>{{this.price}}</td>
        <td>{{this.stock}}</td>
        <td><img src="{{this.thumbnail}}" width=50px height=50px alt="producto"></td>
      </tr>
        {{/each}}
      </tbody>
    </table>
    {{else}}
        <h2 class="text-center mt-4">No hay productos</h2>
    {{/if}}
</div>`);

socket.on("agregarCarrito", (cart) => {
  console.log(cart);
  const html = hbsTemplate({ productos: cart });
  document.getElementById("container-carrito").innerHTML = html;
});

function backHome() {
  const btn = getElementById("btn-back").addEventListener(
    "click",
    history.go(-1)
  );
}