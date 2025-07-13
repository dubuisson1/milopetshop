
document.addEventListener("DOMContentLoaded", () => {
    const btn = document.querySelector("#whatsapp-link");
    if (btn) {
        btn.addEventListener("click", () => {
            const nombre = document.getElementById("nombre").value;
            const fecha = document.getElementById("fecha").value;
            const hora = document.getElementById("hora").value;
            const mascota = document.getElementById("mascota").value;
            const mensaje = `Hola! Soy ${nombre} y quiero un turno para mi mascota ${mascota} el ${fecha} a las ${hora}`;
            const url = `https://wa.me/543447433574?text=${encodeURIComponent(mensaje)}`;
            btn.href = url;
        });
    }
});
// ---------------- PRODUCTOS ----------------
function cargarProductos() {
  const contenedor = document.getElementById("productos-lista");
  if (!contenedor) return;

  contenedor.innerHTML = "";
  const productos = JSON.parse(localStorage.getItem("productos") || "[]");

  productos.forEach((prod, index) => {
    const card = document.createElement("div");
    card.className = "producto-card";
    card.innerHTML = `
      <img src="${prod.imagen}" alt="${prod.nombre}" />
      <h3>${prod.nombre}</h3>
      <p>${prod.descripcion}</p>
      <p><strong>$${prod.precio}</strong></p>
      <button onclick="editarProducto(${index})">Editar</button>
      <button onclick="eliminarProducto(${index})">Eliminar</button>
    `;
    contenedor.appendChild(card);
  });
  
}

function guardarProducto(e) {
  e.preventDefault();
  const nombre = document.getElementById("nombre").value;
  const descripcion = document.getElementById("descripcion").value;
  const precio = document.getElementById("precio").value;
  const imagenInput = document.getElementById("imagen");
  const imagen = imagenInput.files[0];

  if (!imagen) return alert("Por favor seleccioná una imagen.");

  const reader = new FileReader();
  reader.onload = function (e) {
    const productos = JSON.parse(localStorage.getItem("productos") || "[]");
    productos.push({ nombre, descripcion, precio, imagen: e.target.result });
    localStorage.setItem("productos", JSON.stringify(productos));
    document.getElementById("producto-form").reset();
    cargarProductos();
  };
  reader.readAsDataURL(imagen);
}

function eliminarProducto(index) {
  const productos = JSON.parse(localStorage.getItem("productos") || "[]");
  productos.splice(index, 1);
  localStorage.setItem("productos", JSON.stringify(productos));
  cargarProductos();
}

function editarProducto(index) {
  const productos = JSON.parse(localStorage.getItem("productos") || "[]");
  const producto = productos[index];

  document.getElementById("nombre").value = producto.nombre;
  document.getElementById("descripcion").value = producto.descripcion;
  document.getElementById("precio").value = producto.precio;

  const form = document.getElementById("producto-form");
  form.removeEventListener("submit", guardarProducto);
  form.onsubmit = function (e) {
    e.preventDefault();
    const nombre = document.getElementById("nombre").value;
    const descripcion = document.getElementById("descripcion").value;
    const precio = document.getElementById("precio").value;
    const imagenInput = document.getElementById("imagen");
    const imagen = imagenInput.files[0];

    if (imagen) {
      const reader = new FileReader();
      reader.onload = function (e) {
        productos[index] = { nombre, descripcion, precio, imagen: e.target.result };
        localStorage.setItem("productos", JSON.stringify(productos));
        form.reset();
        form.addEventListener("submit", guardarProducto);
        cargarProductos();
      };
      reader.readAsDataURL(imagen);
    } else {
      productos[index] = { nombre, descripcion, precio, imagen: producto.imagen };
      localStorage.setItem("productos", JSON.stringify(productos));
      form.reset();
      form.addEventListener("submit", guardarProducto);
      cargarProductos();
    }
  };
}

// Inicializar si estamos en productos.html
if (window.location.pathname.includes("productos.html")) {
  document.getElementById("producto-form").addEventListener("submit", guardarProducto);
  cargarProductos();
}
if (estaLogueado()) {
  // mostrar botones de admin
  const btn = document.createElement("button");
  btn.textContent = "Eliminar";
  div.appendChild(btn);
}
// ---------------- SERVICIOS ----------------
function cargarServicios() {
  const contenedor = document.getElementById("servicios-lista");
  if (!contenedor) return;

  contenedor.innerHTML = "";
  const servicios = JSON.parse(localStorage.getItem("servicios") || "[]");

  servicios.forEach((srv, index) => {
    const card = document.createElement("div");
    card.className = "producto-card";
    card.innerHTML = `
      <img src="${srv.imagen}" alt="${srv.nombre}" />
      <h3>${srv.nombre}</h3>
      <button onclick="editarServicio(${index})">Editar</button>
      <button onclick="eliminarServicio(${index})">Eliminar</button>
    `;
    contenedor.appendChild(card);
  });
}

function guardarServicio(e) {
  e.preventDefault();
  const nombre = document.getElementById("nombre-servicio").value;
  const imagenInput = document.getElementById("imagen-servicio");
  const imagen = imagenInput.files[0];

  if (!imagen) return alert("Seleccioná una imagen del servicio");

  const reader = new FileReader();
  reader.onload = function (e) {
    const servicios = JSON.parse(localStorage.getItem("servicios") || "[]");
    servicios.push({ nombre, imagen: e.target.result });
    localStorage.setItem("servicios", JSON.stringify(servicios));
    document.getElementById("servicio-form").reset();
    cargarServicios();
  };
  reader.readAsDataURL(imagen);
}

function eliminarServicio(index) {
  const servicios = JSON.parse(localStorage.getItem("servicios") || "[]");
  servicios.splice(index, 1);
  localStorage.setItem("servicios", JSON.stringify(servicios));
  cargarServicios();
}

function editarServicio(index) {
  const servicios = JSON.parse(localStorage.getItem("servicios") || "[]");
  const servicio = servicios[index];

  document.getElementById("nombre-servicio").value = servicio.nombre;

  const form = document.getElementById("servicio-form");
  form.removeEventListener("submit", guardarServicio);
  form.onsubmit = function (e) {
    e.preventDefault();
    const nombre = document.getElementById("nombre-servicio").value;
    const imagenInput = document.getElementById("imagen-servicio");
    const imagen = imagenInput.files[0];

    if (imagen) {
      const reader = new FileReader();
      reader.onload = function (e) {
        servicios[index] = { nombre, imagen: e.target.result };
        localStorage.setItem("servicios", JSON.stringify(servicios));
        form.reset();
        form.addEventListener("submit", guardarServicio);
        cargarServicios();
      };
      reader.readAsDataURL(imagen);
    } else {
      servicios[index] = { nombre, imagen: servicio.imagen };
      localStorage.setItem("servicios", JSON.stringify(servicios));
      form.reset();
      form.addEventListener("submit", guardarServicio);
      cargarServicios();
    }
  };
}

// Inicializar si estamos en servicios.html
if (window.location.pathname.includes("servicios.html")) {
  document.getElementById("servicio-form").addEventListener("submit", guardarServicio);
  cargarServicios();
  if (estaLogueado()) {
  // mostrar botones de admin
  const btn = document.createElement("button");
  btn.textContent = "Eliminar";
  div.appendChild(btn);
}
}
// ---------------- RESEÑAS ----------------
function cargarReseñas() {
  const contenedor = document.getElementById("lista-reseñas");
  if (!contenedor) return;

  contenedor.innerHTML = "";
  const reseñas = JSON.parse(localStorage.getItem("reseñas") || "[]");

  reseñas.forEach((r, index) => {
    const div = document.createElement("div");
    div.className = "producto-card";
    div.innerHTML = `
      <h3>${r.nombre}</h3>
      <p>"${r.comentario}"</p>
      <p>${"⭐".repeat(r.estrellas)}</p>
      <button onclick="editarReseña(${index})">Editar</button>
      <button onclick="eliminarReseña(${index})">Eliminar</button>
    `;
    contenedor.appendChild(div);
  });
}

function guardarReseña(e) {
  e.preventDefault();
  const nombre = document.getElementById("nombre-reseña").value;
  const comentario = document.getElementById("comentario-reseña").value;
  const estrellas = parseInt(document.getElementById("estrellas").value);

  const reseñas = JSON.parse(localStorage.getItem("reseñas") || "[]");
  reseñas.push({ nombre, comentario, estrellas });
  localStorage.setItem("reseñas", JSON.stringify(reseñas));

  document.getElementById("reseña-form").reset();
  cargarReseñas();
}

function eliminarReseña(index) {
  const reseñas = JSON.parse(localStorage.getItem("reseñas") || "[]");
  reseñas.splice(index, 1);
  localStorage.setItem("reseñas", JSON.stringify(reseñas));
  cargarReseñas();
}

function editarReseña(index) {
  const reseñas = JSON.parse(localStorage.getItem("reseñas") || "[]");
  const reseña = reseñas[index];

  document.getElementById("nombre-reseña").value = reseña.nombre;
  document.getElementById("comentario-reseña").value = reseña.comentario;
  document.getElementById("estrellas").value = reseña.estrellas;

  const form = document.getElementById("reseña-form");
  form.removeEventListener("submit", guardarReseña);
  form.onsubmit = function (e) {
    e.preventDefault();
    const nombre = document.getElementById("nombre-reseña").value;
    const comentario = document.getElementById("comentario-reseña").value;
    const estrellas = parseInt(document.getElementById("estrellas").value);

    reseñas[index] = { nombre, comentario, estrellas };
    localStorage.setItem("reseñas", JSON.stringify(reseñas));
    form.reset();
    form.addEventListener("submit", guardarReseña);
    cargarReseñas();
  };
}

if (window.location.pathname.includes("sobre-nosotros.html")) {
  document.getElementById("reseña-form").addEventListener("submit", guardarReseña);
  cargarReseñas();
}
// ---------------- CARRUSEL SOBRE NOSOTROS ----------------
if (window.location.pathname.includes("sobre-nosotros.html")) {
  const imagenes = [
    'assets/negocio1.jpg',
    'assets/negocio2.jpg',
    'assets/negocio3.jpg',
    // agregá acá más imágenes según tengas
  ];

  let indiceActual = 0;

  const imgCarrusel = document.getElementById('carrusel-img');
  const btnPrev = document.getElementById('prevBtn');
  const btnNext = document.getElementById('nextBtn');

  btnPrev.addEventListener('click', () => {
    indiceActual = (indiceActual - 1 + imagenes.length) % imagenes.length;
    imgCarrusel.src = imagenes[indiceActual];
  });

  btnNext.addEventListener('click', () => {
    indiceActual = (indiceActual + 1) % imagenes.length;
    imgCarrusel.src = imagenes[indiceActual];
  });
}
// ---------- LOGIN ----------
if (window.location.pathname.includes("login.html")) {
  document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const user = document.getElementById("usuario").value;
    const pass = document.getElementById("contraseña").value;

    if (user === "admin" && pass === "milopet2025") {
      localStorage.setItem("logueado", "true");
      window.location.href = "index.html";
    } else {
      document.getElementById("login-error").textContent = "Usuario o contraseña incorrectos.";
    }
  });
}

// ---------- FUNCIONES PARA VERIFICAR LOGIN ----------
function estaLogueado() {
  return localStorage.getItem("logueado") === "true";
}

function cerrarSesion() {
  localStorage.removeItem("logueado");
  window.location.href = "login.html";
}
// script.js

// ---------- LOGIN ----------
function estaLogueado() {
  return localStorage.getItem("logueado") === "true";
}

function cerrarSesion() {
  localStorage.removeItem("logueado");
  window.location.href = "login.html";
}

if (window.location.pathname.includes("login.html")) {
  document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const user = document.getElementById("usuario").value;
    const pass = document.getElementById("contraseña").value;

    if (user === "admin" && pass === "milopet2025") {
      localStorage.setItem("logueado", "true");
      window.location.href = "index.html";
    } else {
      document.getElementById("login-error").textContent = "Usuario o contraseña incorrectos.";
    }
  });
}

// ---------- FUNCIONES AUXILIARES ----------
function obtenerImagen(inputFileId, selectId) {
  const fileInput = document.getElementById(inputFileId);
  const selectInput = document.getElementById(selectId);

  if (fileInput.files.length > 0) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.readAsDataURL(fileInput.files[0]);
    });
  } else {
    return Promise.resolve(selectInput.value);
  }
}

// ---------- PRODUCTOS ----------
if (window.location.pathname.includes("productos.html")) {
  const contenedor = document.getElementById("lista-productos");
  const form = document.getElementById("form-producto");

  if (estaLogueado()) {
    document.getElementById("admin-productos").style.display = "block";
  }

  let productos = JSON.parse(localStorage.getItem("productos")) || [];

  function renderizarProductos() {
    contenedor.innerHTML = "";
    productos.forEach((producto, index) => {
      const card = document.createElement("div");
      card.className = "producto";
      card.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}" />
        <h3>${producto.nombre}</h3>
        <p>${producto.descripcion}</p>
        <strong>$${producto.precio}</strong>
      `;
      if (estaLogueado()) {
        const editar = document.createElement("button");
        editar.textContent = "Editar";
        editar.onclick = () => cargarProducto(index);

        const eliminar = document.createElement("button");
        eliminar.textContent = "Eliminar";
        eliminar.onclick = () => eliminarProducto(index);

        card.appendChild(editar);
        card.appendChild(eliminar);
      }
      contenedor.appendChild(card);
    });
  }

  function cargarProducto(index) {
    const p = productos[index];
    document.getElementById("nombre").value = p.nombre;
    document.getElementById("precio").value = p.precio;
    document.getElementById("descripcion").value = p.descripcion;
    form.dataset.editIndex = index;
  }

  function eliminarProducto(index) {
    productos.splice(index, 1);
    localStorage.setItem("productos", JSON.stringify(productos));
    renderizarProductos();
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const nombre = document.getElementById("nombre").value;
    const precio = document.getElementById("precio").value;
    const descripcion = document.getElementById("descripcion").value;
    const imagen = await obtenerImagen("imagen-upload", "imagen-select");

    const nuevoProducto = { nombre, precio, descripcion, imagen };
    const editIndex = form.dataset.editIndex;

    if (editIndex !== undefined) {
      productos[editIndex] = nuevoProducto;
      delete form.dataset.editIndex;
    } else {
      productos.push(nuevoProducto);
    }

    localStorage.setItem("productos", JSON.stringify(productos));
    form.reset();
    renderizarProductos();
  });

  renderizarProductos();
}

// ---------- SERVICIOS ----------
if (window.location.pathname.includes("servicios.html")) {
  const contenedor = document.getElementById("lista-servicios");
  const form = document.getElementById("form-servicio");

  if (estaLogueado()) {
    document.getElementById("admin-servicios").style.display = "block";
  }

  let servicios = JSON.parse(localStorage.getItem("servicios")) || [];

  function renderizarServicios() {
    contenedor.innerHTML = "";
    servicios.forEach((servicio, index) => {
      const card = document.createElement("div");
      card.className = "servicio";
      card.innerHTML = `
        <img src="${servicio.imagen}" alt="${servicio.titulo}" />
        <h3>${servicio.titulo}</h3>
        <p>${servicio.descripcion}</p>
      `;
      if (estaLogueado()) {
        const editar = document.createElement("button");
        editar.textContent = "Editar";
        editar.onclick = () => cargarServicio(index);

        const eliminar = document.createElement("button");
        eliminar.textContent = "Eliminar";
        eliminar.onclick = () => eliminarServicio(index);

        card.appendChild(editar);
        card.appendChild(eliminar);
      }
      contenedor.appendChild(card);
    });
  }

  function cargarServicio(index) {
    const s = servicios[index];
    document.getElementById("titulo-servicio").value = s.titulo;
    document.getElementById("descripcion-servicio").value = s.descripcion;
    form.dataset.editIndex = index;
  }

  function eliminarServicio(index) {
    servicios.splice(index, 1);
    localStorage.setItem("servicios", JSON.stringify(servicios));
    renderizarServicios();
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const titulo = document.getElementById("titulo-servicio").value;
    const descripcion = document.getElementById("descripcion-servicio").value;
    const imagen = await obtenerImagen("imagen-servicio-upload", "imagen-servicio-select");

    const nuevoServicio = { titulo, descripcion, imagen };
    const editIndex = form.dataset.editIndex;

    if (editIndex !== undefined) {
      servicios[editIndex] = nuevoServicio;
      delete form.dataset.editIndex;
    } else {
      servicios.push(nuevoServicio);
    }

    localStorage.setItem("servicios", JSON.stringify(servicios));
    form.reset();
    renderizarServicios();
  });

  renderizarServicios();
}
