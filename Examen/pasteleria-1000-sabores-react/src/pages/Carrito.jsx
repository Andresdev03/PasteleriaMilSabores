import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  obtenerCarrito, modificarCantidad, eliminarDelCarrito,
  vaciarCarrito, calcularTotales
} from '../services/dataStore.js';

function Carrito() {
  const [carrito, setCarrito] = useState([]);
  const [totales, setTotales] = useState({ subtotal: 0, descuento: 0, total: 0 });

  useEffect(() => {
    const edad = localStorage.getItem('edadUsuario') || 0;
    const codigo = localStorage.getItem('codigoPromo') || '';
    setCarrito(obtenerCarrito());
    setTotales(calcularTotales(edad, codigo));
  }, []);

  return (
    <div>
      <h2>Carrito de compras</h2>
      {carrito.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr><th>Producto</th><th>Cantidad</th><th>Subtotal</th><th>Acciones</th></tr>
            </thead>
            <tbody>
              {carrito.map(item => (
                <tr key={item.codigo}>
                  <td>{item.nombre}</td>
                  <td>{item.cantidad}</td>
                  <td>${(item.precio * item.cantidad).toLocaleString('es-CL')} CLP</td>
                  <td>
                    <button className="btn btn-sm btn-outline-secondary me-1"
                      onClick={() => { modificarCantidad(item.codigo, -1); setCarrito(obtenerCarrito()); }}>-</button>
                    <button className="btn btn-sm btn-outline-secondary me-1"
                      onClick={() => { modificarCantidad(item.codigo, 1); setCarrito(obtenerCarrito()); }}>+</button>
                    <button className="btn btn-sm btn-danger"
                      onClick={() => { eliminarDelCarrito(item.codigo); setCarrito(obtenerCarrito()); }}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-end">
            <p>Subtotal: ${totales.subtotal.toLocaleString('es-CL')} CLP</p>
            <p>Descuento: ${totales.descuento.toLocaleString('es-CL')} CLP</p>
            <p className="fw-bold">Total: ${totales.total.toLocaleString('es-CL')} CLP</p>
            <button className="btn btn-secondary me-2"
              onClick={() => { vaciarCarrito(); setCarrito([]); }}>Vaciar carrito</button>
            <Link to="/checkout" className="btn btn-primary"
              style={{ backgroundColor: '#8B4513', borderColor: '#8B4513' }}>Ir a pagar</Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Carrito;
