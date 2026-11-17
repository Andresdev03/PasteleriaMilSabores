import productosIniciales from '../data/productos.js';

const PRODUCTOS_KEY = 'pasteleria_productos';
const CARRITO_KEY = 'pasteleria_carrito';

function leerProductos() {
  const data = localStorage.getItem(PRODUCTOS_KEY);
  if (!data) {
    localStorage.setItem(PRODUCTOS_KEY, JSON.stringify(productosIniciales));
    return [...productosIniciales];
  }
  return JSON.parse(data);
}

function guardarProductos(lista) {
  localStorage.setItem(PRODUCTOS_KEY, JSON.stringify(lista));
}

export function obtenerProductos() {
  return leerProductos();
}

export function obtenerProductoPorCodigo(codigo) {
  return leerProductos().find(p => p.codigo === codigo) || null;
}

export function crearProducto(producto) {
  const lista = leerProductos();
  const nuevo = { ...producto, codigo: producto.codigo || 'P' + Date.now() };
  lista.push(nuevo);
  guardarProductos(lista);
  return nuevo;
}

export function actualizarProducto(codigo, cambios) {
  const lista = leerProductos();
  const index = lista.findIndex(p => p.codigo === codigo);
  if (index === -1) return null;
  lista[index] = { ...lista[index], ...cambios };
  guardarProductos(lista);
  return lista[index];
}

export function eliminarProducto(codigo) {
  const lista = leerProductos();
  const nuevaLista = lista.filter(p => p.codigo !== codigo);
  guardarProductos(nuevaLista);
  return nuevaLista.length < lista.length;
}

export function obtenerCarrito() {
  const data = localStorage.getItem(CARRITO_KEY);
  return data ? JSON.parse(data) : [];
}

function guardarCarrito(carrito) {
  localStorage.setItem(CARRITO_KEY, JSON.stringify(carrito));
}

export function agregarAlCarrito(codigo, cantidad = 1) {
  const producto = obtenerProductoPorCodigo(codigo);
  if (!producto) return obtenerCarrito();

  const carrito = obtenerCarrito();
  const existente = carrito.find(item => item.codigo === codigo);

  if (existente) {
    existente.cantidad += cantidad;
  } else {
    carrito.push({ ...producto, cantidad });
  }

  guardarCarrito(carrito);
  return carrito;
}

export function modificarCantidad(codigo, delta) {
  let carrito = obtenerCarrito();
  const item = carrito.find(i => i.codigo === codigo);
  if (!item) return carrito;

  item.cantidad += delta;

  if (item.cantidad <= 0) {
    carrito = carrito.filter(i => i.codigo !== codigo);
  }

  guardarCarrito(carrito);
  return carrito;
}

export function eliminarDelCarrito(codigo) {
  const carrito = obtenerCarrito().filter(i => i.codigo !== codigo);
  guardarCarrito(carrito);
  return carrito;
}

export function vaciarCarrito() {
  guardarCarrito([]);
  return [];
}

export function calcularTotales(edad, codigoPromo) {
  const carrito = obtenerCarrito();
  const subtotal = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  let descuento = 0;

  if (Number(edad) > 50) {
    descuento = subtotal * 0.5;
  } else if (codigoPromo && codigoPromo.toUpperCase() === 'FELICES50') {
    descuento = subtotal * 0.1;
  }

  const total = subtotal - descuento;

  return { subtotal, descuento, total };
}
