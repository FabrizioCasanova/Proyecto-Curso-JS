class Producto {
    constructor(nombre, talle, stock, precio) {
      this.nombre = nombre
      this.talle = talle
      this.stock = stock
      this.precio = precio
    }
  }
  
  const producto1 = new Producto("Conjunto Sexy Lali", 90, "Quedan 30", 2100)
  const producto2 = new Producto("Conjunto Xy ART.1303", "M", "Quedan 24", 1050)
  const producto3 = new Producto("Pack de bombacha ART.30211", 95, "Quedan 20", 890)
  const producto4 = new Producto("Pack de bombacha ART.30213", 85, "Quedan 26", 800)
  const producto5 = new Producto("Conjunto de Andressa ART.922", 80, "Quedan 15", 1450)
  const producto6 = new Producto("Boxer Dufour ART.11812", "L", "Quedan 12", 850)
  const producto7 = new Producto("Conjunto de Andressa ART.669", 100, "Quedan 10", 1150)
  const producto8 = new Producto("Conjunto de Andressa ART.1080", 105, "Quedan 22", 1400)
  
  const productosArray = [producto1, producto2, producto3, producto4, producto5, producto6, producto7, producto8]
  
  const productosHtml = document.getElementById("productosHtml")
  
  productosArray.forEach(producto => {
    productosHtml.innerHTML += `
  <div class="card" style="width: 18rem;">
    <img src="./img/sexyLali.webp" class="card-img-top" alt="...">
    <div class="card-body">
      <p class="card-text">Nombre: ${producto.nombre} </p>
      <p class="card-text">Talle: ${producto.talle} </p>
      <p class="card-text">Stock: ${producto.stock} </p>
      <p class="card-text">Precio: $${producto.precio} </p>
    </div>
  </div>
  `
  });