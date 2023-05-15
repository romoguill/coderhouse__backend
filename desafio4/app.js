import express from 'express';

import cartsRouter from './routes/carts.route.js';
import productsRouter from './routes/products.route.js';

const PORT = 8080;
const app = express();

// GENERAL MIDDLEWARE
app.use(express.json());

// ROUTES MIDDLEWARE
app.use(productsRouter);
app.use(cartsRouter);

app.all('*', (req, res) => {
  res.status(404).send('RESOURCE NOT FOUND');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
