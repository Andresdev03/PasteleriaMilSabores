import React, { useState, useEffect } from 'react';
import { obtenerProductos } from '../services/dataStore.js';
import ProductCard from '../components/ProductCard.jsx';

function Categorias() {
  const [productos, setProductos] = useState([]);
  const [categoriaActiva, setCategoriaActiva] = useState('');

  useEffect(() => {
    setProductos(obtenerProductos());
  }, []);

  const categorias = [...new Set(productos.map(p => p.categoria))];
  const filtrados = categoriaActiva
    ? productos.filter(p => p.categoria === categoriaActiva)
    : productos;

  return (
    <div>
      <h2>Categorías</h2>
      <div className="mb-4">
        {categorias.map(cat => (
          <button key={cat}
            className={`btn btn-sm me-2 mb-2 ${categoriaActiva === cat ? 'btn-primary' : 'btn-outline-secondary'}`}
            style={categoriaActiva === cat ? { backgroundColor: '#8B4513', borderColor: '#8B4513' } : {}}
            onClick={() => setCategoriaActiva(cat)}>
            {cat}
          </button>
        ))}
        <button className="btn btn-sm btn-outline-secondary mb-2" onClick={() => setCategoriaActiva('')}>
          Todas
        </button>
      </div>
      <div className="row">
        {filtrados.map(prod => <ProductCard key={prod.codigo} producto={prod} />)}
      </div>
    </div>
  );
}

export default Categorias;
