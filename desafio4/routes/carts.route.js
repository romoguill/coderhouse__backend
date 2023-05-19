import express from 'express';
import CartManager from '../CartManager.js';
import ProductManager from '../ProductManager.js';

const router = express.Router();

const cartManager = new CartManager();
const productManager = new ProductManager();

router
  .route('/carts')
  .get(async (req, res) => {
    try {
      const carts = await cartManager.getCarts();
      res.status(200).json({ carts });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })

  .post(async (req, res) => {
    try {
      await cartManager.addCart();
      res.status(200).json({ message: 'Cart created successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

router
  .route('/carts/:id')
  .get(async (req, res) => {
    try {
      const { id } = req.params;
      const cart = await cartManager.getCartById(parseInt(id));
      res.status(200).json({ cart });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })
  .put((req, res) => {})
  .delete((req, res) => {});

router.route('/carts/:cid/product/:pid').post(async (req, res) => {
  try {
    const { cid, pid } = req.params;

    const carts = await cartManager.getCartById(parseInt(cid));

    const product = await productManager.getProductById(parseInt(pid));

    await cartManager.addProductToCart(parseInt(cid), parseInt(pid));

    res.status(200).json({ message: `Product ${pid} added to cart ${cid}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
