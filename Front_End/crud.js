const urlApi = "http://localhost:3300/api/users/";
const tblDatos = document.querySelector("#tblDatos");
const nombre = document.querySelector("#name");
const apellido = document.querySelector("#lastName");
const telefono = document.querySelector("#phone");
const formulario = document.querySelector("#frmNuevo");

const formularioActualizar = document.querySelector("#formularioActualizar");
const nombre2 = document.querySelector("#nombre2");
const apellido2 = document.querySelector("#apellido2");
const numero2 = document.querySelector("#numero2");

//listar

fetch(urlApi)
  .then((response) => {
    return response.json();
  })

  .then((data) => {
    console.log(data);
    for (let index = 0; index < data.length; index++) {
      let fila = `<tr> 
        <td> ${data[index].id}</td>
        <td> ${data[index].name} </td>
        <td> ${data[index].lastname} </td>
        <td> ${data[index].phone} </td>
<td><button type="button"class="btn btn-primary" id="btnEditar"data-bs-toggle="modal" data-bs-target="#exampleModal"> Edit</button></td>
<td><button type="button" class="btn btn-outline-danger" id="btnBorrar">Delete</button></td>

</tr>`;
      tblDatos.innerHTML += fila;
    }
  });

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(urlApi, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: nombre.value,
      lastName: apellido.value,
      phone: telefono.value,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then(() => {
      location.reload();
    });
});

//crear metodo ON para seleccionar por fila en la tabla usando el dom

//metodo on== necesario para seleccionar la fila

//Es ara manipular el document pues los botones borrar y editar son en tiempo real
const on = (Element, event, selector, handler) => {
  Element.addEventListener(event, (e) => {
    if (e.target.closest(selector)) {
      handler(e);
    }
  });
};

//borrar
on(document, "click", "#btnBorrar", (e) => {
  let fila = e.target.parentNode.parentNode;
  const id = fila.firstElementChild.innerHTML;
  console.log(id);
  if (confirm("Desea borrar")) {
    fetch(urlApi + id, {
      method: "delete",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {});
    location.reload();
  }
  console.log("borrar");
});

on(document, "click", "#btnEditar", (e) => {
  let fila = e.target.parentNode.parentNode;
  const id = fila.firstElementChild.innerHTML;
  console.log(id);

  formularioActualizar.addEventListener("submit", (e) => {
    e.preventDefault();
    fetch(urlApi + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nombre2.value,
        lastname: apellido2.value,
        phone: numero2.value,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then(() => {});
    location.reload();
  });
});
