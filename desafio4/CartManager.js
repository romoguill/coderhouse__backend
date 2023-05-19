import fs from 'fs';
import Product from './Product.js';
import { URL } from 'url';

export default class CartManager {
  constructor(
    dbPath = new URL('database-Carts.json', import.meta.url),
    initializeDB = false
  ) {
    this.path = dbPath;

    initializeDB && this.#createDB();
  }

  #createDB() {
    fs.promises
      .writeFile(this.path, JSON.stringify([]))
      .then(() => console.log('Database has been initialized'))
      .catch(() => console.log('Error creating the database'));
  }

  #readFile() {
    return fs.promises.readFile(this.path);
  }

  #writeFile(data) {
    return fs.promises.writeFile(this.path, data);
  }

  #getLastId(carts) {
    const ids = carts.map((cart) => cart.id);
    return Math.max(...ids);
  }

  async getCarts(options = {}) {
    const { limit } = options;
    try {
      const data = await this.#readFile();

      return limit === 'undefined'
        ? JSON.parse(data)
        : JSON.parse(data).slice(0, limit);
    } catch (error) {
      throw error;
    }
  }

  async getCartById(id) {
    try {
      const carts = await this.getCarts();
      const cart = carts.find((cart) => cart.id === id);

      if (cart === undefined) {
        throw new Error('No cart found with that id');
      }

      return cart;
    } catch (error) {
      throw error;
    }
  }

  async addCart() {
    try {
      const carts = await this.getCarts();

      const newCartId = this.#getLastId(carts) + 1;
      carts.push({ id: newCartId, products: [] });

      await this.#writeFile(JSON.stringify(carts));
    } catch (error) {
      console.log("Couldn't add cart");
      throw error;
    }
  }
}
