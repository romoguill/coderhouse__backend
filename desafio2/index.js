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

  getProducts() {
    return this.#products;
  }

  addProduct(product) {
    console.log(product instanceof Product);
    if (!(product instanceof Product)) {
      console.log('a');
      throw new Error('Fail to add. Arg must be of type Product');
    }

    if (this.#products.some((p) => product.code === p.code)) {
      throw new Error('Fail to add product. Duplicate code property');
    }

    this.#products.push({ id: this.#currentId, ...product });
    this.#currentId++;
  }

  getProductById(id) {
    const product = this.#products.find((product) => product.id === id);
    if (!product) {
      throw new Error('No product found with that id');
    }
    return product;
  }
}

module.exports = {
  Product,
  ProductManager,
};
