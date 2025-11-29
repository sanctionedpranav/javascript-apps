// Product CRUD operations for Pizza Application
/** 
 * C - Create 
 * R - Read
 * U - Update
 * D - Delete
 */
import Product from "../models/product.js";
import networkCall from "./api-client.js";

const productOperations = {
  products: [],
  async loadProducts() {
    const pizza = await networkCall();
    const pizzaArray = pizza['Vegetarian'];

    const allProductArray = pizzaArray.map(pizza => {
      const currentPizza = new Product(pizza.id, pizza.name, pizza.menu_description, pizza.price, pizza.assets.product_details_page[0].url);

      return currentPizza;
    })

    this.products = allProductArray;

    console.log("this.products");
    console.log(this.products);
    

    return allProductArray;
  },
  searchProduct(pizzaId) {
    const product = this.products.find(currentProduct => currentProduct.id == pizzaId);
    console.log("product found", product);

    product.isAddedToCart = true;
    console.log("Array", this.products);

  },
  getCartProducts() {
    return this.products.filter(currentProduct => currentProduct.isAddedToCart == true);
  },

}

export default productOperations;