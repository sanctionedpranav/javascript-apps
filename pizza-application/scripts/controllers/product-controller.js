// Control the VIEW & MODEL for Products in Pizza Application

import productOperations from "../services/product-operations.js";


async function loadPizzas() {
  const pizza = await productOperations.loadProducts();

  console.log("Pizza", pizza);
}

loadPizzas();