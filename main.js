//Variables
const carrito = document.getElementById("carrito")
const productos = document.getElementById("lista-productos")
const listaProductos = document.querySelector("#lista-carrito tbody")
const btnVaciarCarrito = document.getElementById("vaciar-carrito")


//listener

cargarEventlistener();

function cargarEventlistener() {
    productos.addEventListener("click", comprarProducto);
    carrito.addEventListener("click", eliminarProdcuto);
    btnVaciarCarrito.addEventListener("click",VaciarCarrito);
    document.addEventListener("DOMContentLoaded", cargarLocalStorage);
    // btnFinalizarCompra.addEventListener('click',finalizarCompra);
}

//Funciones

//Añade el producto al carrito
function comprarProducto(e) {
    e.preventDefault();
    if (e.target.classList.contains("agregar-carrito")) {
        const producto = e.target.parentElement.parentElement;
        datosProductos(producto);
    }
}

//Leer los datos del producto
function datosProductos(producto) {
    const infoProducto = {
        imagen: producto.querySelector("img").src,
        titulo: producto.querySelector("h3").textContent,
        precio: producto.querySelector("p").textContent,
        id: producto.querySelector("a").getAttribute("data-id")
    }
    insertarCarrito(infoProducto);
}

//Muestra el producto en el carrito
function insertarCarrito (producto) {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>
                <img src="${producto.imagen}" width="100">
            </td>
            <td>${producto.titulo}</td>
            <td>${producto.precio}</td>
            <td>
                <a href="#" class="borrar-producto" id="btn-eliminar" data-id="${producto.id}">X</a>
            </td>
    `;

    listaProductos.appendChild(row);
    guardarProductoLocalStorage(producto);
}

//Elimina un producto del carrito en el DOM
function eliminarProdcuto(e) {
    e.preventDefault();
    let producto;
    let productoID;

    if (e.target.classList.contains("borrar-producto")) {
        producto = e.target.parentElement.parentElement;
        e.target.parentElement.parentElement.remove();
        productoID = producto.querySelector("a").getAttribute("data-id")
    }
    eliminarProductoLocalStorage(productoID);

    // Sweet Alert
    $('#btn-eliminar').on('click', function () {
        Swal.fire({
            title:'Estas seguro que queres remover este producto?',
            text: 'Presione Si o No',
            showCancelBotton: true,
            confirmButtonColor: '#008f39',
            cancelButtonColor: '#d33',
            confirmButtonText:'Si',
            cancelButtonText: 'No',
            icon: 'Warning'
        });
    });
}

//Vacia el carrito
function VaciarCarrito(e) {
    e.preventDefault;

    while (listaProductos.firstChild) {
        listaProductos.removeChild(listaProductos.firstChild);
    }
    localStorage.removeItem("productos");
    return false;
}


//Guarda los productos del carrito en el LocalStorage
function guardarProductoLocalStorage(producto) {
    let productos = obtenerProductosLocalStorage();
    
    productos.push(producto);
    localStorage.setItem("productos", JSON.stringify(productos));
}

//Obtener los productos al LocalStorage
function obtenerProductosLocalStorage() {
    let productosLS;

    if (localStorage.getItem("productos") === null) {
        productosLS = [];
    } else {
        productosLS = JSON.parse(localStorage.getItem("productos"));
    }

    return productosLS;
}

//Muestra los programas del LocalStorage al carrito
function cargarLocalStorage() {
    let productosLS = obtenerProductosLocalStorage();
    productosLS.forEach(producto => {
        const row = document.createElement("tr");
        row.innerHTML = `
                    <td>
                        <img src="${producto.imagen}" width="100">
                    </td>
                    <td>${producto.titulo}</td>
                    <td>${producto.precio}</td>
                    <td>
                        <a href="#" class="borrar-producto" data-id="${[producto.id]}">X</a>
                    </td>
        ` ;
        listaProductos.appendChild(row);
    })
}

//Elimina el producto por ID del LocalStorage
function eliminarProductoLocalStorage(productoID) {
    let productosLS;
    productosLS = obtenerProductosLocalStorage();
    productosLS.forEach((producto, index) => {
        if (productoID === producto.id) {
            productosLS.splice(index, 1);
        }
    })
    localStorage.setItem("productos", JSON.stringify(productosLS));
}