import {
  obtenerProductos, obtenerCarrito, crearProducto, actualizarProducto,
  eliminarProducto, agregarAlCarrito, modificarCantidad, calcularTotales
} from '../src/services/dataStore.js';

describe('dataStore - CRUD de productos', function () {
  beforeEach(function () { localStorage.clear(); });

  it('debería retornar la lista inicial de productos', function () {
    expect(obtenerProductos().length).toBe(16);
  });

  it('debería crear un nuevo producto', function () {
    crearProducto({ codigo: 'TEST01', nombre: 'Producto Test', categoria: 'Test', precio: 1000, oferta: false });
    const productos = obtenerProductos();
    expect(productos.length).toBe(17);
    expect(productos.some(p => p.codigo === 'TEST01')).toBe(true);
  });

  it('debería actualizar un producto existente', function () {
    actualizarProducto('TC001', { precio: 99999 });
    const producto = obtenerProductos().find(p => p.codigo === 'TC001');
    expect(producto.precio).toBe(99999);
  });

  it('debería eliminar un producto existente', function () {
    expect(eliminarProducto('TC001')).toBe(true);
    expect(obtenerProductos().some(p => p.codigo === 'TC001')).toBe(false);
  });
});

describe('dataStore - Carrito', function () {
  beforeEach(function () { localStorage.clear(); });

  it('debería agregar un producto al carrito', function () {
    const carrito = agregarAlCarrito('TC001');
    expect(carrito.length).toBe(1);
    expect(carrito[0].codigo).toBe('TC001');
  });

  it('debería incrementar la cantidad si el producto ya está en el carrito', function () {
    agregarAlCarrito('TC001');
    const carrito = agregarAlCarrito('TC001');
    expect(carrito[0].cantidad).toBe(2);
  });

  it('debería eliminar el producto cuando la cantidad llega a 0', function () {
    agregarAlCarrito('TC001');
    modificarCantidad('TC001', -1);
    expect(obtenerCarrito().length).toBe(0);
  });
});

describe('dataStore - Descuentos', function () {
  beforeEach(function () {
    localStorage.clear();
    agregarAlCarrito('TC001');
  });

  it('debería aplicar 50% de descuento si la edad es mayor a 50', function () {
    const totales = calcularTotales(60, '');
    expect(totales.descuento).toBe(22500);
    expect(totales.total).toBe(22500);
  });

  it('debería aplicar 10% de descuento con el código FELICES50', function () {
    const totales = calcularTotales(30, 'FELICES50');
    expect(totales.descuento).toBe(4500);
    expect(totales.total).toBe(40500);
  });
});
