const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data))
    .catch(error => {
      showError();
      console.log('Something Went Wrong :', error)
    });
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  //testing
  console.log(products);
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.images;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
    <div class="single-product bg-success py-2 m-2">
        <div class="top-section">
          <div>
          <img class="product-image" src=${product.image}></img>
          </div>
          <div class="title">
            <h3 class="h-100 d-inline-block">${product.title}</h3>
          </div>
        </div>
        <h5>Rate: ${product.rating.rate} || ${product.rating.count} Ratings</h5>
        <p>Category: ${product.category}</p>
        <h2>Price: $ ${product.price}</h2>
        <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
        <button onclick="showDetails()" id="details-btn" class="btn btn-danger">Details</button>
    </div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = roundToX(total, 2);

  updateTotal(); // to fix Total
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = Math.round(value);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
  updateTotal(); // to fix total
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = roundToX(grandTotal, 2);
  console.log(getInputValue("price"));
  console.log(getInputValue("total-tax"));
};

updateTotal();

function roundToX(num, X) {
  return +(Math.round(num + "e+" + X) + "e-" + X);
}

function showError(){
  const h3=document.createElement('h3');
  h3.innerText=`Opps.. Something Went Wrong, Please Try later`;
  document.getElementById("error-div").appendChild(h3);
}