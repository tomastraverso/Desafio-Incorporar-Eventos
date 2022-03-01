let aumentoPrecios = 1.2; // --> Modificar esta variable para aumentar el precio de los productos
let productoSeleccionado;

class Producto {
  constructor(id, nombre, precio) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
  }

  sumaIVA() {
    this.precio *= 1.21;
  }
  aumentarPrecio() {
    if (aumentoPrecios < 1) {
      this.precio = this.precio * aumentoPrecios + this.precio;
    } else {
      this.precio *= aumentoPrecios;
    }
  }
}

const producto1 = new Producto(1, "Grasa", 500);
const producto2 = new Producto(2, "Desengrasante", 1000);
const producto3 = new Producto(3, "Aceite", 750);
const producto4 = new Producto(4, "Refrigerante", 800);

const productos = [producto1, producto2, producto3];

const carrito = [];

const usuario = document.getElementById("usuario");

//Aumentar precio productos
productos.forEach((listaProductos) => {
  listaProductos.aumentarPrecio();
});
//Saludo usuario
const saludar = () => {
  alert("Bienvenido al Mercado");
  let nombre = prompt("Ingrese su nombre");
  if (nombre.length === 0 || nombre === " ") {
    alert("Nombre inválido.");
  } else {
    usuario.innerHTML = `<h1>Bienvenido ${nombre.toUpperCase()}</h1>`;
  }
};
//Mostrar productos en el html
let divProducto = document.getElementById("producto");

productos.forEach((productoEnArray) => {
  divProducto.innerHTML += `
  <div id="${productoEnArray.id}"></div>
    <p className="nombreProducto">Nombre: ${productoEnArray.nombre}</p>
    <p className="precioProducto">Precio: $${productoEnArray.precio}</p>
    <button id="btn-${productoEnArray.id}" class="btn">Agregar al carrito</button>
  `;
});

//Consulta al usuario qué producto quiere llevar
const consultarProducto = () => {
  let texto = "";
  for (let p of productos) {
    texto += `${p.id}) ${p.nombre}\n\n`;
  }

  let producto = parseInt(prompt(`Que producto llevara?\n ${texto}`));
  while (isNaN(producto) || producto < 1 || producto > 4) {
    producto = parseInt(prompt(`Que producto llevara?\n ${texto}`));
  }
  return producto;
};

//Agrega los productos seleccionados por el usuario al carrito
const llevarProducto = () => {
  let buscarProducto = productos.find(
    (element) => element.id === productoSeleccionado
  );

  let existe = carrito.some((element) => element.id === buscarProducto.id);
  console.log(existe);

  if (existe) {
    carrito.map((element) => {
      if (element.id === buscarProducto.id) {
        element.cantidad++; //Suma cantidad y no se duplica en el array.
        return element;
      } else {
        return element;
      }
    });
  } else {
    buscarProducto.cantidad = 1;
    carrito.push(buscarProducto);
  }

  let seguir = confirm("Desea llevar otro producto?");
  if (seguir) {
    productoSeleccionado = consultarProducto();
    llevarProducto();
  }
};

//Muestra los productos del carrito en el html
let divCarrito = document.getElementById("carrito");
const mostrarProductos = () => {
  carrito.forEach((productoEnArray) => {
    divCarrito.innerHTML += `
  <div id="${productoEnArray.id}"></div>
    <p className="nombreProducto">Nombre: ${productoEnArray.nombre}</p>
    <p className="precioProducto">Precio: $${productoEnArray.precio}</p>
  `;
  });
};

//Calcula el total de los productos seleccionados por el usuario y crea un div con el monto y un botón para abonar
const calcularTotal = () => {
  let total = carrito.reduce((acc, ite) => acc + ite.cantidad * ite.precio, 0);
  document.body.innerHTML += `<div class="cajaTotal"><h3>TOTAL $${total}</h3></div>
  <div><button id="botonpagar">Pagar</button></div>`;

  //Botón para abonar
  const botonPagar = document.getElementById("botonpagar");
  botonPagar.addEventListener(
    "click",
    (e = () => {
      let monto = parseInt(prompt("¿Con cuánto abona?"));
      let debe = total - monto;
      while (isNaN(monto)) {
        monto = parseInt(prompt("¿Con cuánto abona?"));
      }
      if (monto > total) {
        alert(`Su vuelto es $${monto - total}`);
        alert("¡Muchas gracias por su compra!");
      } else if (monto === total) {
        alert(`Muchas gracias por su compra.`);
      } else {
        alert(`Le faltan $${debe}.`);
        let seguir = confirm(`¿Desea pagar los $${debe} faltantes?`); //Confirm para consultar si desea abonar el dinero que le falta y nuevamente condiciones dependiendo del monto que ingrese.
        if (seguir === true) {
          let faltante = parseInt(prompt(`Abone los $${debe} faltantes.`));
          while (isNaN(faltante)) {
            faltante = parseInt(prompt(`Abone los $${debe} faltantes.`));
          }
          if (faltante === debe) {
            alert(`¡Muchas gracias por su compra!`);
          } else if (faltante > debe) {
            alert(`Su vuelto es $${faltante - debe}.`);
            alert("¡Muchas gracias por su compra!");
          } else {
            alert(
              "Fondos insuficientes. Si desea realizar la compra por favor verifique sus fondos nuevamente."
            );
          }
        } else {
          alert("Muchas gracias.");
        }
      }
    })
  );
};

//Declaración de funciones
saludar();
productoSeleccionado = consultarProducto();
llevarProducto();
mostrarProductos();
calcularTotal();

const botonCarrito1 = document.getElementById("btn-1");
const botonCarrito2 = document.getElementById("btn-2");
const botonCarrito3 = document.getElementById("btn-3");
//hacer algo para q x cada 1 le aplique el evento. Y no seleccionar id por id individualmente por c. producto que agregue
botonCarrito1.addEventListener(
  "click",
  (e = () => {
    alert(`Falta Agregar funcionalidad`);
  })
);
botonCarrito2.addEventListener(
  "click",
  (e = () => {
    alert(`Falta Agregar funcionalidad`);
  })
);
botonCarrito3.addEventListener(
  "click",
  (e = () => {
    alert(`Falta Agregar funcionalidad`);
  })
);
