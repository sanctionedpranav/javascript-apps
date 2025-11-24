// Product CRUD operations for Pizza Application
/** 
 * C - Create 
 * R - Read
 * U - Update
 * D - Delete
 */

import Product from "../models/product";
import networkCall from "./api-client"

const productOperations = {
  async loadProducts() {
    const pizza = await networkCall();
    const pizzaArray = pizza['Vegetarian'];

    const products = pizzaArray.map(pizza => {
      const currentPizza = new Product(pizza.id, pizza.name, pizza.menu_description, pizza.price, pizza.assets.product_details_page[0].url);

      return currentPizza;
    })
  },
  sortProducts() {

  },
  searchProduct() {

  },
}