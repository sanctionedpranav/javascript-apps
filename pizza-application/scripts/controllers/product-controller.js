// Control the VIEW & MODEL for Products in Pizza Application

import productOperations from "../services/product-operations.js";

async function loadPizzas() {
  const pizzas = await productOperations.loadProducts();

  for (let pizza of pizzas) {
    createPizzaCard(pizza);
  }
}

loadPizzas();

function addToCart() {
  const currentBtn = this;
  const pizzaId = currentBtn.getAttribute("product-id");


  productOperations.searchProduct(pizzaId);
  printInCart();
}

function printInCart() {
  const cartProducts = productOperations.getCartProducts();
  const cartCount = productOperations.getCartProducts().length;

  const cartCountSpan = document.querySelector("#count");
  cartCountSpan.innerText = cartCount;

  const cartDiv = document.querySelector("#cart-items");
  const totalAmount = document.querySelector("#total-amount");
  let total = 0;

  cartDiv.innerHTML = "";

  for (let product of cartProducts) {
    const li = document.createElement("li");

    li.className =
      "flex justify-between items-center py-2 px-3 border-b border-gray-200 text-gray-700 shadow-sm";

    const nameSpan = document.createElement("span");
    nameSpan.innerText = product.name;

    const priceSpan = document.createElement("span");
    priceSpan.innerText = "$" + product.price;
    priceSpan.className = "font-semibold text-gray-800";

    li.appendChild(nameSpan);
    li.appendChild(priceSpan);

    total += Number(product.price);
    totalAmount.innerText = "$" + total.toFixed(2);


    cartDiv.appendChild(li);
  }
}


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
  addToCartBtn.setAttribute("product-id", pizza.id);
  addToCartBtn.addEventListener("click", (addToCart));
  addToCartBtn.className =
    "btn btn-primary w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer";
  addToCartBtn.innerText = "Add to Cart";

  cardBodyDiv.appendChild(addToCartBtn);

  outputDiv.appendChild(cardDiv);
}


