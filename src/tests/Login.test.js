import { render, screen } from '@testing-library/react';
import Login from '../pages/Login';
import { BrowserRouter } from 'react-router-dom';

test('renderiza el formulario de login correctamente', () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
  const linkElement = screen.getByText(/Iniciar Sesión/i);
  expect(linkElement).toBeInTheDocument();
});