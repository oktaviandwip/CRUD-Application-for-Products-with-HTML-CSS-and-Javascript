const productList = JSON.parse(localStorage.getItem('product')) || [];

document.querySelector('.input-section').addEventListener('submit', (event) => {
  event.preventDefault();
  submitInput();
  location.href = 'home.html';
});

function submitInput() {
  const nameInput = document.querySelector('.name');
  const descInput = document.querySelector('.description');
  const priceInput = document.querySelector('.price');
  const amountInput = document.querySelector('.amount');

  const inputObject = {
    name: nameInput.value,
    desc: descInput.value,
    price: Number(priceInput.value),
    amount: Number(amountInput.value),
  };

  productList.push(inputObject);

  let html = '';

  productList.forEach((value, index) => {
    const { name, desc, price, amount } = value;

    html += `
    <div>${index + 1}</div>
    <div>
      <button class="js-change-button">Change</button> 
      <button class="js-delete-button">Delete</button>
    </div>
    <div>${name}</div>
    <div>${desc}</div>
    <div>${price}</div>
    <div>${amount}</div>
    <div>${price * amount}</div>
    `;
  });

  localStorage.setItem('product', JSON.stringify(productList));
}

document.querySelector('.js-back-to-home').addEventListener('click', () => {location.href = 'home.html'})