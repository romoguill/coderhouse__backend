const fs = require('fs');
const path = require('path');

class Product {
  constructor(title, description, price, thumbnail, code, stock) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
  }
}

class ProductManager {
  #products = [];
  #currentId = 0;

  constructor(dbPath = __dirname) {
    this.path = path.join(dbPath, 'database-ProductManager.json');
    this.#createDB();
  }

  #createDB() {
    fs.promises
      .writeFile(this.path, JSON.stringify(this.#products))
      .then(() => console.log('Database has been initialized'))
      .catch(() => console.log('Error creating the database'));
  }

  #readFile() {
    fs.promises.readFile(this.path);
  }

  getProducts() {
    this.#readFile();
    return this.#products;
  }

  addProduct(product) {
    console.log(product instanceof Product);
    if (!(product instanceof Product)) {
      console.log('Fail to add. Arg must be of type Product');
      return;
    }

    if (this.#products.some((p) => product.code === p.code)) {
      console.log('Fail to add product. Duplicate code property');
      return;
    }

    this.#products.push({ id: this.#currentId, ...product });
    this.#currentId++;
  }

  getProductById(id) {
    const product = this.#products.find((product) => product.id === id);
    if (!product) {
      console.log('No product found with that id');
      return;
    }
    return product;
  }
}

module.exports = {
  Product,
  ProductManager,
};

// ------TESTING-------

// Creacion de la instancia
const productManager = new ProductManager();
console.log('Instance created:', productManager);

// Primer llamada a getProducts
console.log('Saved products:', productManager.getProducts());

// Llamada a addProduct
const product1 = new Product(
  'producto prueba',
  'Este es un producto prueba',
  200,
  'Sin imagen',
  'abc123',
  25
);
