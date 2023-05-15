import express from 'express';
import ProductManager from '../ProductManager.js';
import Product from '../Product.js';

const router = express.Router();

const productManager = new ProductManager();

router
  .route('/products')

  .get(async (req, res) => {
    const { limit } = req.query;
    try {
      const products = await productManager.getProducts({
        limit: limit ? parseInt(limit) : limit,
      });
      res.status(200).send({ products });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  })

  .post(async (req, res) => {
    try {
      let data = req.body;

      const requiredFields = ['title', 'description', 'price', 'code', 'stock'];

      const isDataValid = requiredFields.every((field) =>
        Object.keys(data).includes(field)
      );

      if (!isDataValid) throw new Error('Invalid product data');

      data = {
        ...data,
        status: data.status ?? true,
        thumbnail: data.thumbnail ?? [],
      };

      const newProduct = new Product(
        data.title,
        data.description,
        data.price,
        data.code,
        data.stock,
        data.status,
        data.thumbnail
      );

      const result = await productManager.addProduct(newProduct);
      res.status(201).json(result);
    } catch (error) {
      if (error.message === 'Invalid product data') {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  });

router
  .route('/products/:id')

  .get(async (req, res) => {
    const id = req.params.id;

    try {
      const product = await productManager.getProductById(parseInt(id));
      res.status(200).send({ product });
    } catch (error) {
      if (error.message === 'No product found with that id') {
        res.status(404).send({ error: error.message });
      } else {
        res.status(500).send({ error: error.message });
      }
    }
  })

  .put(async (req, res) => {
    const id = req.params.id;
    const data = req.body;

    try {
      const updatedProduct = await productManager.updateProduct(
        parseInt(id),
        data
      );
      res.status(202).send(updatedProduct);
    } catch (error) {
      if (error.message === 'No product found with that id') {
        res.status(404).send({ error: error.message });
      } else {
        res.status(500).send({ error: error.message });
      }
    }
  })

  .delete(async (req, res) => {
    const id = req.params.id;

    try {
      await productManager.deleteProduct(parseInt(id));
      res.status(202).send(`Product with id ${id} deleted`);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });

export default router;
