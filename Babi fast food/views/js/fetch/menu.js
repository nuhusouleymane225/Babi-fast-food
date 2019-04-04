localStorage.removeItem('menuURL');
localStorage.removeItem('menuName');
localStorage.removeItem('menuImageURL');
localStorage.removeItem('menuCategory');
localStorage.removeItem('menuDescription');
localStorage.removeItem('menuQuantity');
localStorage.removeItem('menuPrice');
localStorage.removeItem('userId');
localStorage.removeItem('email');

let orderArray = [];
let noDuplicateItems;

const userCart = document.querySelector('.cart-items');
let cartItems;
const cartTotal = document.querySelector('.cartTotal');
const totalQuantity = document.querySelector('.counter');
const toggleCart = document.querySelector('.toggle-cart');
const cartDashboard = document.querySelector('.cart-dashboard');
const pageAlert = document.querySelector('.pageAlert');

const decodeUser = (t) => {
  const token = {};
  token.raw = t;
  token.header = JSON.parse(window.atob(t.split('.')[0]));
  token.payload = JSON.parse(window.atob(t.split('.')[1]));
  return (token);
};

const token = localStorage.getItem('token');
const adminView = document.querySelector('.admin-view');
const nav = document.querySelector('nav');
const guest = document.querySelector('nav.guest');
if (!token) {
  nav.style.display = 'none';
  guest.style.display = 'block';
  adminView.style.display = 'none';
}
if (token) {
  nav.style.display = 'block';
  guest.style.display = 'none';
  const decoded = decodeUser(token);
  const { usertype } = decoded.payload.payload;
  if (usertype !== 'admin') {
    adminView.style.display = 'none';
  }
}

const menuContainer = document.querySelector('.foodContainer');

const getAvailableMenu = () => {
  fetch(`${baseURL}/menu`, {
    method: 'GET',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json'
    }
  })
    .then(response => response.json())
    .then((data) => {
      let message = '';
      message = 'Menu list is empty at this time. Please check again later';
      if (data.message === message) {
        Utils.notification('Menu is empty at this time. Please check again later', 'white', 'red');
        return;
      }

      data.allMenu.forEach((item, index, menuArray) => {
        const newMenu = document.createElement('DIV');
        const menuName = document.createElement('DIV');
        menuName.innerHTML = `${item.menu}`;
        menuName.setAttribute('class', 'menuName');
        const image = document.createElement('IMG');
        image.setAttribute('class', 'menuImage');

        image.src = `${item.imageurl}`;

        const details = document.createElement('DIV');
        const description = document.createElement('DIV');
        const quantityInput = document.createElement('DIV');
        quantityInput.innerHTML = `
          <form class="form${item.id}">
            <input type='number' value='${item.id}' class='menuId' id='menuId${item.id}' hidden>
            <select id='quantity${item.id}' class='input qty${item.id}' max="${item.quantity}">
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
              <option value='6'>6</option>
              <option value='7'>7</option>
              <option value='8'>8</option>
              <option value='9'>9</option>
              <option value='10'>10</option>
            </select>
            <input type='submit' id='submit${item.id}' value='add' class='input send'>
          </form>
        `;
        description.innerHTML = `${item.description}`;
        description.setAttribute('class', 'description');
        const orderAction = document.createElement('DIV');
        orderAction.setAttribute('class', 'orderAction');
        const orderBtn = document.createElement('INPUT');
        orderBtn.setAttribute('class', 'orderBtn');
        orderBtn.setAttribute('readonly', 'readonly');
        orderBtn.value = 'Add to cart';

        const price = document.createElement('DIV');
        price.setAttribute('class', 'price');
        price.innerHTML = `&#8358;${item.price}`;

        orderAction.appendChild(orderBtn);
        orderAction.appendChild(quantityInput);

        details.setAttribute('class', 'details');
        details.appendChild(description);
        details.appendChild(orderAction);

        newMenu.setAttribute('class', 'menu');
        newMenu.setAttribute('id', `menu${item.id}`);

        newMenu.appendChild(menuName);
        newMenu.appendChild(image);
        newMenu.appendChild(details);
        newMenu.appendChild(price);
        menuContainer.appendChild(newMenu);

        quantityInput.setAttribute('class', 'quantityform');

        const quantityFields = document.querySelectorAll('.quantityform');
        const clickedOrderBtn = document.querySelectorAll('.orderBtn');
        const showQuantity = () => {
          quantityFields[index].style.display = 'block';
          clickedOrderBtn[index].style.backgroundColor = 'gray';
        };
        orderBtn.addEventListener('click', showQuantity);

        const orderAmount = () => {
          const orderQty = document.querySelector(`.qty${item.id}`).value;
          const amount = orderQty * item.price;
          price.innerHTML = `&#8358;${amount}`;
          price.style.textDecoration = 'underline';
          price.style.textDecorationColor = '#fff';
          price.style.fontWeight = 'bold';
        };
        document.querySelector(`.qty${item.id}`).addEventListener('change', orderAmount);

        const orderItemsFunction = (eventObject) => {
          eventObject.preventDefault();
          price.style.textDecoration = 'underline';
          price.style.textDecorationStyle = 'double';
          price.style.textDecorationColor = 'lime';

          const newOrder = {};
          newOrder.menuId = document.querySelector(`#menuId${item.id}`).value;
          newOrder.quantity = document.querySelector(`.qty${item.id}`).value;
          newOrder.menuName = `${item.menu}`;
          newOrder.imageURL = `${item.imageurl}`;
          newOrder.price = `${item.price}`;
          newOrder.amount = `${item.price * newOrder.quantity}`;

          if (!token) {
            Utils.notification('Please Signup/Login to continue', 'white', 'red');
            setTimeout(() => {
              location.assign('menu.html');
            }, 4000);
            return;
          }

          if (orderArray.length > 0) {
            orderArray.forEach((orderObj, count, userOrderArr) => {
              if (Number(orderObj.menuId) !== Number(newOrder.menuId)) {
                orderArray.push(newOrder);
                return;
              }
              if (Number(orderObj.menuId) === Number(newOrder.menuId)) {
                orderArray.splice(count, 1, newOrder);
              }
            });
            noDuplicateItems = orderArray.filter((order, orderIndex, arr) => orderIndex === arr.indexOf(order));
            localStorage.setItem('orderItems', JSON.stringify(noDuplicateItems));
          }
          orderArray.push(newOrder);
          noDuplicateItems = orderArray.filter((order, orderIndex, arr) => orderIndex === arr.indexOf(order));

          localStorage.setItem('orderItems', JSON.stringify(noDuplicateItems));

          pageAlert.style.display = 'none';
          toggleCart.style.display = 'block';
          menuContainer.style.marginTop = '60px';

          cartItems = JSON.parse(localStorage.getItem('orderItems'));
          if (cartItems) {
            userCart.innerHTML = '';
            let totalAmount = 0;
            let quantitySum = 0;
            const newOrderDiv = document.createElement('DIV');
            newOrderDiv.setAttribute('class', 'newOrderDiv');
            const orderImageDiv = document.createElement('IMG');
            orderImageDiv.setAttribute('class', 'orderImageDiv');
            const otherDetails = document.createElement('DIV');
            otherDetails.setAttribute('class', 'otherDetails');

            cartItems.forEach((cartItem, i, arr) => {
              orderImageDiv.src = cartItem.imageURL;
              otherDetails.innerHTML = `
                <span class="delete">&#10006; <span class="tool-tip">delete</span></span>
                <b>Meal:</b> ${cartItem.menuName} <br>
                <b>Amount:</b> <span class="amount"> ${cartItem.amount} </span><br>
                <b>Quantity:</b>
                <select class='cartQuantity' id=cartQuantity${i}>
                  <option selected value=${cartItem.quantity}>${cartItem.quantity}</option>
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                  <option value='6'>6</option>
                  <option value='7'>7</option>
                  <option value='8'>8</option>
                  <option value='9'>9</option>
                  <option value='10'>10</option>
                </select>
              `;
              newOrderDiv.appendChild(orderImageDiv);
              newOrderDiv.appendChild(otherDetails);
              userCart.innerHTML += newOrderDiv.outerHTML;
              totalAmount += Number(cartItem.amount);
              quantitySum += Number(cartItem.quantity);
            });
            cartTotal.innerHTML = `TOTAL = &#8358;${totalAmount}`;
            totalQuantity.innerHTML = quantitySum;

            const cartQuantity = document.querySelectorAll('.cartQuantity');
            const itemsAmount = document.querySelectorAll('.amount');
            const updateOrderCart = () => {
              totalAmount = 0;
              quantitySum = 0;
              for (let i = 0; i < cartItems.length; i++) {
                noDuplicateItems[i].quantity = cartQuantity[i].value;
                noDuplicateItems[i].amount = cartQuantity[i].value * noDuplicateItems[i].price;
                localStorage.setItem('orderItems', JSON.stringify(noDuplicateItems));
                quantitySum += Number(noDuplicateItems[i].quantity);
                totalAmount += Number(noDuplicateItems[i].amount);
                itemsAmount[i].innerHTML = noDuplicateItems[i].amount;
              }
              totalQuantity.innerHTML = quantitySum;
              cartTotal.innerHTML = `TOTAL = &#8358;${totalAmount}`;
            };
            for (let j = 0; j < cartItems.length; j++) {
              cartQuantity[j].addEventListener('change', updateOrderCart);
            }

            const orderDeleteButtons = document.querySelectorAll('.delete');
            orderDeleteButtons.forEach((btn, i, btnArr) => {
              const deleteOrder = () => {
                userCart.removeChild(userCart.childNodes[i]);
                quantitySum -= Number(noDuplicateItems[i].quantity);
                totalAmount -= Number(noDuplicateItems[i].amount);
                noDuplicateItems.splice(i, 1);
                localStorage.setItem('orderItems', JSON.stringify(noDuplicateItems));
                totalQuantity.innerHTML = quantitySum;
                cartTotal.innerHTML = `TOTAL = &#8358;${totalAmount}`;
                console.log('USER CART CHILDNODES', userCart.childNodes[i], 'INDEX INSIDE', i);
              };
              console.log('USER CART CHILDNODES', userCart.childNodes[i], 'INDEX', i);
              btn.addEventListener('click', deleteOrder);
            });
          }
        };
        document.querySelector(`#submit${item.id}`).addEventListener('click', orderItemsFunction);

        // Place Order Starts Here

        const placeOrder = (event) => {
          event.preventDefault();

          const decoded = decodeUser(token);

          const userId = decoded.payload.payload.id;
          const location = document.querySelector('.deliver-to').value.trim();
          const orderItems = JSON.parse(localStorage.getItem('orderItems'));          

          if (index === 0) {
            fetch(`${baseURL}/orders`, {
              method: 'POST',
              headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-type': 'application/json',
                Authorization: token
              },
              body: JSON.stringify({
                userId, orderItems, location
              })
            })
              .then(feedback => feedback.json())
              .then((response) => {
                message = 'Invalid location. Input a string character of length 5 to 100 (alphanumeric, whitespace, comma, fullstop, and hypen are allowed)';
                if (response.message === message) {
                  Utils.notification('Invalid location. Input 5 to 100 characters. Remove all special characters', 'white', 'red');
                  return;
                }

                message = 'Invalid location length. Input a string character of length 5 to 100 (alphanumeric, whitespace, comma, fullstop, and hypen are allowed)';
                if (response.message === message) {
                  Utils.notification('Invalid location. Input 5 to 100 characters. Remove all special characters', 'white', 'red');
                  return;
                }

                message = 'Invalid location character. Input a string character of length 5 to 100 (alphanumeric, whitespace, comma, fullstop, and hypen are allowed)';
                if (response.message === message) {
                  Utils.notification('Invalid location. Input 5 to 100 characters. Remove all special characters', 'white', 'red');
                  return;
                }

                message = 'menuId is undefined. Please input menuId as a positive integer greater than zero';
                if (response.message === message) {
                  Utils.notification(response.message, 'white', 'red');
                  return;
                }

                message = 'menuId is empty. Please input menuId as a positive integer greater than zero';
                if (response.message === message) {
                  Utils.notification(response.message, 'white', 'red');
                  return;
                }

                message = 'Invalid menuId detected. It should be a positive integer greater than zero';
                if (response.message === message) {
                  Utils.notification(response.message, 'white', 'red');
                  return;
                }

                message = `menuId '${item.id}' is out of range. It should be less than millions`;
                if (response.message === message) {
                  Utils.notification(response.message, 'white', 'red');
                  return;
                }

                message = 'Invalid quantity detected. It should be a positive integer greater than zero';
                if (response.message === message) {
                  Utils.notification(response.message, 'white', 'red');
                  return;
                }

                message = `Sorry the menu with 'id: ${item.id}' does not exist`;
                if (response.message === message) {
                  Utils.notification(response.message, 'white', 'red');
                  return;
                }

                message = `Sorry, '${item.menu} (menuId: ${item.id})' is currently out of stock. Check again later`;
                if (response.message === message) {
                  Utils.notification(response.message, 'white', 'red');
                  return;
                }

                message = `Maximum quantity of '${item.menu} (menuId: ${item.id})' you can order at this time is ${item.quantity}`;
                if (response.message === message) {
                  Utils.notification(response.message, 'white', 'red');
                  return;
                }

                message = 'Order placed successfully';
                if (response.message === message) {
                  Utils.notification('ORDER PLACED SUCCESSFULLY', 'white', 'green');
                  cartDashboard.style.display = 'none';
                  toggleCart.style.display = 'none';
                  menuContainer.style.marginTop = '25px';
                  localStorage.removeItem('orderItems');
                  orderArray = [];
                }
              })
              .catch((error) => {
                console.log('Catch place order error', error);
              });
          }
        };

        document.querySelector('.order-form').addEventListener('submit', placeOrder);
        // Place Order Ends Here
      });
      return menuContainer;
    })
    .catch((error) => {
      console.log('Error from catch', error);
    });
};


const scrollPage = () => {
  const scrollTopBtn = document.querySelector('.scroll-top');

  const selectSection = (event) => {
    if (event.target === scrollTopBtn) {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  };

  scrollTopBtn.addEventListener('click', selectSection);
};

getAvailableMenu();
scrollPage();
