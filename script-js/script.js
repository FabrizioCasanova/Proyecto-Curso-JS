"use strict"

// Funcion para optimizar el pintado de Dom en 3 divs distintos //
function cardsDom(divHtml, product) {
  const div = document.getElementById(divHtml)
  div.innerHTML += `
  <div class="card" id= "${product.id}" style="width: 18rem;">
    <img src= ${product.imagen} class="card-img-top" alt="...">
    <div class="card-body">
      <p class="card-text">Nombre: ${product.nombre} </p>
      <p class="card-text">Talle: ${product.talle} </p>
      <p class="card-text">Stock: ${product.stock} </p>
      <p class="card-text">Precio: $${product.precio} </p>
      <button class="btn btn-dark" type="submit">Comprar Producto</button>
    </div>
  </div>
  `
}

const numCarrito = document.getElementById('cantidadCarrito')
const productosHtml = document.getElementById("productosHtml")
const productosHtml2 = document.getElementById("productosHtml2")
const productosHtml3 = document.getElementById("productosHtml3")
const pintarCarrito = document.getElementById("pintarCarrito")

// Consulto mi LocalStorage o creo un array vacio dependiendo de si existe o no //

let storageCarrito = JSON.parse(localStorage.getItem('carrito')) ?? []

function aplicarNumeroCarrito(cantidad) {
  numCarrito.innerHTML = `
  <span class= "badge bg-primary rounded-pill"> ${cantidad} </span>
  `
}

// Pintada de Dom para mi carrito al actualizarse la pagina //

let contador = 0

let arrayCarritoStorage

if (localStorage.getItem('carrito')) {

  arrayCarritoStorage = JSON.parse(localStorage.getItem('carrito'))

  arrayCarritoStorage.forEach((compra) => {
    contador += compra.cantidad
  })

  aplicarNumeroCarrito(contador)

  arrayCarritoStorage.forEach((compra) => {

    pintarCarrito.innerHTML +=
      `
    <table class="table table-dark table-striped">
  <thead>
    <tr>
      <th scope="col">Nombre</th>
      <th scope="col">Talle</th>
      <th scope="col">Cantidad</th>
      <th scope="col">Precio</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">${compra.nombre}</th>
      <td>${compra.talle}</td>
      <td>${compra.cantidad}</td>
      <td>$${compra.precio}</td>
    </tr>
  </tbody>
</table>
    `
  })
}

let ultimasComprasStorage = []

// Fetch que llama a mi array de objetos guardados en mi JSON //

fetch('./json/productos.json')
  .then(response => response.json())
  .then(productosArray => {

    productosArray.forEach((producto, indice) => {

      if (indice == 0 || indice == 1) {
        cardsDom("productosHtml", producto)

      } else if (indice == 2 || indice == 3) {
        cardsDom("productosHtml2", producto)

      } else {
        cardsDom("productosHtml3", producto)
      }


    });

    productosArray.forEach((producto) => {

      const cardProd = document.getElementById(`${producto.id}`)
      cardProd.children[1].children[4].addEventListener('click', () => {

        // Pintada del Dom de mi carrito sin actualizar la pagina //

        if (ultimasComprasStorage.some(product => product.id == producto.id) == false) {
          pintarCarrito.innerHTML +=
            `
        <table id="id-producto-carrito-${producto.id}" class="table table-dark table-striped">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Talle</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Precio</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">${producto.nombre}</th>
            <td>${producto.talle}</td>
            <td> Cantidad: 1</td>
            <td>$${producto.precio}</td>
          </tr>
        </tbody>
      </table>
          `
        } else {
          const ProductoCarrito = document.getElementById(`id-producto-carrito-${producto.id}`)
          const parrafoProductoCarrito = ProductoCarrito.children[1].children[0].children[2]
          if (producto.cantidad == undefined) {
            producto.cantidad = 2
          } else {
            producto.cantidad++
          }
          parrafoProductoCarrito.innerHTML = `Cantidad: ${producto.cantidad}`
        }

        ultimasComprasStorage.push(producto)

        contador++
        aplicarNumeroCarrito(contador)

        if (storageCarrito.find(product => product.id == producto.id)) {
          let indiceCarrito = storageCarrito.findIndex((product => product.id == producto.id))
          if (storageCarrito[indiceCarrito].cantidad < producto.stock) {
            storageCarrito[indiceCarrito].cantidad++
            localStorage.setItem('carrito', JSON.stringify(storageCarrito))

            Toastify({
              text: "¡Listo! Tu producto fue agregado al carrito",
              duration: 3000,
              position: "center",
              style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
              },
            }).showToast();

          } else if ((storageCarrito[indiceCarrito].cantidad = producto.stock)) {
            Swal.fire(
              'Error!',
              '¡Ya no hay stock de este producto! ',
              'error',
            )
          }
        } else {
          const crearProducto = {
            id: producto.id,
            cantidad: 1,
            nombre: producto.nombre,
            talle: producto.talle,
            img: producto.imagen,
            precio: producto.precio,
            stock: producto.stock
          }

          storageCarrito.push(crearProducto)
          localStorage.setItem('carrito', JSON.stringify(storageCarrito))
          Toastify({
            text: "¡Listo! Tu producto fue agregado al carrito",
            duration: 3000,
            position: "center",
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
          }).showToast();
        }
      })
    })
  })

function limpiarHTML() {
  pintarCarrito.innerHTML = ''
  numCarrito.innerHTML = ''
}

const limpiarCarrito = document.getElementById('limpiarCarrito')

limpiarCarrito.addEventListener('click', () => {
  localStorage.clear()
  storageCarrito = []
  arrayCarritoStorage = []
  ultimasComprasStorage = []
  contador = 0
  limpiarHTML()

  Toastify({
    text: "Tu carrito de compras fue vaciado con exito ",
    duration: 3000,
    position: "center",
    style: {
      background: "linear-gradient(to top, #200122, #6f0000)",
    },
  }).showToast();
})

let contadorPrecio = 0

const finalizarCompra = document.getElementById('finalizarCompra')

finalizarCompra.addEventListener('click', () => {
  let arrayCarritoStorage = JSON.parse(localStorage.getItem('carrito'))
  arrayCarritoStorage.forEach((compra) => {
    contadorPrecio += compra.precio * compra.cantidad
  })

  localStorage.clear()
  storageCarrito = []
  arrayCarritoStorage = []
  ultimasComprasStorage = []
  contador = 0
  limpiarHTML()

  Swal.fire(
    '¡Compra realizada!',
    `Tu total a pagar: $${contadorPrecio}`,
    'success',
  )
})