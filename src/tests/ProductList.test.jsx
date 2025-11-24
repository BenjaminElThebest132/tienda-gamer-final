import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductList from '../components/ProductList';
import { db } from '../api/fakeDB';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from '../context/CartContext'; // <--- Agregamos esto

beforeEach(() => {
  db.reset([
    { id: 1, title: 'A', price: 1, stock: 2, description: 'desc A' },
    { id: 2, title: 'B', price: 2, stock: 3, description: 'desc B' }
  ]);
});

test('muestra lista de productos desde fakeDB', async () => {
  render(
    <BrowserRouter>
      <CartProvider>
        <ProductList />
      </CartProvider>
    </BrowserRouter>
  );

  expect(await screen.findByText('A')).toBeInTheDocument();
  expect(await screen.findByText('B')).toBeInTheDocument();
});
