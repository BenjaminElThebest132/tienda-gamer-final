// src/api/fakeDB.js
let products = [
  { id: 1, title: 'Skin A', price: 9.99, category: 'Armas', stock: 10, description: 'Skin A description' },
  { id: 2, title: 'Skin B', price: 14.99, category: 'Trajes', stock: 5, description: 'Skin B description' },
  { id: 3, title: 'Skin C', price: 4.50, category: 'Coleccionables', stock: 20, description: 'Skin C description' }
];

let users = [
  { id: 1, username: 'admin', password: 'admin123', role: 'admin' },
  { id: 2, username: 'user', password: 'user123', role: 'user' }
];

let orders = [];

const wait = (ms = 200) => new Promise(res => setTimeout(res, ms));

export const db = {
  getAllProducts: async () => { await wait(); return [...products]; },
  getProductById: async (id) => { await wait(); return products.find(p => p.id === +id) ?? null; },
  createProduct: async (product) => {
    await wait();
    const id = Math.max(0, ...products.map(p=>p.id)) + 1;
    const newP = { id, ...product };
    products.push(newP);
    return newP;
  },
  updateProduct: async (id, data) => {
    await wait();
    const idx = products.findIndex(p => p.id === +id);
    if (idx === -1) throw new Error('Not found');
    products[idx] = { ...products[idx], ...data };
    return products[idx];
  },
  deleteProduct: async (id) => {
    await wait();
    products = products.filter(p => p.id !== +id);
    return true;
  },
  authenticate: async (username, password) => {
    await wait();
    const u = users.find(x => x.username === username && x.password === password);
    if (!u) return null;
    // token simulado
    return { token: btoa(`${u.id}:${u.username}:${u.role}`), user: { id: u.id, username: u.username, role: u.role } };
  },
  createOrder: async (order) => {
    await wait();
    const id = Math.max(0, ...orders.map(o=>o.id)) + 1;
    const newO = { id, ...order, createdAt: new Date().toISOString() };
    orders.push(newO);
    return newO;
  },
  getOrders: async () => { await wait(); return [...orders]; },
  reset: (initialProducts = [], initialUsers = [], initialOrders = []) => {
    products = [...initialProducts];
    users = [...initialUsers];
    orders = [...initialOrders];
  }
};
