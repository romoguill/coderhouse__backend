import express from 'express';
import Product from './Product.js';
import ProductManager from './ProductManager.js';

const productManager = new ProductManager();

const PORT = 8080;
const app = express();

app.get('/products', async (req, res) => {
  const { limit } = req.query;
  try {
    const products = await productManager.getProducts({
      limit: limit ? parseInt(limit) : limit,
    });
    res.status(200).send({ products });
  } catch (error) {
    res.status(500).send({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
