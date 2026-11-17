import React, { useState, useEffect } from 'react';
import { obtenerProductos } from '../services/dataStore.js';
import ProductCard from '../components/ProductCard.jsx';

function Catalogo() {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [categoria, setCategoria] = useState('');

  useEffect(() => {
    setProductos(obtenerProductos());
  }, []);

  const categorias = [...new Set(productos.map(p => p.categoria))];

  const filtrados = productos.filter(p => {
    const coincideTexto = p.nombre.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCategoria = categoria === '' || p.categoria === categoria;
    return coincideTexto && coincideCategoria;
  });

  return (
    <div>
      <h2>Catálogo de productos</h2>
      <div className="row mb-4">
        <div className="col-12 col-md-6 mb-2">
          <input type="text" className="form-control" placeholder="Buscar producto..."
            value={busqueda} onChange={e => setBusqueda(e.target.value)} />
        </div>
        <div className="col-12 col-md-6">
          <select className="form-select" value={categoria} onChange={e => setCategoria(e.target.value)}>
            <option value="">Todas las categorías</option>
            {categorias.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
      </div>
      <div className="row">
        {filtrados.map(prod => <ProductCard key={prod.codigo} producto={prod} />)}
      </div>
    </div>
  );
}

export default Catalogo;
