const { Product, ProductManager } = require('./index');

const productManager = new ProductManager();

const product1 = new Product(
  'producto prueba',
  'Este es un producto prueba',
  200,
  'Sin imagen',
  'abc123',
  25
);

const product2 = new Product(
  'producto prueba',
  'Este es un producto prueba',
  200,
  'Sin imagen',
  'abc234',
  25
);

test('Product Manager created successfully', () => {
  expect(productManager).toBeInstanceOf(ProductManager);
});

test('getProducts returns empty array initially', () => {
  expect(productManager.getProducts().length).toEqual(0);
});

test('addProduct works by adding a new product and assigning an id', () => {
  productManager.addProduct(product1);
  expect(productManager.getProducts().length).toEqual(1);
  expect(productManager.getProducts()[0].id).not.toBeNull();
});

test('adding the same product should throw error', () => {
  expect(() => productManager.addProduct(product1)).toThrow(
    new Error('Fail to add product. Duplicate code property')
  );
});

test('adding other product should work', () => {
  productManager.addProduct(product2);
  expect(productManager.getProducts().length).toEqual(2);
  expect(productManager.getProducts()[1].id).toEqual(1);
});

test('getProductById returns product or throws error if no product was found with provided id', () => {
  expect(productManager.getProductById(0)).toEqual({
    id: 0,
    ...product1,
  });
  expect(() => productManager.getProductById(40)).toThrow(
    new Error('No product found with that id')
  );
});
