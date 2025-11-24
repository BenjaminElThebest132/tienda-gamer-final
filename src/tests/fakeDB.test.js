import { db } from '../api/fakeDB';

beforeEach(() => {
  db.reset([
    { id: 1, title: 'A', price: 1, stock: 2, description: 'desc A' },
    { id: 2, title: 'B', price: 2, stock: 3, description: 'desc B' }
  ], [], []);
});

test('getAllProducts devuelve lista', async () => {
  const all = await db.getAllProducts();
  expect(all.length).toBe(2);
});

test('createProduct añade y devuelve nuevo', async () => {
  const newP = await db.createProduct({ title: 'C', price: 3, stock: 1, description: 'desc C' });
  expect(newP.id).toBeGreaterThan(2);
  const all = await db.getAllProducts();
  expect(all.some(p => p.title === 'C')).toBe(true);
});

test('updateProduct modifica producto', async () => {
  const updated = await db.updateProduct(1, { price: 9.99 });
  expect(updated.price).toBe(9.99);
});

test('deleteProduct elimina producto', async () => {
  await db.deleteProduct(1);
  const all = await db.getAllProducts();
  expect(all.some(p => p.id === 1)).toBe(false);
});
