import React from 'react';
import { Link } from 'react-router-dom';
import { agregarAlCarrito } from '../services/dataStore.js';

function ProductCard({ producto }) {
  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
      <div className="card h-100">
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{producto.nombre}</h5>
          <p className="card-text text-muted">{producto.categoria}</p>
          <p className="card-text fw-bold">${producto.precio.toLocaleString('es-CL')} CLP</p>
          {producto.oferta && <span className="badge bg-success mb-2">En oferta</span>}
          <button
            className="btn btn-primary mt-auto"
            style={{ backgroundColor: '#8B4513', borderColor: '#8B4513' }}
            onClick={() => agregarAlCarrito(producto.codigo)}
          >
            Agregar al carrito
          </button>
          <Link to="/catalogo" className="btn btn-outline-secondary mt-2">Ver catálogo</Link>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
