import { shoppingItems } from "./Data.js";

let shop = document.getElementById("shop");
let basket = JSON.parse(localStorage.getItem("data")) || []; // [ { id: "321esdasda", item: 1}]
let cartAmountElement = document.getElementById("cartAmount");

const increment = (id) => {
  let clickedItem = document.getElementById(id);
  let search = basket.find((x) => x.id === id);
  if (search === undefined) {
    basket.push({
      id: id,
      item: 1,
    });
    clickedItem.textContent = 1;
  } else {
    search.item += 1;
    clickedItem.textContent = parseInt(clickedItem.textContent) + 1;
  }
  localStorage.setItem("data", JSON.stringify(basket));
  calculation();
};

const decrement = (id) => {
  let clickedItem = document.getElementById(id);
  let search = basket.find((x) => x.id === id);
  if (search === undefined) {
    return;
  } else {
    search.item -= 1; // search.item = 1 - 1 = 0
    if (search.item === 0) {
      basket = basket.filter((x) => x.id != id);
    }
    clickedItem.textContent = parseInt(clickedItem.textContent) - 1; // 0
    localStorage.setItem("data", JSON.stringify(basket));
    calculation();
  }
};

let calculation = () => {
  let sum = 0;
  let localStorageBasket = localStorage.getItem("data")
    ? JSON.parse(localStorage.getItem("data"))
    : [];
  localStorageBasket.forEach((x) => (sum += x.item));
  cartAmountElement.textContent = sum.toString();
};

const generateShop = () => {
  shop.innerHTML = shoppingItems
    .map((item) => {
      let searchItem = basket.find((x) => x.id === item.id);
      if (searchItem === undefined) {
        searchItem = { item: 0 };
      }
      return `
            <div id="product-id-${item.id}" class="item">
               <img width="220" src=${item.img} alt="product-image" />
               <div class="details">
                 <h3>${item.name}</h3>
                 <p>${item.desc}</p>
                 <div class="price-quantity">
                   <h3>$${item.price}</h3>
                   <div class="buttons">
                     <i data-id=${item.id}  class="increment bi bi-plus-lg"></i>
                     <span class="quantity" id=${item.id}>${searchItem.item}</span>
                     <!-- <div class="quantity">0</div> -->
                     <i data-id=${item.id} class="decrement bi bi-dash-lg"></i>
                   </div>
                 </div>
               </div>
             </div>
           `;
    })
    .join("");

  document.querySelectorAll(".increment").forEach((button) => {
    button.addEventListener("click", (e) => {
      let id = e.target.getAttribute("data-id");
      increment(id);
    });
  });

  document.querySelectorAll(".decrement").forEach((button) => {
    button.addEventListener("click", (e) => {
      let id = e.target.getAttribute("data-id");
      decrement(id);
    });
  });

  calculation();
};

generateShop();
