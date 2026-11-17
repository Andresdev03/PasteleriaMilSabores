import React, { useState, useEffect } from 'react';
import { obtenerProductos } from '../services/dataStore.js';
import ProductCard from '../components/ProductCard.jsx';

function Ofertas() {
  const [ofertas, setOfertas] = useState([]);

  useEffect(() => {
    setOfertas(obtenerProductos().filter(p => p.oferta));
  }, []);

  return (
    <div>
      <h2>Ofertas</h2>
      <p>Productos con descuento especial esta semana.</p>
      <div className="row">
        {ofertas.map(prod => <ProductCard key={prod.codigo} producto={prod} />)}
      </div>
    </div>
  );
}

export default Ofertas;
