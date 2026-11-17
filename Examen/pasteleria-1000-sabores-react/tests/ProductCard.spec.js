import React from 'react';
import TestRenderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import ProductCard from '../src/components/ProductCard.jsx';

describe('ProductCard', function () {
  const producto = {
    codigo: 'TC001',
    nombre: 'Torta Cuadrada de Chocolate',
    categoria: 'Tortas Cuadradas',
    precio: 45000,
    oferta: true
  };

  it('debería renderizar el nombre del producto', function () {
    const testRenderer = TestRenderer.create(
      <MemoryRouter><ProductCard producto={producto} /></MemoryRouter>
    );
    expect(JSON.stringify(testRenderer.toJSON())).toContain('Torta Cuadrada de Chocolate');
  });

  it('debería mostrar la etiqueta de oferta cuando el producto está en oferta', function () {
    const testRenderer = TestRenderer.create(
      <MemoryRouter><ProductCard producto={producto} /></MemoryRouter>
    );
    expect(JSON.stringify(testRenderer.toJSON())).toContain('En oferta');
  });
});
