class Formulario {
    constructor(nombre,apellido,direccion,ciudad,provincia,codigoPostal){
        this.nombre = nombre
        this.apellido = apellido
        this.direccion = direccion
        this.ciudad = ciudad
        this.provincia = provincia
        this.codigoPostal = codigoPostal
    }
}

let formulario = []

if (localStorage.getItem("datosForm")) {
    formulario = JSON.parse( localStorage.getItem("datosForm"))
} else {
    localStorage.setItem("datosForm", JSON.stringify(formulario))
}

const form = document.getElementById("form")

form.addEventListener('submit', (e) =>{
    e.preventDefault()

    const datosFormulario = new FormData(e.target)
   
    const objetoFormulario = new Formulario(datosFormulario.get("nombre"), datosFormulario.get("apellido"), datosFormulario.get("direccion"), datosFormulario.get("ciudad"),datosFormulario.get("provincia"), datosFormulario.get("codigoPostal"))

    formulario.push(objetoFormulario)
    localStorage.setItem("datosForm", JSON.stringify(formulario))
    form.reset()
})