const productList = JSON.parse(localStorage.getItem('product')) || [];

const changeData = JSON.parse(localStorage.getItem('change')) || {}

const nameInput = document.querySelector('.name');
const descInput = document.querySelector('.description');
const priceInput = document.querySelector('.price');
const amountInput = document.querySelector('.amount');

nameInput.value = changeData.name || '';
descInput.value = changeData.desc || '';
priceInput.value = changeData.price || '';
amountInput.value = changeData.amount || '';

document.querySelector('.input-section').addEventListener('submit', (event) => {
  event.preventDefault();
  submitInput();
  window.location.href = 'home.html';
});

function submitInput() {

  const inputObject = {
    name: nameInput.value,
    desc: descInput.value,
    price: Number(priceInput.value),
    amount: Number(amountInput.value),
  };

  const foundItem = productList.find(item => item.name === changeData.name);
  const indexItem = productList.indexOf(foundItem);

  if (indexItem !== -1) {
    productList[indexItem] = inputObject;
    localStorage.setItem('product', JSON.stringify(productList));
  } else {
    alert('Item not found in the product list.');
  }
}

document.querySelector('.js-back-to-home').addEventListener('click', () => {location.href = 'home.html'})





