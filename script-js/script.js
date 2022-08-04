class Producto {
    constructor(nombre, talle, stock, precio,imagen) {
      this.nombre = nombre
      this.talle = talle
      this.stock = stock
      this.precio = precio
      this.imagen = imagen
    }
  }
  
  const producto1 = new Producto("Conjunto Sexy Lali", 90, "Quedan 30", 2100, "./img/sexyLali.webp" )
  const producto2 = new Producto("Conjunto Xy ART.1303", "M", "Quedan 24", 1050, "./img/xy-1303.webp")
  const producto3 = new Producto("Pack de bombacha ART.30211", 95, "Quedan 20", 890, "./img/packBombacha1.webp" )
  const producto4 = new Producto("Pack de bombacha ART.30213", 85, "Quedan 26", 800, "./img/packBombacha2.webp")
  const producto5 = new Producto("Conjunto de Andressa ART.922", 80, "Quedan 15", 1450, "./img/conjuntoAndressa-922.webp")
  const producto6 = new Producto("Boxer Dufour ART.11812", "L", "Quedan 12", 850, "./img/conjuntoAndressa-11812.webp")
  const producto7 = new Producto("Conjunto de Andressa ART.669", 100, "Quedan 10", 1150, "./img/conjuntoAndressa-669.webp")
  const producto8 = new Producto("Conjunto de Andressa ART.1080", 105, "Quedan 22", 1400, "./img/conjuntoAndressa-1080.webp")
  
  const productosArray = [producto1, producto2, producto3, producto4, producto5, producto6, producto7, producto8]
  
  let contador = 1

  const productosHtml = document.getElementById("productosHtml")
  const productosHtml2 = document.getElementById("productosHtml2")
  const productosHtml3 = document.getElementById("productosHtml3")
  
  productosArray.forEach(producto => {
    if(contador == 1 || contador == 2){
    productosHtml.innerHTML += `
  <div class="card" style="width: 18rem;">
    <img src= ${producto.imagen} class="card-img-top" alt="...">
    <div class="card-body">
      <p class="card-text">Nombre: ${producto.nombre} </p>
      <p class="card-text">Talle: ${producto.talle} </p>
      <p class="card-text">Stock: ${producto.stock} </p>
      <p class="card-text">Precio: $${producto.precio} </p>
    </div>
  </div>
  `} else if( contador == 3 || contador == 4  ){
    productosHtml2.innerHTML += `
  <div class="card" style="width: 18rem;">
    <img src= ${producto.imagen} class="card-img-top" alt="...">
    <div class="card-body">
      <p class="card-text">Nombre: ${producto.nombre} </p>
      <p class="card-text">Talle: ${producto.talle} </p>
      <p class="card-text">Stock: ${producto.stock} </p>
      <p class="card-text">Precio: $${producto.precio} </p>
    </div>
  </div>
  `} 

  else {
    productosHtml3.innerHTML += `
  <div class="card" style="width: 18rem;">
    <img src= ${producto.imagen} class="card-img-top" alt="...">
    <div class="card-body">
      <p class="card-text">Nombre: ${producto.nombre} </p>
      <p class="card-text">Talle: ${producto.talle} </p>
      <p class="card-text">Stock: ${producto.stock} </p>
      <p class="card-text">Precio: $${producto.precio} </p>
    </div>
  </div>
  `} contador = contador + 1
  });