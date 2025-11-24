// Control the VIEW & MODEL for Products in Pizza Application

import productOperations from "../services/product-operations.js";

async function loadPizzas() {
  const pizzas = await productOperations.loadProducts();

  for (let pizza of pizzas) {
    createPizzaCard(pizza);
  }
}

loadPizzas();


function createPizzaCard(pizza) {
  const outputDiv = document.querySelector("#output");

  const cardDiv = document.createElement("div");
  cardDiv.className =
    "card bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden";
  cardDiv.style = "width: 100%";

  const productImg = document.createElement("img");
  productImg.src = pizza.url;
  productImg.className =
    "card-img-top w-full h-52 object-cover rounded-t-2xl transition-transform duration-300 hover:scale-105";
  productImg.alt = "...";

  cardDiv.appendChild(productImg);

  const cardBodyDiv = document.createElement("div");
  cardBodyDiv.className = "card-body p-4 flex flex-col gap-3";

  cardDiv.appendChild(cardBodyDiv);

  const cardTitle = document.createElement("h5");
  cardTitle.className =
    "card-title text-xl font-semibold text-gray-900 tracking-tight";
  cardTitle.innerText = pizza.name;

  cardBodyDiv.appendChild(cardTitle);

  const productDesc = document.createElement("p");
  productDesc.className =
    "card-text text-gray-600 text-sm leading-relaxed";
  productDesc.innerText = pizza.desc;

  cardBodyDiv.appendChild(productDesc);

  const addToCartBtn = document.createElement("button");
  addToCartBtn.className =
    "btn btn-primary w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer";
  addToCartBtn.innerText = "Add to Cart";

  cardBodyDiv.appendChild(addToCartBtn);

  outputDiv.appendChild(cardDiv);
}


