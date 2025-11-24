import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductDetail from '../components/ProductDetail';
import { db } from '../api/fakeDB';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { CartProvider } from '../context/CartContext'; // <--- Agregamos esto

beforeEach(() => {
  db.reset([
    { id: 1, title: 'A', price: 1, stock: 2, description: 'desc A' }
  ]);
});

test('muestra datos del producto según id en ruta', async () => {
  render(
    <MemoryRouter initialEntries={['/product/1']}>
      <CartProvider>
        <Routes>
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </CartProvider>
    </MemoryRouter>
  );

  expect(await screen.findByText('A')).toBeInTheDocument();
  expect(await screen.findByText(/desc A/i)).toBeInTheDocument();
  expect(await screen.findByText('$1.00')).toBeInTheDocument();
});
