/*class Producto {
  constructor(nombre, talle, stock, precio, imagen) {
    this.nombre = nombre
    this.talle = talle
    this.stock = stock
    this.precio = precio
    this.imagen = imagen
  }
}

const producto1 = new Producto("Conjunto Sexy Lali", 90, "Quedan 30", 2100, "./img/sexyLali.webp")
const producto2 = new Producto("Conjunto Xy ART.1303", "M", "Quedan 24", 1050, "./img/xy-1303.webp")
const producto3 = new Producto("Pack de bombacha ART.30211", 95, "Quedan 20", 890, "./img/packBombacha1.webp")
const producto4 = new Producto("Pack de bombacha ART.30213", 85, "Quedan 26", 800, "./img/packBombacha2.webp")
const producto5 = new Producto("Conjunto de Andressa ART.922", 80, "Quedan 15", 1450, "./img/conjuntoAndressa-922.webp")
const producto6 = new Producto("Boxer Dufour ART.11812", "L", "Quedan 12", 850, "./img/conjuntoAndressa-11812.webp")
const producto7 = new Producto("Conjunto de Andressa ART.669", 100, "Quedan 10", 1150, "./img/conjuntoAndressa-669.webp")
const producto8 = new Producto("Conjunto de Andressa ART.1080", 105, "Quedan 22", 1400, "./img/conjuntoAndressa-1080.webp")

const productosArray = [producto1, producto2, producto3, producto4, producto5, producto6, producto7, producto8]
*/


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

const productosHtml = document.getElementById("productosHtml")
const productosHtml2 = document.getElementById("productosHtml2")
const productosHtml3 = document.getElementById("productosHtml3")
const carritoProductos = JSON.parse(localStorage.getItem('carrito')) ?? []

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
        
        Swal.fire(
          '¡Listo!',
          '¡Tu producto fue agregado al carrtio con exito! ',
          'success',
        )

        if(carritoProductos.find(product => product.id == producto.id)) {
          let indiceCarrito = carritoProductos.findIndex((product => product.id == producto.id))
          if(carritoProductos[indiceCarrito].cantidad < producto.stock) {
            carritoProductos[indiceCarrito].cantidad++
          }
        } else{
          const crearProducto = {id: producto.id, cantidad: 1}
          carritoProductos.push(crearProducto) 
        }

        localStorage.setItem('carrito', JSON.stringify (carritoProductos))

      })
    })
  })

  let prueba = []
  let ultimasComprasStorage = []

  if(localStorage.getItem('carrito')) {
    ultimasComprasStorage = JSON.parse(localStorage.getItem('carrito'))
    ultimasComprasStorage.forEach((compra) =>{
      prueba.push(compra)
      console.log(`${prueba.nombre}`)
        
    })
  }