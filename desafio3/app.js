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

app.get('/products/:pid', async (req, res) => {
  const id = req.params.pid;
  console.log(parseInt(id));
  try {
    const product = await productManager.getProductById(parseInt(id));
    res.status(200).send({ product });
  } catch (error) {
    if (error.message === 'No product found with that id') {
      res.status(404).send({ error: error.message });
    } else {
      res.status(500).send({ error: 'Internal server error' });
    }
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
