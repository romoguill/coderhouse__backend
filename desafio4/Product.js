export default class Product {
  constructor(
    title,
    description,
    price,
    code,
    stock,
    status = true,
    thumbnail = []
  ) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
    this.status = status;
  }
}
