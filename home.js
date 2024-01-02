let productList = JSON.parse(localStorage.getItem('product')) || []

renderList(productList)

function renderList(array) {
  let html = ''
  let totalAmount = 0
  let totalPrice = 0

  array.forEach((value, index) => {
    const { name, desc, price, amount } = value;

    html += `
    <div class="grid-product">${index + 1}</div>
    <div class="grid-product">
      <button class="js-change-button change-button">Change</button> &nbsp<strong>|</strong> &nbsp <button class="js-delete-button delete-button">Delete</button>
    </div>
    <div class="grid-product">${name}</div>
    <div class="grid-product">${desc}</div>
    <div class="grid-product">${price ? price.toLocaleString() : null}</div>
    <div class="grid-product">${amount ? amount.toLocaleString() : null}</div>
    <div class="grid-product">${(price * amount).toLocaleString()}</div>
    `
    totalAmount += amount
    totalPrice += price * amount
  })

  document.querySelector('.js-product-list').innerHTML = html
  
  if (html) {
    document.querySelector('.js-total').innerHTML = `
    <div class="grid-reset grid-total">
      <button class="js-reset-button reset-button">Reset All</button>
    </div>
    <div class="text-total grid-total">Total</div>
    <div class="grid-total">${totalAmount.toLocaleString()}</div>
    <div class="grid-total">${totalPrice.toLocaleString()}</div>
  `
  } else {document.querySelector('.js-total').innerHTML = ''}

  document.querySelectorAll('.js-delete-button').forEach((deleteButton, index) => {
    deleteButton.addEventListener('click', () => {
      productList.splice(index, 1);
      renderList(productList)
      localStorage.setItem('product', JSON.stringify(productList))
    })
  })

  document.querySelectorAll('.js-change-button').forEach((changeButton, index) => {
    changeButton.addEventListener('click', () => {
      localStorage.setItem('change', JSON.stringify(productList[index]))
      window.location.href = 'change.html';
    })
  })
}

//Add Product
const addElement = document.querySelector('.js-add-button');
addElement.addEventListener('click', () => {
  location.href = 'add.html'
})

//Find Product
const inputElement = document.querySelector('.js-input-name');
const findElement = document.querySelector('.js-find-product');

function findProduct() {
  const inputValue = inputElement.value.toLowerCase();

  if (inputValue) {
    let foundItems = productList.filter(item => item.name.toLowerCase().includes(inputValue));
    renderList(foundItems);
  } else {renderList(productList)};
}

findElement.addEventListener('click', () => {findProduct()});

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {findProduct()}})

//Reset All
document.querySelector('.js-reset-button').addEventListener('click', () => {
  document.querySelector('.js-product-list').innerHTML = ''
  document.querySelector('.js-total').innerHTML = ''
  productList = []
  localStorage.setItem('product', JSON.stringify(productList))
})