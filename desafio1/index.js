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
}

module.exports = {
  Product,
  ProductManager,
};

// const product1 = new Product(
//   'producto prueba',
//   'Este es un producto prueba',
//   200,
//   'Sin imagen',
//   'abc123',
//   25
// );

// const productManager = new ProductManager();

// console.log(productManager.getProducts());
// productManager.addProduct('jp;a');
// console.log(productManager.getProducts());
