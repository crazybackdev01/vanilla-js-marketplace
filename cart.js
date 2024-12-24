import { shoppingItems } from "./Data.js";

let sumTotal = 0;
let cartAmountElement = document.getElementById("cartAmount");
let labelElement = document.getElementById("label");
let shoppingCartElement = document.getElementById("shopping-cart");

let basket = JSON.parse(localStorage.getItem("data")) || []; // [ { id: "321esdasda", item: 1}]

const increment = (id) => {
  let clickedItem = document.getElementById(id);
  let search = basket.find((x) => x.id === id);
  let searchInData = shoppingItems.find((x) => x.id === id);
  if (search === undefined) {
    basket.push({
      id: id,
      item: 1,
    });
    clickedItem.textContent = 1;
    sumTotal += searchInData.price;
    labelElement.innerHTML = `<h2>Total Bill: $ ${sumTotal}</h2>`;
  } else {
    search.item += 1;
    sumTotal += searchInData.price;
    labelElement.innerHTML = `<h2>Total Bill: $ ${sumTotal}</h2>`;
    clickedItem.textContent = parseInt(clickedItem.textContent) + 1;
  }
  localStorage.setItem("data", JSON.stringify(basket));
  calculation();
  generateCartItems();
};

const decrement = (id) => {
  let clickedItem = document.getElementById(id);
  let search = basket.find((x) => x.id === id);
  let searchInData = shoppingItems.find((x) => x.id === id);
  if (search === undefined) {
    return;
  } else {
    search.item -= 1; // search.item = 1 - 1 = 0
    if (search.item === 0) {
      basket = basket.filter((x) => x.id != id);
      localStorage.setItem("data", JSON.stringify(basket));
      calculation();
      generateCartItems();
      return;
    }
    sumTotal -= searchInData.price;
    labelElement.innerHTML = `<h2>Total Bill: $ ${sumTotal}</h2>`;
    clickedItem.textContent = parseInt(clickedItem.textContent) - 1; // 0
    localStorage.setItem("data", JSON.stringify(basket));
    calculation();
    generateCartItems();
  }
};

const removeFromCart = (id) => {
  // id = remove-cart-jfhgbvnscs
  //typeof id = string
  const itemId = id.split("-")[2];
  console.log(itemId);
  // let itemId =
  //   let search = basket.find((x) => x.id === itemId);
  //   let searchInData = shoppingItems.find((x) => x.id === itemId);
  // console.log(search); // {id: 'ioytrhndcv', item: 2}
  // console.log(searchInData); // {id: 'ioytrhndcv', name: 'Office Shirt', price: 100, desc: 'Lorem ipsum dolor sit amet consectetur adipisicing.', img: 'images/img-2.jpg'}
  //   sumTotal -= searchInData.price * search.item;
  //   console.log(sumTotal);
  //   labelElement.innerHTML = `<h2>Total Bill: $ ${sumTotal}</h2>`;
  console.log(basket);
  basket = basket.filter((x) => x.id != itemId);
  localStorage.setItem("data", JSON.stringify(basket));
  console.log(basket);
  calculation();
  generateCartItems();
  //   console.log(id);
  //   console.log(basket.find((x) => x.id == itemId));
};

let calculation = () => {
  let sum = 0;
  let localStorageBasket = localStorage.getItem("data")
    ? JSON.parse(localStorage.getItem("data"))
    : [];
  localStorageBasket.forEach((x) => (sum += x.item));
  cartAmountElement.innerHTML = sum === 0 ? "0" : sum.toString();
};

let generateCartItems = () => {
  if (basket.length !== 0) {
    let sum = 0;
    let priceArray = [];
    shoppingCartElement.innerHTML = basket
      .map((x) => {
        const search = shoppingItems.find((y) => y.id === x.id) || {};
        if (search != {}) {
          priceArray.push(search.price * x.item);
        }
        return `
        <div class="cart-item">

        <img width="100" src=${search.img} alt="" />

       <div class="details">

       <div class="title-price-x">
       <h4 class="title-price">
       <p>${search.name}</p>
       <p class="cart-item-price">$ ${search.price}</p>
       </h4>
       <i data-id="remove-cart-${
         search.id
       }" class="bi bi-x-lg remove-from-cart"></i>
       </div>

       <div class="buttons">
       <i data-id=${search.id}  class="increment bi bi-plus-lg"></i>
       <span class="quantity" id=${search.id}>${x.item}</span>
       <i data-id=${search.id} class="decrement bi bi-dash-lg"></i>
       </div>

       <h3 id="cart-item-total-price">$ ${search.price * x.item}</h3>
       </div>

       </div>
       `;
      })
      .join("");

    priceArray.forEach((x) => (sum += x));
    labelElement.innerHTML = `<h2>Total Bill: $ ${sum}</h2>`;
    sumTotal = sum;

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

    document.querySelectorAll(".remove-from-cart").forEach((button) => {
      button.addEventListener("click", (e) => {
        // console.log("removed from cart " + e.target.getAttribute("data-id"));
        let id = e.target.getAttribute("data-id");
        removeFromCart(id);
      });
    });
  } else {
    cartAmountElement.innerHTML = "";
    labelElement.innerHTML = `
    <h2>Cart is Empty</h2>
    <a href="./index.html" />
    <button class="HomeBtn">Back to Home</button>
    </a>
    `;
  }
};

calculation();
generateCartItems();
