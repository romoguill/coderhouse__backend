import fs from 'fs';
import path from 'path';
import Product from './Product.js';
import { URL } from 'url';

export default class ProductManager {
  constructor(
    dbPath = new URL('database-ProductManager.json', import.meta.url),
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

  #getLastId(products) {
    const ids = products.map((product) => product.id);
    return Math.max(...ids);
  }

  #isCodeDuplicate(products, code) {
    return products.find((product) => product.code === code) === undefined
      ? false
      : true;
  }

  async getProducts(options = {}) {
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

  async addProduct(product) {
    if (!(product instanceof Product)) {
      console.log('Fail to add. Arg must be of type Product');
      return;
    }

    try {
      const products = await this.getProducts();

      if (this.#isCodeDuplicate(products, product.code)) {
        throw new Error('Fail to add product. Duplicate code property');
      }

      const newProductId = this.#getLastId(products) + 1;
      products.push({ id: newProductId, ...product });

      await this.#writeFile(JSON.stringify(products));
    } catch (error) {
      console.log("Couldn't add product");
      throw error;
    }
  }

  async getProductById(id) {
    try {
      const products = await this.getProducts();
      const product = products.find((product) => product.id === id);

      if (product === undefined) {
        throw new Error('No product found with that id');
      }

      return product;
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(id, updatedValues) {
    try {
      const products = await this.getProducts();

      const productIndex = products.findIndex((product) => product.id === id);

      if (productIndex < 0) throw new Error('No product found with that id');

      products[productIndex] = { ...products[productIndex], ...updatedValues };
      console.log(productIndex);
      console.log(products);

      await this.#writeFile(JSON.stringify(products));

      return products[productIndex];
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      await this.getProductById(id);

      let products = await this.getProducts();

      products = products.filter((product) => product.id !== id);

      this.#writeFile(JSON.stringify(products));
    } catch (error) {
      throw error;
    }
  }
}
