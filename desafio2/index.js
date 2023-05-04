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
  constructor(dbPath = __dirname) {
    this.path = path.join(dbPath, 'database-ProductManager.json');
    this.#createDB();
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
    return Math.max(ids);
  }

  #isCodeDuplicate(products, code) {
    return products.find((product) => product.code === code) === undefined
      ? false
      : true;
  }

  async getProducts() {
    try {
      const data = await this.#readFile();
      return JSON.parse(data);
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
      products[productIndex] = { ...products[productIndex], ...updatedValues };

      this.#writeFile(JSON.parse(products));

      return products[productIndex];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = {
  Product,
  ProductManager,
};

// ------TESTING-------

const test = async () => {
  // Creacion de la instancia
  const productManager = new ProductManager();
  console.log('Instance created:', productManager);

  // Primer llamada a getProducts
  try {
    const products = await productManager.getProducts();
    console.log('Stored products', products);
  } catch (error) {
    console.log('Error in getting products', error);
  }

  // Llamada a addProduct
  const product1 = new Product(
    'producto prueba',
    'Este es un producto prueba',
    200,
    'Sin imagen',
    'abc123',
    25
  );

  try {
    await productManager.addProduct(product1);
    console.log('New product added');

    const products = await productManager.getProducts();
    console.log('Stored products', products);
  } catch (error) {
    console.log('Error adding products', error);
  }

  // LLamada a getProductById
  try {
    const product1 = await productManager.getProductById(1);
    console.log('Product found:', product1);

    // Esta tiene que fallar
    const product2 = await productManager.getProductById(2);
    console.log('Product found:', product2);
  } catch (error) {
    console.log('Error in getting product by id =', 2);
  }

  try {
    const updatedValues = {
      title: 'producto prueba MODIFICADO',
      price: '50',
    };

    const updatedProduct = await productManager.updateProduct(1, updatedValues);
    console.log('Product Modified', updatedProduct);

    const products = await productManager.getProducts();
    console.log('Stored products', products);
  } catch (error) {
    console.log('Error in updating product', error);
  }
};

test();
