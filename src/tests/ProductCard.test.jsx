import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '../components/ProductCard';
import { BrowserRouter } from 'react-router-dom';

test('ProductCard muestra título, precio y dispara onAddToCart', () => {
  const product = { id:1, title:'Test', price: 5, description: 'desc'};
  const mockAdd = jest.fn();
  render(<BrowserRouter><ProductCard product={product} onAddToCart={mockAdd} /></BrowserRouter>);
  expect(screen.getByText('Test')).toBeInTheDocument();
  expect(screen.getByText('$5.00')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /añadir/i }));
  expect(mockAdd).toHaveBeenCalledWith(product);
});
