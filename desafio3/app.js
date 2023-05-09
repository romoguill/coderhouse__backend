import express from 'express';
import Product from './Product.js';
import ProductManager from './ProductManager.js';

const PORT = 8080;

const app = express();

const mockJson = [
  {
    title: 'Lavandina',
    description: 'Limpieza',
    price: 20,
    thumbnail: 'sin imagen',
    code: 'aaa001',
    stock: 300,
  },
  {
    title: 'Chocolate',
    description: 'Alimentos',
    price: 324,
    thumbnail: 'sin imagen',
    code: 'aaa002',
    stock: 199,
  },
  {
    title: 'Galletitas',
    description: 'Alimentos',
    price: 0.34,
    thumbnail: 'sin imagen',
    code: 'aaa003',
    stock: 1304,
  },
  {
    title: 'Jamon',
    description: 'Fiambres',
    price: 686,
    thumbnail: 'sin imagen',
    code: 'aaa004',
    stock: 2304,
  },
  {
    title: 'Leche',
    description: 'Lacteos',
    price: 42,
    thumbnail: 'sin imagen',
    code: 'aaa005',
    stock: 305,
  },
];

const mockProducts = mockJson.map(
  ({ title, description, price, thumbnail, code, stock }) =>
    new Product(title, description, price, thumbnail, code, stock)
);

const productManager = new ProductManager();

mockProducts.forEach((product) => productManager.addProduct(product));

productManager.getProducts().then((data) => console.log(data));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
