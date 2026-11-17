import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { obtenerCarrito, calcularTotales, vaciarCarrito } from '../services/dataStore.js';

function Checkout() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ nombre: '', email: '', direccion: '', entrega: 'retiro' });
  const [errores, setErrores] = useState({});

  const carrito = obtenerCarrito();
  const edad = localStorage.getItem('edadUsuario') || 0;
  const codigo = localStorage.getItem('codigoPromo') || '';
  const totales = calcularTotales(edad, codigo);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function validar() {
    const errs = {};
    if (!form.nombre.trim()) errs.nombre = 'El nombre es obligatorio.';
    if (!form.email.includes('@')) errs.email = 'Ingresa un correo válido.';
    if (!form.direccion.trim()) errs.direccion = 'La dirección es obligatoria.';
    return errs;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validar();
    setErrores(errs);

    if (Object.keys(errs).length > 0 || carrito.length === 0) {
      navigate('/compra-fallida');
      return;
    }

    localStorage.setItem('ultimaCompra', JSON.stringify({
      fecha: new Date().toISOString(),
      items: carrito,
      totales
    }));
    vaciarCarrito();
    navigate('/compra-exitosa');
  }

  return (
    <div>
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label className="form-label">Nombre completo</label>
          <input type="text" className="form-control" name="nombre" value={form.nombre} onChange={handleChange} />
          {errores.nombre && <div className="text-danger">{errores.nombre}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Correo electrónico</label>
          <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} />
          {errores.email && <div className="text-danger">{errores.email}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Dirección de envío</label>
          <input type="text" className="form-control" name="direccion" value={form.direccion} onChange={handleChange} />
          {errores.direccion && <div className="text-danger">{errores.direccion}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Método de entrega</label>
          <select className="form-select" name="entrega" value={form.entrega} onChange={handleChange}>
            <option value="retiro">Retiro en tienda</option>
            <option value="despacho">Despacho a domicilio</option>
          </select>
        </div>
        <div className="mb-3">
          <p>Subtotal: ${totales.subtotal.toLocaleString('es-CL')} CLP</p>
          <p>Descuento: ${totales.descuento.toLocaleString('es-CL')} CLP</p>
          <p className="fw-bold">Total: ${totales.total.toLocaleString('es-CL')} CLP</p>
        </div>
        <button type="submit" className="btn btn-primary"
          style={{ backgroundColor: '#8B4513', borderColor: '#8B4513' }}>Confirmar compra</button>
      </form>
    </div>
  );
}

export default Checkout;
