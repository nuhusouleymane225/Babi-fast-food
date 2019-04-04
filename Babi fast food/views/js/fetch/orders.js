localStorage.removeItem('menuURL');
localStorage.removeItem('menuName');
localStorage.removeItem('menuImageURL');
localStorage.removeItem('menuCategory');
localStorage.removeItem('menuDescription');
localStorage.removeItem('menuQuantity');
localStorage.removeItem('menuPrice');
localStorage.removeItem('userId');
localStorage.removeItem('email');

const decodeUser = (t) => {
  const token = {};
  token.raw = t;
  token.header = JSON.parse(window.atob(t.split('.')[0]));
  token.payload = JSON.parse(window.atob(t.split('.')[1]));
  return (token);
};
const token = localStorage.getItem('token');

const adminView = document.querySelector('.user-front');
if (!token) {
  adminView.style.display = 'none';
  location.assign('menu.html');
}

const decoded = decodeUser(token);
const { usertype } = decoded.payload.payload;
if (usertype !== 'admin') {
  adminView.style.display = 'none';
}

const userId = decoded.payload.payload.id;
const { email } = decoded.payload.payload;

const userOrders = () => {
  fetch(`${baseURL}/users/${userId}/orders`, {
    method: 'GET',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
      Authorization: token
    }
  })
    .then(data => data.json())
    .then((response) => {
      const allOrdersTable = document.querySelector('.all-orders-table');

      let message = '';
      message = 'Your order history is empty. Visit menu page and start placing your orders';
      if (response.message === message) {
        Utils.notification('You have no order history at this time. Start placing orders now', 'white', 'red');
        setTimeout(() => {
          location.assign('menu.html');
        }, 6100);
        return;
      }

      message = `${email.split('@')[0]} order history is empty at this time. Please check again later`;
      if (response.message === message) {
        Utils.notification('You have no order history at this time. Start placing orders now', 'white', 'red');
        setTimeout(() => {
          location.assign('menu.html');
        }, 6100);
        return;
      }

      response.orderHistory.forEach((order, index, orderArray) => {
        const eachOrderDiv = document.createElement('DIV');
        eachOrderDiv.setAttribute('class', 'items');
        const eachOrderTable = document.createElement('TABLE');

        order.orderitems.forEach((item, count, itemArray) => {
          const itemRow = document.createElement('TR');
          itemRow.innerHTML = `
            <td>
              <strong>Meal:</strong> &nbsp; &nbsp; &nbsp; &nbsp; ${item.menu} <br>
              <strong>Quantity:</strong> &nbsp;${item.quantity} <br>
              <strong>Amount:</strong> &nbsp; &#8358; ${item.amount}
            </td>
          `;
          eachOrderTable.appendChild(itemRow);
        });
        eachOrderDiv.appendChild(eachOrderTable);

        const newTableRow = document.createElement('TR');
        newTableRow.innerHTML = `
          <td>${order.id}</td>
          <td>
            ${new Date(order.orderdate).toString().split(' GMT')[0]}
          </td>
          <td>${order.phone}</td>
          <td>${order.location}</td>
          <td height="150" width="350">${eachOrderDiv.outerHTML}</td>
          <td>&#8358;${order.total}</td>
          <td class="status currentStatus" id="currentStatus${order.id}">
            ${order.status}
          </td>
        `;
        allOrdersTable.appendChild(newTableRow);

        newTableRow.setAttribute('id', `row${order.id}`);
        const targetRow = document.querySelector(`#row${order.id}`);
        const status = document.querySelector(`#currentStatus${order.id}`).innerText;

        const newOrdersBtn = document.querySelector('#newOrders');
        const newOrders = () => {
          if (status === 'New' && targetRow.style.display === 'none') {
            targetRow.style.display = 'table-row';
          }
          if (status !== 'New') {
            targetRow.style.display = 'none';
          }
        };
        newOrdersBtn.addEventListener('click', newOrders);

        const processingOrdersBtn = document.querySelector('#processingOrders');
        const processingOrders = () => {
          if (status === 'Processing' && targetRow.style.display === 'none') {
            targetRow.style.display = 'table-row';
          }
          if (status !== 'Processing') {
            targetRow.style.display = 'none';
          }
        };
        processingOrdersBtn.addEventListener('click', processingOrders);

        const cancelledOrdersBtn = document.querySelector('#cancelledOrders');
        const cancelledOrders = () => {
          if (status === 'Cancelled' && targetRow.style.display === 'none') {
            targetRow.style.display = 'table-row';
          }
          if (status !== 'Cancelled') {
            targetRow.style.display = 'none';
          }
        };
        cancelledOrdersBtn.addEventListener('click', cancelledOrders);

        const completedOrdersBtn = document.querySelector('#completedOrders');
        const completedOrders = () => {
          if (status === 'Completed' && targetRow.style.display === 'none') {
            targetRow.style.display = 'table-row';
          }
          if (status !== 'Completed') {
            targetRow.style.display = 'none';
          }
        };
        completedOrdersBtn.addEventListener('click', completedOrders);

        const allOrdersBtn = document.querySelector('#allOrders');
        const allOrders = () => {
          if (status) {
            targetRow.style.display = 'table-row';
          }
        };
        allOrdersBtn.addEventListener('click', allOrders);
      });
      return allOrdersTable;
    })
    .catch((error) => {
      console.log('Catch get all orders error', error);
    });
};
userOrders();
