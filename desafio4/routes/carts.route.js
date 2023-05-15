import express from 'express';

const router = express.Router();

router
  .route('/carts')
  .get((req, res) => {})

  .post((req, res) => {});

router
  .route('/carts/:id')
  .get((req, res) => {})
  .put((req, res) => {})
  .delete((req, res) => {});

export default router;
