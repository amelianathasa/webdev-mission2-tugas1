//Ambil semua data buku
const booksElement = document.querySelector(".books");
const cartBooksElement = document.querySelector(".cart-list");
const totalPurchaseElement = document.querySelector(".cart-total");
const strukElement = document.querySelector(".modal-body");

function renderBooks() {
  books.forEach((book) => {
    booksElement.innerHTML += `
    <div class="card book-item" id="books-${book.id}">
            <img src="${book.imgSrc}" class="card-img-top mt-4" alt="${book.name}" />
            <div class="card-body center">
              <h5 class="card-book-title">${book.name}</h5>
              <h6 class="card-book-price">Rp. ${book.price.toFixed(3)}</h6>
              <div class="card-book-quantity mb-3 mt-3 center">
                <button class="btn btn-primary mb-2 button-minus" data-index="${book.id}">-</button>
                <input type="text" class="number" id="quantity-${book.id}" value="1" />
                <button class="btn btn-primary mb-2 button-plus" data-index="${book.id}">+</button>
              </div>
              <div class="add-to-cart center">
                <a href="#" type="button" class="btn btn-success myButton" onclick="addBookToCart(${book.id})">Add Item</a>
              </div>
            </div>
          </div>
    `;
  });
}
renderBooks();

let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateBookCart();
// let cart = [];

//Untuk menggunakan increment quantity
document.querySelectorAll(".button-plus").forEach((button) => {
  button.addEventListener("click", function () {
    const index = this.getAttribute("data-index");
    const quantityElement = document.getElementById(`quantity-${index}`);
    valueCount = parseInt(quantityElement.value);
    valueCount++;
    quantityElement.value = valueCount;
    // updateBookQuantityInCart(index, valueCount);
  });
});

//Untuk menggunakan decrement quantity
document.querySelectorAll(".button-minus").forEach((button) => {
  button.addEventListener("click", function () {
    const index = this.getAttribute("data-index");
    const quantityElement = document.getElementById(`quantity-${index}`);
    valueCount = parseInt(quantityElement.value);
    if (valueCount > 1) {
      valueCount--;
      quantityElement.value = valueCount;
      // updateBookQuantityInCart(index, valueCount);
    }
  });
});

function addBookToCart(id) {
  const quantityElement = document.getElementById(`quantity-${id}`);
  let valueCount = parseInt(quantityElement.value);
  const existingCartItem = cart.find((item) => item.id === id);
  if (existingCartItem) {
    existingCartItem.quantity += valueCount;
  } else {
    const item = books.find((book) => book.id === id);
    cart.push({
      ...item,
      quantity: valueCount,
    });
  }
  updateBookCart();
  quantityElement.value = 1;
}

function updateBookCart() {
  renderCart();
  totalPurchase();
  viewStruk();

  localStorage.setItem("CART", JSON.stringify(cart));
}

function totalPurchase() {
  let purchasePrice = 0,
    tax = 0,
    pay = 0;

  cart.forEach((item) => {
    purchasePrice += item.price * item.quantity;
    tax = purchasePrice * (11 / 100);
  });

  pay = purchasePrice + tax;
  totalPurchaseElement.innerHTML = `
  <table class="table" style="width: 100%">
  <tr class="center">
    <td style="width: 10%"></td>
    <td style="width: 30%"></td>
    <th style="width: 30%">Total Pembelian</th>
    <td style="width: 30%">Rp ${purchasePrice.toFixed(3)}</td>
  </tr>
  <tr class="center">
    <td style="width: 10%"></td>
    <td style="width: 30%"></td>
    <th style="width: 30%">Pajak 11%</th>
    <td style="width: 30%">Rp ${tax.toFixed(3)}</td>
  </tr>
  <tr class="center">
    <td style="width: 10%"></td>
    <td style="width: 30%"></td>
    <th style="width: 30%">Total Bayar</th>
    <td style="width: 30%">Rp ${pay.toFixed(3)}</td>
  </tr>
</table>`;
}

function renderCart() {
  cartBooksElement.innerHTML = "";
  cartBooksElement.innerHTML += `<table class="table" style="width: 100%">
  <tr class="center">
    <th style="width: 10%">No</th>
    <th style="width: 30%">Cover</th>
    <th style="width: 30%">Item</th>
    <th style="width: 30%">Total</th>
  </tr>`;

  let no = 1;
  let totalPrice = 0;
  cart.forEach((item) => {
    totalPrice = item.price * item.quantity;
    cartBooksElement.innerHTML += `
    <table class="table" style="width: 100%">
    <tr class="center">
      <td style="width: 10%" >${no++}</td>
      <td style="width: 30%"><img src="${item.imgSrc}" alt="${item.name}" class="img-cart " /></td>
      <td style="width: 30%" >${item.name} <br />
      <small> Rp ${item.price.toFixed(3)} x ${item.quantity} </small></td>
      <td style="width: 30%" >Rp ${totalPrice.toFixed(3)}</td>
    </tr>
  </table>
   `;
  });
}

function viewStruk() {
  let totalPrice = 0,
    purchasePrice = 0,
    tax = 0,
    pay = 0;

  let strukHTML = `
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-4"></div>
        <div class="col-md-4"><h5>BOOK STORE</h5></div>
        <div class="col-md-4"></div>
      </div>
      <div class="row">
        <div class="col-md-4"></div>
        <div class="col-md-4">Jl. Kebon Kopi 17</div>
        <div class="col-md-4"></div>
      </div>
      <div class="row mt-4">
        <div class="col-md-3">Order #1</div>
        <div class="col-md-5"></div>
        <div class="col-md-4" id="tanggalwaktu"></div>
      </div>
      <div class="row mt-3"><hr /></div>
    `;

  cart.forEach((item, index) => {
    const totalPrice = item.price * item.quantity;

    strukHTML += `
      <div class="row mt-1">
        <div class="col-md-5">${item.name}</div>
        <div class="col-md-4" >Rp ${item.price.toFixed(3)} x${item.quantity}</div>
        <div class="col-md-3">Rp ${totalPrice.toFixed(3)}</div>
      </div>
    `;

    purchasePrice += item.price * item.quantity;
    tax = purchasePrice * (11 / 100);
  });

  pay = purchasePrice + tax;
  strukHTML += `
    <div class="row mt-3"><hr /></div>
    <div class="row mt-1">
      <div class="col-md-9">Subtotal</div>
      <div class="col-md-3">Rp ${purchasePrice.toFixed(3)}</div>
    </div>
    <div class="row mt-2">
      <div class="col-md-9">Pajak 11%</div>
      <div class="col-md-3">Rp ${tax.toFixed(3)}</div>
    </div>
    <div class="row mt-2">
      <div class="col-md-9"><b>TOTAL</b></div>
      <div class="col-md-3"><b>Rp ${pay.toFixed(3)}</b></div>
    </div>
  </div>`;

  strukElement.innerHTML = strukHTML;

  var dt = new Date();
  document.getElementById("tanggalwaktu").innerHTML = ("0" + dt.getDate()).slice(-2) + "." + ("0" + (dt.getMonth() + 1)).slice(-2) + "." + dt.getFullYear() + " " + ("0" + dt.getHours()).slice(-2) + ":" + ("0" + dt.getMinutes()).slice(-2);

  const resetButton = document.getElementById("reset");

  // Menambahkan event listener saat tombol diklik
  resetButton.addEventListener("click", function () {
    // Menghapus seluruh isi Local Storage
    localStorage.clear();
    location.reload();
  });
}
