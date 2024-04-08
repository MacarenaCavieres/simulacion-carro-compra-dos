const carrito = document.querySelector("#carrito");
const sumaTotal = document.querySelector("#sumaTotal");
const template = document.querySelector("#template");
const templateTotal = document.querySelector("#templateTotal");
const btnes = document.querySelectorAll(".card .btn");
const fragment = document.createDocumentFragment();
const fragmentTotal = document.createDocumentFragment();

const carritoArray = [];

const pintarCarrito = (e) => {
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

    llenarCarrito();
    agregarTotal();
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

const agregarTotal = () => {
    sumaTotal.textContent = "";
    let all = 0;

    carritoArray.forEach((item) => {
        all += item.total;
    });

    const clone = templateTotal.content.firstElementChild.cloneNode(true);
    clone.querySelector(".total").textContent = `$${all}`;

    fragmentTotal.appendChild(clone);
    sumaTotal.appendChild(fragmentTotal);
};

carrito.addEventListener("click", (e) => {
    if (e.target.classList.contains("disminuir")) {
        const nombreFruta = e.target.parentElement.previousElementSibling.textContent;

        const index = carritoArray.findIndex((item) => item.nombre === nombreFruta);

        if (carritoArray[index].cantidad > 0) {
            carritoArray[index].cantidad--;
            carritoArray[index].total = carritoArray[index].cantidad * carritoArray[index].precio;
            llenarCarrito();
            agregarTotal();
        }
    }
});

btnes.forEach((btn) => btn.addEventListener("click", pintarCarrito));
