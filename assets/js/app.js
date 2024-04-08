const carrito = document.querySelector("#carrito");
const sumaTotal = document.querySelector("#sumaTotal");
const template = document.querySelector("#template");
const templateTotal = document.querySelector("#templateTotal");
const btnes = document.querySelectorAll(".card .btn");
const fragment = document.createDocumentFragment();
const fragmentTotal = document.createDocumentFragment();

const carritoArray = [];

const pintarCaririto = (e) => {
    const producto = {
        nombre: e.target.dataset.fruta,
        cantidad: 1,
        precio: +e.target.dataset.precio,
        total: +e.target.dataset.precio,
    };

    const index = carritoArray.findIndex((item) => item.nombre === producto.nombre);

    if (index === -1) {
        carritoArray.push(producto);
    } else {
        carritoArray[index].cantidad++;
        carritoArray[index].total = carritoArray[index].cantidad * carritoArray[index].precio;
    }

    console.log(carritoArray);
    llenarCarrito();
};

const llenarCarrito = () => {
    carrito.textContent = "";

    carritoArray.forEach((item) => {
        const clone = template.content.firstElementChild.cloneNode(true);
        clone.querySelector(".lead").textContent = item.nombre;
        clone.querySelector(".cantidad").textContent = item.cantidad;
        clone.querySelector(".precio").textContent = item.total;

        fragment.appendChild(clone);
    });
    carrito.appendChild(fragment);
};

btnes.forEach((btn) => btn.addEventListener("click", pintarCaririto));
