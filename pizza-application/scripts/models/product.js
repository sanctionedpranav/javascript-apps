// Product model for Pizza Application

class Product {
  constructor(id, name, desc, price, url) {
    this.id = id;
    this.name = name;
    this.desc = desc;
    this.price = price;
    this.url = url;
    this.isAddedToCart = false;
  }
}

export default Product;