// ARRAY QUE CONTIENE LOS PRODUCTOS  
const productos = [];

// ARRAY QUE CONTIENE LOS PEDIDOS  
let pedidoT = [];

// LLAMAR A BASE DE DATOS CON FETCH Y LUEGO TRAE DEL LOCAL STORAGE EL PEDIDO REALIZADO  
// POR EL USUARIO Y LO MUESTRA EN EL CARRITO
function llamarBD() {
    fetch("js/bd.json")
        // convertir json a objeto
        .then((res) => res.json())
        .then((data) =>  {
            // meter los objetos del json dentro del array "productos"
            data.forEach((producto) => productos.push(producto)); 
            // establecer el lenght del array "pedidoT"
            pedidoT = Array(productos.length - 1) 
        })
        .then(() => recuperarCarr())
}
window.addEventListener('load', llamarBD)

// VARIABLES PARA MODIFICAR LO QUE MUESTRA EL CARRITO
const carrito = document.getElementById("carrito");
const lineaTotal = document.getElementById("totalCarr");
let verCarrito = `<p class="vacio titulos">Su carrito está vacío</p>`;
let total = 0;
let carritoVacio = () => {carrito.innerHTML = verCarrito}

// RECUPERAR EL CARRITO CON LOCALSTORAGE 
function recuperarCarr() {
    let traerLS = JSON.parse(localStorage.getItem("pedidos"));

    console.log(traerLS)
    
    if (traerLS){
        pedidoT = traerLS;
        verCarrito = " ";

        productos.forEach((prop)=> { 
            if (pedidoT[prop.id] > 0) {
                verCarrito += 
                document.getElementById("carrito").innerHTML = 
                `<div class="detalle">
                <p class="col-8 cantidad">${pedidoT[prop.id]} ${prop.tipo} de ${prop.sab}</p>
                <p class="col-3 precio">$ ${pedidoT[prop.id] *prop.precio}</p>
                </div>`;

                total += ((pedidoT[prop.id]) * (prop.precio));

                carrito.innerHTML = verCarrito;
                document.getElementById("totalCarr").innerHTML = 
                `<div class="detalle">
                <p class="col-8 cantidad">TOTAL</p>
                <p class="col-4 precio">$ ${total}</p>
                </div>`
            
            }
        })
    }
    else {carritoVacio()}
}

// PARA LIMPIAR EL CARRITO
function limpiar() { 
    localStorage.clear();
    verCarrito = `<p class="vacio titulos">Su carrito está vacío</p>`;
    carrito.innerHTML = verCarrito;
    lineaTotal.innerHTML = " ";
    toasti('Limpiaste tu carrito.');
}
document.getElementById("limpCarr").addEventListener("click", limpiar);

// ESTA FUNCION GENERICA SIRVE PARA MOSTRAR Y ESCONDER LOS MEDIOS DE PAGO, Y A SU VEZ 
// PARA MOSTRAR Y ESCONDER LOS DATOS DE CADA MEDIO DE PAGO 
function pagar(idBoton, idResp) {
    //  oculta el contenido de cada botón de pago y le saca el borde
    let ocultarAnterior = () => {
        $('.contenido').hide();
        $('.btn').css({'border' : ' 0'});
    };
    //  muestra el contenido del botón clickeado y le pone borde
    let mostrar = () => {
        if (verCarrito != `<p class="vacio titulos">Su carrito está vacío</p>`) {
            $(idResp).toggle(); 
            $(idBoton).css({'border' : '3px solid black'})
        }
        else {toasti('Tu carrito está vacío.\nAgregá algún producto.')}
    };
    //  función que fusiona las dos funciones anteriores para ejecutarlas correctamente
    let fusion = () => {ocultarAnterior(); mostrar()}
    $(idBoton).on('click', fusion);
}
    //  funcion pagar() aplicada a cada uno de los botones
$(document).ready(pagar('#btnPago', '#mediosPago'));
$(document).ready(pagar('#btnTra', '#datosTra'));
$(document).ready(pagar('#btnDeb', '#datosDeb')); 
$(document).ready(pagar('#btnCre', '#datosCre'));

// ESTA FUNCIÓN ES LA QUE FINALIZA EL PROCESO DE PAGO CON EL BOTÓN "LISTO!" 
function limpiarLS() { 
    localStorage.clear();
    verCarrito = `<p class="vacio titulos">Su carrito está vacío</p>`;
    carrito.innerHTML = verCarrito;
    lineaTotal.innerHTML = " ";
}
function listoT() {
    $('#mediosPago').toggle();
    $('#datos').toggle();
    limpiarLS();
    toastiFinal('Finalizaste tu compra!\nPodés pasar a buscar tu pedido por San Martín 1234.\nMuchas gracias!')
}
$('.listoT').click(listoT);

// TOASTIFY
function toasti(mensaje) {
    Toastify({
        text: mensaje,
        duration: 3000,
        gravity: 'bottom',
        position: 'right',
        style: {background: '#EE9CCA', color: 'black', border: '2px solid black'}
    }).showToast();
}

function toastiFinal(mensaje) {
    Toastify({
        text: mensaje,
        gravity: 'bottom',
        position: 'right',
        duration: 60000,
        stopOnFocus: true,
        style: {background: '#EE9CCA', color: 'black', border: '2px solid black'}
    }).showToast();
}
