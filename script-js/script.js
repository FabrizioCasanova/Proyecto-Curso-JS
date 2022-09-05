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

// Funcion asincronica

async function consultaAsync() {
  const datosFetch = await fetch('./json/productos.json')
  const productosJson = await datosFetch.json()
  return productosJson
}

function aplicarNumeroCarrito(cantidad) {
  const numCarrito = document.getElementById('cantidadCarrito')
  numCarrito.innerHTML = `
  <span class= "badge bg-primary rounded-pill"> ${cantidad} </span>
  `
}

const productosHtml = document.getElementById("productosHtml")
const productosHtml2 = document.getElementById("productosHtml2")
const productosHtml3 = document.getElementById("productosHtml3")
const storageCarrito = JSON.parse(localStorage.getItem('carrito')) ?? []

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

    class Producto {
      constructor(nombre, talle, stock, precio, imagen) {
        this.nombre = nombre
        this.talle = talle
        this.stock = stock
        this.precio = precio
        this.imagen = imagen
      }
    }

    let ultimasComprasStorage = []
    productosArray.forEach((producto) => {

      const cardProd = document.getElementById(`${producto.id}`)
      cardProd.children[1].children[4].addEventListener('click', () => {

        const pintarCarrito = document.getElementById("pintarCarrito")

        const product = new Producto(producto.nombre, producto.talle, producto.stock, producto.precio, producto.imagen)
        ultimasComprasStorage.push(product)
        aplicarNumeroCarrito(ultimasComprasStorage.length)
        
        // 1. Pintada del Dom de mi carrito sin actualizar la pagina
        pintarCarrito.innerHTML += ` 
          <div class="card border-primary mb-3" style="max-width: 20rem;">
          <div class="card-header"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">${product.nombre}</font></font></div>
          <div class="card-body">
            <p class="card-text"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;"> Cantidad: ${product.cant}</font></font></p>
            <p class="card-text"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;"> Talle: ${product.talle}</font></font></p>
            <p class="card-text"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;"> Stock: ${product.stock}</font></font></p>
            <p class="card-text"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;"> Precio: $${product.precio}</font></font></p>
          </div>
        </div>  
          `

        if (storageCarrito.find(product => product.id == producto.id)) {
          let indiceCarrito = storageCarrito.findIndex((product => product.id == producto.id))
          if (storageCarrito[indiceCarrito].cantidad < producto.stock) {
            storageCarrito[indiceCarrito].cantidad++ // 1. replicar esto en la pintada del Dom de mi carrito para declarar la cantidad
            localStorage.setItem('carrito', JSON.stringify(storageCarrito))

            Swal.fire(
              '¡Listo!',
              '¡Tu producto fue agregado al carrtio con exito! ',
              'success',
            )


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
          Swal.fire(
            '¡Listo!',
            '¡Tu producto fue agregado al carrtio con exito! ',
            'success',
          )
        }
      })
    })
  })

  // Pintada de Dom para para mi carrito al actualizarse la pagina

const pintarCarrito = document.getElementById("pintarCarrito")

if (localStorage.getItem('carrito')) { 

  ultimasComprasStorage = JSON.parse(localStorage.getItem('carrito'))

  aplicarNumeroCarrito(ultimasComprasStorage.length)

  ultimasComprasStorage.forEach((compra) => {

    pintarCarrito.innerHTML += `
        <div class="card border-primary mb-3" " style="max-width: 20rem;">
          <div class="card-header"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">${compra.nombre}</font></font></div>
          <div class="card-body">
            <p class="card-text"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;"> Cantidad: ${compra.cantidad}</font></font></p>
            <p class="card-text"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;"> Talle: ${compra.talle}</font></font></p>
            <p class="card-text"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;"> Stock: ${compra.stock}</font></font></p>
            <p class="card-text"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;"> Precio: $${compra.precio}</font></font></p>
          </div>
        </div>  
          `
  })
}

const numCarrito = document.getElementById('cantidadCarrito')

function limpiarHTML() {
  pintarCarrito.innerHTML = ''
  numCarrito.innerHTML = ''
}

const limpiarCarrito = document.getElementById('limpiarCarrito')

limpiarCarrito.addEventListener('click', () => {
  ultimasComprasStorage = [] 
  limpiarHTML()
})


// 1. Declarar en mi array de compras (no de mi localStorage) la variable cantidad 

// 2. Al borrar el contenido de mi carrito que se borre el LocalStorage

// 3. Que no se creen nuevas cards en el dom con mi array de compras (no de mi localStorage)

// 4. actualizar en mi array de compras (no de mi localStorage) el numerito que indica cuantos productos tengo en mi carrito