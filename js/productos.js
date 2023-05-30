// ARRAY QUE CONTIENE LOS PRODUCTOS  
const productos = [];

// ARRAY QUE CONTIENE LOS PEDIDOS  
let pedidoT = [];

// LLAMAR A BASE DE DATOS CON FETCH
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
        .then(() => imprimirVariedades())
}
window.addEventListener('load', llamarBD)

// PARA INSERTAR LAS VARIEDADES DE PRODUCTOS EN SUS CORRESPONDIENTES SECCIONES
const seccEmp = document.getElementById("seccEmp");
const seccBud = document.getElementById("seccBud");
let variedadE = " ";
let variedadB = " ";

function imprimirVariedades() {
    productos.forEach((prop) => {
        if (prop.tipo == "empanadas") {
            variedadE +=
            document.getElementById("seccEmp").innerHTML= 
            `<div class="variedades">
                <label class="col-8" for="${prop.sab}">${prop.sab}   ($${prop.precio})</label>
                <input class="col-4" id="${prop.id}" name="${prop.sab}" type="number" value="0"> 
            </div>`
        }
        else {
            variedadB +=
            document.getElementById("seccBud").innerHTML= 
            `<div class="variedades">
                <label class="col-8" for="${prop.sab}">${prop.sab}   ($${prop.precio})</label>
                <input class="col-4" id="${prop.id}" name="${prop.sab}" type="number" value="0"> 
            </div>`
        
        }    
    })

    seccBud.innerHTML = variedadB;
    seccEmp.innerHTML = variedadE;
}

// FUNCION PARA METER LOS PEDIDOS DE LOS USUARIOS EN EL ARRAY "pedidoT" Y QUE SE 
// ALMACENEN EN EL LOCAL STORAGE PARA LUEGO MOSTRARLOS EN LA PAGINA "CARRITO"
function addCarrito() {
    total = 0;
    for (let i = 0; i < productos.length; i++) {
        let pedido = document.getElementById(i).value;
        pedidoT[i] = [pedido]
    } 

    // acumular el array de pedidos en el localstorage  
    pedidoTJSON = JSON.stringify(pedidoT);
    localStorage.setItem("pedidos", pedidoTJSON);
    toasti('Añadiste productos a tu carrito.');
}
document.getElementById("btnCarr").addEventListener("click", addCarrito);


// TOASTIFY
function toasti(mensaje) {
    Toastify({
        text: mensaje,
        duration: 3000,
        gravity: 'bottom',
        position: 'right',
        style: {background: "#EE9CCA", color: "black", border: '2px solid black'}
    }).showToast();
}





// // PARA PAGAR LO QUE HAY EN EL CARRITO
// function pagar() {
//     if (pedidoT.reduce((a,b)=>{a+b},0) == 0) {
//         alert("Su carrito está vacío")
//     }
//     else {
//         limpiar();
//         localStorage.setItem("valor compra", total);
//         window.location.href = "pagar.html";
//     }
// }
// document.getElementById("btnPago").addEventListener("click", pagar);


