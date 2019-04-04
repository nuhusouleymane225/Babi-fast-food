localStorage.removeItem('menuURL');
localStorage.removeItem('menuName');
localStorage.removeItem('menuImageURL');
localStorage.removeItem('menuCategory');
localStorage.removeItem('menuDescription');
localStorage.removeItem('menuQuantity');
localStorage.removeItem('menuPrice');
localStorage.removeItem('userId');
localStorage.removeItem('email');

const fetchAllMenu = () => {
  const displayModal = document.querySelector('.modal');
  window.onclick = (event) => {
    if (event.target === displayModal) {
      displayModal.style.display = 'none';
    }
  };

  const token = localStorage.getItem('token');
  fetch(`${baseURL}/menu/admin`, {
    method: 'GET',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
      Authorization: token
    }
  })
    .then(response => response.json())
    .then((data) => {
      const allmenuTable = document.querySelector('.all-menu-table');
      let message = '';
      message = 'You are yet to upload menu. Start uploading now';
      if (data.message === message) {
        Utils.notification(data.message, 'white', 'red');
        setTimeout(() => {
          location.assign('add-menu.html');
        }, 6200);
        return;
      }

      data.allMenu.forEach((foodItem, index, foodItemArr) => {
        const newTableRow = document.createElement('TR');
        newTableRow.innerHTML = `
          <td>${foodItem.id}</td>
          <td>${foodItem.menu}</td>
          <td><img src="${foodItem.imageurl}" class="menu-image"></td>
          <td>${foodItem.category}</td>
          <td>${foodItem.description}</td>
          <td>${foodItem.quantity}</td>
          <td>&#8358;${foodItem.price}</td>
          <td width="75">
            <div class="modify">
              <span class="delete" id="delete${foodItem.id}">&#10006;</span>&ensp;
              <span class="edit" id="edit${foodItem.id}">&#9998;</span>
            </div>
          </td>
        `;
        allmenuTable.appendChild(newTableRow);

        let URL = '';
        const deleteId = document.querySelector(`#delete${foodItem.id}`);
        const getDeleteId = () => {
          const modal = document.querySelector('.modal');
          modal.style.display = 'block';
          URL = `${baseURL}/menu/${foodItem.id}`;
        };
        deleteId.addEventListener('click', getDeleteId);
        const deleteMenu = (event) => {
          event.preventDefault();
          fetch(URL, {
            method: 'DELETE',
            headers: {
              Accept: 'application/json, text/plain, */*',
              'Content-type': 'application/json',
              Authorization: token
            }
          })
            .then(feedback => feedback.json())
            .then((response) => {
              message = `${foodItem.menu} deleted successfully`;
              if (response.message === message) {
                Utils.notification(`#${foodItem.id} ${foodItem.menu} deleted successfully`, 'white', 'green');
                setTimeout(() => {
                  location.assign('menu-admin.html');
                }, 6000);
              }
            })
            .catch((error) => {
              console.log('Catch fetch delete error', error);
            });
        };
        document.querySelector('#delete-form').addEventListener('submit', deleteMenu);

        const editId = document.querySelector(`#edit${foodItem.id}`);
        const getEditId = () => {
          URL = `${baseURL}/menu/${foodItem.id}`;
          localStorage.setItem('menuURL', URL);
          localStorage.setItem('menuName', `${foodItem.menu}`);
          localStorage.setItem('menuImageURL', `${foodItem.imageurl}`);
          localStorage.setItem('menuCategory', `${foodItem.category}`);
          localStorage.setItem('menuDescription', `${foodItem.description}`);
          localStorage.setItem('menuQuantity', `${foodItem.quantity}`);
          localStorage.setItem('menuPrice', `${foodItem.price}`);
          location.assign('add-menu.html');
        };
        editId.addEventListener('click', getEditId);
      });
    })
    .catch((error) => {
      console.log('Catch fetch all menu error', error);
    });
};

fetchAllMenu();
