localStorage.removeItem('menuURL');
localStorage.removeItem('menuName');
localStorage.removeItem('menuImageURL');
localStorage.removeItem('menuCategory');
localStorage.removeItem('menuDescription');
localStorage.removeItem('menuQuantity');
localStorage.removeItem('menuPrice');
localStorage.removeItem('userId');
localStorage.removeItem('email');

const getAllOrders = () => {
  const displayModal = document.querySelector('.modal');
  window.onclick = (event) => {
    if (event.target === displayModal) {
      displayModal.style.display = 'none';
    }
  };
  const token = localStorage.getItem('token');

  fetch(`${baseURL}/orders`, {
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
      message = 'No orders have been placed. Please check again later';
      if (response.message === message) {
        Utils.notification(response.message, 'white', 'red');
        return;
      }

      response.allOrders.forEach((order, index, orderArray) => {
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
          <td class="orderId" id="orderId${order.id}">
            ${order.id}
            <span class="tool-tip">view details</span>
          </td>
          <td>
            ${new Date(order.orderdate).toString().split(' GMT')[0]}
          </td>
          <td>
            <a href="user-orders-admin.html" class="phone" id="phone${order.id}">
              ${order.phone} <span class="tool-tip">view history</span>
            </a>
          </td>
          <td>${order.location}</td>
          <td height="80" width="350">${eachOrderDiv.outerHTML}</td>
          <td>&#8358;${order.total}</td>
          <td class="status">
            <span class="db-status" id="db-status${order.id}">${order.status}</span>
            <div class="dummy-status" id="dummy-status${order.id}">
              <span class="process" id="process${order.id}">process</span><span id="break${order.id}"><br><br></span>
              <span class="cancel" id="cancel${order.id}">cancel</span>
              <span class="complete" id="complete${order.id}">complete</span>
            </div>
          </td>
        `;
        allOrdersTable.appendChild(newTableRow);

        newTableRow.setAttribute('id', `row${order.id}`);
        const targetRow = document.querySelector(`#row${order.id}`);
        const orderStatus = document.querySelector(`#db-status${order.id}`).innerText;

        const newOrdersBtn = document.querySelector('#newOrders');
        const newOrders = () => {
          if (orderStatus === 'New' && targetRow.style.display === 'none') {
            targetRow.style.display = 'table-row';
          }
          if (orderStatus !== 'New') {
            targetRow.style.display = 'none';
          }
        };
        newOrdersBtn.addEventListener('click', newOrders);

        const processingOrdersBtn = document.querySelector('#processingOrders');
        const processingOrders = () => {
          if (orderStatus === 'Processing' && targetRow.style.display === 'none') {
            targetRow.style.display = 'table-row';
          }
          if (orderStatus !== 'Processing') {
            targetRow.style.display = 'none';
          }
        };
        processingOrdersBtn.addEventListener('click', processingOrders);

        const cancelledOrdersBtn = document.querySelector('#cancelledOrders');
        const cancelledOrders = () => {
          if (orderStatus === 'Cancelled' && targetRow.style.display === 'none') {
            targetRow.style.display = 'table-row';
          }
          if (orderStatus !== 'Cancelled') {
            targetRow.style.display = 'none';
          }
        };
        cancelledOrdersBtn.addEventListener('click', cancelledOrders);

        const completedOrdersBtn = document.querySelector('#completedOrders');
        const completedOrders = () => {
          if (orderStatus === 'Completed' && targetRow.style.display === 'none') {
            targetRow.style.display = 'table-row';
          }
          if (orderStatus !== 'Completed') {
            targetRow.style.display = 'none';
          }
        };
        completedOrdersBtn.addEventListener('click', completedOrders);

        const allOrdersBtn = document.querySelector('#allOrders');
        const allOrders = () => {
          if (orderStatus) {
            targetRow.style.display = 'table-row';
          }
        };
        allOrdersBtn.addEventListener('click', allOrders);

        const getUserId = () => {
          localStorage.setItem('userId', order.userid);
          localStorage.setItem('email', order.email);
        };
        document.querySelector(`#phone${order.id}`).addEventListener('click', getUserId);

        const fetchSpecificOrder = () => {
          const modal = document.querySelector('.modal');
          modal.style.display = 'block';

          const specificOrder = document.querySelector('.specific-order');
          const orderData = document.querySelector('.order-data');
          const userData = document.querySelector('.user-data');
          fetch(`${baseURL}/orders/${order.id}`, {
            method: 'GET',
            headers: {
              Accept: 'application/json, text/plain, */*',
              'Content-type': 'application/json',
              Authorization: token
            }
          })
            .then(result => result.json())
            .then((feedback) => {
              const orderTitle = document.querySelector('.order-title');
              orderTitle.innerHTML = `ORDER #${feedback.foundOrder.id}`;
              const orderDataTable = document.createElement('TABLE');

              const orderItemDiv = document.createElement('DIV');
              orderItemDiv.setAttribute('class', 'items');
              const orderItemTable = document.createElement('TABLE');

              feedback.foundOrder.orderitems.forEach((items) => {
                const orderItemRow = document.createElement('TR');
                orderItemRow.innerHTML = `
                  <td>
                    <strong>Meal:</strong> &nbsp; &nbsp; &nbsp; &nbsp; ${items.menu} <br>
                    <strong>Quantity:</strong> &nbsp;${items.quantity} <br>
                    <strong>Amount:</strong> &nbsp; &#8358; ${items.amount}
                  </td>
                `;
                orderItemTable.appendChild(orderItemRow);
              });
              orderItemDiv.appendChild(orderItemTable);

              orderDataTable.innerHTML = `
                <tr style="background: #efefef; color: #000">
                  <td>Date:</td>
                  <td>${new Date(feedback.foundOrder.orderdate).toString().split(' GMT')[0]}</td>
                </tr>
                <tr>
                  <td>Phone:</td>
                  <td>${feedback.foundOrder.phone}</td>
                </tr>
                <tr>
                  <td>Location:</td>
                  <td>${feedback.foundOrder.location}</td>
                </tr>
                <tr>
                  <td>Items:</td>
                  <td>${orderItemDiv.outerHTML}</td>
                </tr>
                <tr>
                  <td>Total:</td>
                  <td>&#8358;${feedback.foundOrder.total}</td>
                </tr>
              `;
              orderData.innerHTML = orderDataTable.outerHTML;

              const userTitle = document.querySelector('.user-title');
              userTitle.innerHTML = 'USER DETAILS';
              const userDataTable = document.createElement('TABLE');
              userDataTable.innerHTML = `
                <tr style="background: #efefef; color: #000">
                  <td>Name:</td>
                  <td>${feedback.userData.name}</td>
                </tr>
                <tr>
                  <td>Phone:</td>
                  <td>${feedback.userData.phone}</td>
                </tr>
                <tr>
                  <td>Email:</td>
                  <td>${feedback.userData.email}</td>
                </tr>
                <tr>
                  <td>Residence:</td>
                  <td>${feedback.userData.address}</td>
                </tr>
                <tr>
                  <td>User type:</td>
                  <td>${feedback.userData.usertype}</td>
                </tr>
              `;
              userData.innerHTML = userDataTable.outerHTML;
            })
            .catch((error) => {
              console.log('Catch specific order error', error);
            });
          return specificOrder;
        };
        document.querySelector(`#orderId${order.id}`).addEventListener('click', fetchSpecificOrder);
        // Modify status starts here
        const status = document.querySelector(`#db-status${order.id}`);
        const dummyStatus = document.querySelector(`#dummy-status${order.id}`);
        const processId = document.querySelector(`#process${order.id}`);
        const completeId = document.querySelector(`#complete${order.id}`);
        const cancelId = document.querySelector(`#cancel${order.id}`);
        const breakId = document.querySelector(`#break${order.id}`);

        if (status.innerHTML === 'Cancelled' || status.innerHTML === 'Completed') {
          dummyStatus.style.display = 'none';
          status.style.display = 'block';
          return;
        }

        if (status.innerHTML === 'Processing') {
          status.style.display = 'block';
          completeId.style.display = 'block';
          cancelId.style.display = 'none';
          processId.style.display = 'none';
          breakId.style.display = 'none';
        }

        setTimeout(() => {
          const cancelOrder = (event) => {
            if (event.target === cancelId) {
              fetch(`${baseURL}/orders/${order.id}/cancel`, {
                method: 'PUT',
                headers: {
                  Accept: 'application/json, text/plain, */*',
                  'Content-type': 'application/json',
                  Authorization: token
                }
              })
                .then(feedback => feedback.json())
                .then((data) => {

                  message = 'Invalid URL. orderId should be a positive integer greater than zero';
                  if (data.message === message) {
                    Utils.notification(data.message, 'white', 'red');
                    return;
                  }

                  message = 'Sorry, this order does not exists.';
                  if (data.message === message) {
                    Utils.notification('Sorry, this order does not exist', 'white', 'red');
                    return;
                  }

                  message = 'Sorry, this order cannot be updated at this time';
                  if (data.message === message) {
                    Utils.notification(`Order ${order.id} cannot be updated at this time`, 'white', 'red');
                    return;
                  }

                  message = 'Order is cancelled';
                  if (data.message === message) {
                    Utils.notification(`Order ${order.id} is cancelled`, 'white', 'green');
                  }
                })
                .catch((error) => {
                  console.log('Cancel order catch error', error);
                });
              dummyStatus.innerHTML = 'Cancelled';
            }
          };
          cancelId.addEventListener('click', cancelOrder);
          // End Cancel Order

          const processOrder = (event) => {
            if (event.target === processId) {
              fetch(`${baseURL}/orders/${order.id}/process`, {
                method: 'PUT',
                headers: {
                  Accept: 'application/json, text/plain, */*',
                  'Content-type': 'application/json',
                  Authorization: token
                }
              })
                .then(feedback => feedback.json())
                .then((data) => {

                  message = 'Invalid URL. orderId should be a positive integer greater than zero';
                  if (data.message === message) {
                    Utils.notification(data.message, 'white', 'red');
                    return;
                  }

                  message = 'Sorry, this order does not exists.';
                  if (data.message === message) {
                    Utils.notification('Sorry, this order does not exist', 'white', 'red');
                    return;
                  }

                  message = 'Sorry, this order cannot be updated at this time';
                  if (data.message === message) {
                    Utils.notification(`Order ${order.id} cannot be updated at this time`, 'white', 'red');
                    return;
                  }

                  message = 'Order is currently processing';
                  if (data.message === message) {
                    Utils.notification(`Order ${order.id} is currently processing`, 'white', 'green');
                  }
                })
                .catch((error) => {
                  console.log('Process order catch error', error);
                });

              cancelId.style.display = 'none';
              processId.setAttribute('class', 'processing');
              processId.innerHTML = 'Processing';
              completeId.style.display = 'block';
            }
          };
          processId.addEventListener('click', processOrder);
          // End Process Order

          const completeOrder = (eventObject) => {
            console.log('HEYYYYYYYYYYY');
            if (eventObject.target === completeId) {
              fetch(`${baseURL}/orders/${order.id}/complete`, {
                method: 'PUT',
                headers: {
                  Accept: 'application/json, text/plain, */*',
                  'Content-type': 'application/json',
                  Authorization: token
                }
              })
                .then(feedback => feedback.json())
                .then((data) => {

                  message = 'Invalid URL. orderId should be a positive integer greater than zero';
                  if (data.message === message) {
                    Utils.notification(data.message, 'white', 'red');
                    return;
                  }

                  message = 'Sorry, this order does not exists.';
                  if (data.message === message) {
                    Utils.notification('Sorry, this order does not exist', 'white', 'red');
                    return;
                  }

                  message = 'This order can only be completed after its been placed on processing';
                  if (data.message === message) {
                    Utils.notification(data.message, 'white', 'red');
                    return;
                  }

                  message = 'Order is completed';
                  if (data.message === message) {
                    Utils.notification(`Order ${order.id} is completed`, 'white', 'green');
                  }
                })
                .catch((error) => {
                  console.log('Process order catch error', error);
                });
              dummyStatus.innerHTML = 'Completed';
              status.style.display = 'none';
            }
          };
          completeId.addEventListener('click', completeOrder);
          // End Complete Order
        }, 500);
        // Modify status ends here
      });
      return allOrdersTable;
    })
    .catch((error) => {
      console.log('Catch get all orders error', error);
    });
};
getAllOrders();
