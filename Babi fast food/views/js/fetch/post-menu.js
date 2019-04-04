const cloudinaryURL = 'https://api.cloudinary.com/v1_1/duk5ix8wp/upload';
const cloudinaryUploadPreset = 'omrikp6i';

let imageLink;

const imageUpload = document.querySelector('.imageURL');
imageUpload.addEventListener('change', (event) => {
  let image = event.target.files[0];

  let formData = new FormData();
  formData.append('file', image);
  formData.append('upload_preset', cloudinaryUploadPreset);

  axios({
    url: cloudinaryURL,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: formData
  })
    .then((response) => {
      imageLink = response.data.secure_url;
    })
    .catch((error) => {
      console.log(error);
    });
});

localStorage.removeItem('userId');
localStorage.removeItem('email');

const menuURL = localStorage.getItem('menuURL');
const pageTitle = document.querySelector('.page-title');
const resetForm = document.querySelector('.reset-form');

if (menuURL) {
  const splitMenuURL = menuURL.split('/');
  const menuID = splitMenuURL[splitMenuURL.length - 1];
  pageTitle.innerHTML = `UPDATE MENU #${menuID}`;
  resetForm.style.display = 'block';
  document.querySelector('.menuName').value = localStorage.getItem('menuName');
  document.querySelector('.menuDescription').value = localStorage.getItem('menuDescription');
  document.querySelector('.menuPrice').value = localStorage.getItem('menuPrice');
  document.querySelector('.menuQuantity').value = localStorage.getItem('menuQuantity');
  document.querySelector('.menuCategory').value = localStorage.getItem('menuCategory');
  document.querySelector('.menuImageURL').value = localStorage.getItem('menuImageURL');
  Utils.displayMessage('Leave empty if you prefer existing image', '#e65c00', 3);
}

const postMenu = (eventObj) => {
  eventObj.preventDefault();
  const token = localStorage.getItem('token');

  const menu = document.querySelector('#menu').value.trim();
  const description = document.querySelector('#description').value.trim();
  const category = document.querySelector('#category').value.trim();
  const menuImageURL = document.querySelector('.menuImageURL').value.trim();
  const imageURL = imageLink || menuImageURL;
  const quantity = document.querySelector('#quantity').value.trim();
  const price = document.querySelector('#price').value.trim();

  if (!menuURL) {
    fetch(`${baseURL}/menu`, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json',
        Authorization: token
      },
      body: JSON.stringify({
        menu, description, category, imageURL, quantity, price
      })
    })
      .then(response => response.json())
      .then((data) => {
        let message = '';
  
        message = 'Menu is undefined. Input characters of length 3 to 30 (alphabets, whitespace, comma, hyphen)';
        if (data.message === message) {
          Utils.displayMessage(data.message, 'red', 0);
          return;
        }
  
        message = 'Menu should be a string. Input characters of length 3 to 30 (alphabets, whitespace, comma, hyphen)';
        if (data.message === message) {
          Utils.displayMessage(data.message, 'red', 0);
          return;
        }
  
        message = 'Menu is empty. Input characters of length 3 to 30 (alphabets, whitespace, comma, hyphen)';
        if (data.message === message) {
          Utils.displayMessage('Input alphabets, whitespace, comma, hyphen; length 3 to 30', 'red', 0);
          return;
        }
  
        message = 'Invalid menu length. Input characters of length 3 to 30 (alphabets, whitespace, comma, hyphen)';
        if (data.message === message) {
          Utils.displayMessage('Input alphabets, whitespace, comma, hyphen; length 3 to 30', 'red', 0);
          return;
        }
  
        message = 'Invalid menu character detected. Input characters of length 3 to 30 (alphabets, whitespace, comma, hyphen)';
        if (data.message === message) {
          Utils.displayMessage('Input alphabets, whitespace, comma, hyphen; length 3 to 30', 'red', 0);
          return;
        }
  
        message = 'Description is undefined. Input characters of length 5 to 100 (alphanumeric, whitespace, comma, hyphen, fullstop)';
        if (data.message === message) {
          Utils.displayMessage(data.message, 'red', 1);
          return;
        }
  
        message = 'Description should be a string. Input characters of length 5 to 100 (alphanumeric, whitespace, comma, hyphen, fullstop)';
        if (data.message === message) {
          Utils.displayMessage(data.message, 'red', 1);
          return;
        }
  
        message = 'Description is empty. Input characters of length 5 to 100 (alphanumeric, whitespace, comma, hyphen, fullstop)';
        if (data.message === message) {
          Utils.displayMessage('Input alphanumerics, whitespace, comma, hyphen, fullstop; length 5 to 100', 'red', 1);
          return;
        }
  
        message = 'Invalid description length. Input characters of length 5 to 100 (alphanumeric, whitespace, comma, hyphen, fullstop)';
        if (data.message === message) {
          Utils.displayMessage('Input alphanumerics, whitespace, comma, hyphen, fullstop; length 5 to 100', 'red', 1);
          return;
        }
  
        message = 'Invalid description character detected. Input characters of length 5 to 100 (alphanumeric, whitespace, comma, hyphen, fullstop)';
        if (data.message === message) {
          Utils.displayMessage('Input alphanumerics, whitespace, comma, hyphen, fullstop; length 5 to 100', 'red', 1);
          return;
        }
  
        message = 'Category is undefined. Input characters of length 3 to 50 (alphanumeric, whitespace, and hyphen)';
        if (data.message === message) {
          Utils.displayMessage(data.message, 'red', 2);
          return;
        }
  
        message = 'Category should be a string of length 3 to 50 (alphanumeric, whitespace, and hyphen)';
        if (data.message === message) {
          Utils.displayMessage(data.message, 'red', 2);
          return;
        }
  
        message = 'Category is empty. Input characters of length 3 to 50 (alphanumeric, whitespace, and hyphen)';
        if (data.message === message) {
          Utils.displayMessage('Input alphanumerics, whitespace, hyphen; length 3 to 50', 'red', 2);
          return;
        }
  
        message = 'Invalid category. Input characters of length 3 to 50 (alphanumeric, whitespace, and hyphen)';
        if (data.message === message) {
          Utils.displayMessage('Input alphanumerics, whitespace, hyphen; length 3 to 50', 'red', 2);
          return;
        }
  
        message = 'imageURL is undefined. Input a valid one';
        if (data.message === message) {
          Utils.displayMessage(data.message, 'red', 3);
          return;
        }
  
        message = 'imageURL should be a string';
        if (data.message === message) {
          Utils.displayMessage(data.message, 'red', 3);
          return;
        }
  
        message = 'imageURL is empty. Input a valid one';
        if (data.message === message) {
          Utils.displayMessage(data.message, 'red', 3);
          return;
        }
  
        message = 'Invalid imageURL detected. Valid format are .jpg, .jpeg, .png, .gif';
        if (data.message === message) {
          Utils.displayMessage('Invalid imageURL. Valid format are .jpg .jpeg .png .gif', 'red', 3);
          return;
        }
  
        message = 'Quantity is undefined. Input positive integer greater than zero and of length 1 to 4';
        if (data.message === message) {
          Utils.displayMessage(data.message, 'red', 4);
          return;
        }
  
        message = 'Quantity should be a string. Input positive integer greater than zero and of length 1 to 4';
        if (data.message === message) {
          Utils.displayMessage(data.message, 'red', 4);
          return;
        }
  
        message = 'Quantity is empty. Input positive integer greater than zero and of length 1 to 4';
        if (data.message === message) {
          Utils.displayMessage('Input positive integer greater than zero and of length 1 to 4', 'red', 4);
          return;
        }
  
        message = 'Invalid quantity length. Input positive integer greater than zero and of length 1 to 4';
        if (data.message === message) {
          Utils.displayMessage('Input positive integer greater than zero and of length 1 to 4', 'red', 4);
          return;
        }
  
        message = 'Invalid quantity. Input positive integer greater than zero and of length 1 to 4';
        if (data.message === message) {
          Utils.displayMessage('Input positive integer greater than zero and of length 1 to 4', 'red', 4);
          return;
        }
  
        message = 'Invalid quantity character detected. Input positive integer greater than zero and of length 1 to 4';
        if (data.message === message) {
          Utils.displayMessage('Input positive integer greater than zero and of length 1 to 4', 'red', 4);
          return;
        }
  
        message = 'Price is undefined. Input positive integer greater than zero but less than length of 10';
        if (data.message === message) {
          Utils.displayMessage(data.message, 'red', 5);
          return;
        }
  
        message = 'Price should be a string. Input positive integer greater than zero but less than length of 10';
        if (data.message === message) {
          Utils.displayMessage(data.message, 'red', 5);
          return;
        }
  
        message = 'Price is empty. Input positive integer greater than zero but less than length of 10';
        if (data.message === message) {
          Utils.displayMessage('Input positive integer greater than zero and length 1 - 10', 'red', 5);
          return;
        }
  
        message = 'Invalid price. Input positive integer greater than zero but less than length of 10';
        if (data.message === message) {
          Utils.displayMessage('Input positive integer greater than zero and length 1 - 10', 'red', 5);
          return;
        }
  
        message = 'Invalid price character detected. Input positive integer greater than zero but less than length of 10';
        if (data.message === message) {
          Utils.displayMessage('Input positive integer greater than zero and length 1 - 10', 'red', 5);
          return;
        }
  
        message = 'No token supplied';
        if (data.message === message) {
          Utils.notification(data.message, 'white', 'red');
          return;
        }
  
        message = 'JsonWebTokenError';
        if (data.message.name === message) {
          Utils.notification(data.message.name, 'white', 'red');
          return;
        }
  
        message = 'Your input is not a valid token. Please input a correct one';
        if (data.message === message) {
          Utils.notification(data.message, 'white', 'red');
          return;
        }
  
        message = 'Menu created successfully';
        if (data.message === message) {
          Utils.notification(data.message, 'white', 'green');
          message = '&#9989';
          Utils.displayMessage(message, 'lime', 0);
          Utils.displayMessage(message, 'lime', 1);
          Utils.displayMessage(message, 'lime', 2);
          Utils.displayMessage(message, 'lime', 3);
          Utils.displayMessage(message, 'lime', 4);
          Utils.displayMessage(message, 'lime', 5);
          Utils.clearPostMenu();
  
          setTimeout(() => {
            location.assign('add-menu.html');
          }, 2000);
        }
      })
      .catch((error) => {
        console.log('Info From Catch', error);
      });
  }

  if (menuURL) {
    fetch(menuURL, {
      method: 'PUT',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json',
        Authorization: token
      },
      body: JSON.stringify({
        menu, description, category, imageURL, quantity, price
      })
    })
      .then(response => response.json())
      .then((data) => {
        let message = '';

        message = 'Menu is undefined. Input characters of length 3 to 30 (alphabets, whitespace, comma, hyphen)';
        if (data.message === message) {
          Utils.displayMessage(data.message, 'red', 0);
          return;
        }

        message = 'Menu should be a string. Input characters of length 3 to 30 (alphabets, whitespace, comma, hyphen)';
        if (data.message === message) {
          Utils.displayMessage(data.message, 'red', 0);
          return;
        }
  
        message = 'Menu is empty. Input characters of length 3 to 30 (alphabets, whitespace, comma, hyphen)';
        if (data.message === message) {
          Utils.displayMessage('Input alphabets, whitespace, comma, hyphen; length 3 to 30', 'red', 0);
          return;
        }
  
        message = 'Invalid menu length. Input characters of length 3 to 30 (alphabets, whitespace, comma, hyphen)';
        if (data.message === message) {
          Utils.displayMessage('Input alphabets, whitespace, comma, hyphen; length 3 to 30', 'red', 0);
          return;
        }
  
        message = 'Invalid menu character detected. Input characters of length 3 to 30 (alphabets, whitespace, comma, hyphen)';
        if (data.message === message) {
          Utils.displayMessage('Input alphabets, whitespace, comma, hyphen; length 3 to 30', 'red', 0);
          return;
        }
  
        message = 'Description is undefined. Input characters of length 5 to 100 (alphanumeric, whitespace, comma, hyphen, fullstop)';
        if (data.message === message) {
          Utils.displayMessage(data.message, 'red', 1);
          return;
        }
  
        message = 'Description should be a string. Input characters of length 5 to 100 (alphanumeric, whitespace, comma, hyphen, fullstop)';
        if (data.message === message) {
          Utils.displayMessage(data.message, 'red', 1);
          return;
        }
  
        message = 'Description is empty. Input characters of length 5 to 100 (alphanumeric, whitespace, comma, hyphen, fullstop)';
        if (data.message === message) {
          Utils.displayMessage('Input alphanumerics, whitespace, comma, hyphen, fullstop; length 5 to 100', 'red', 1);
          return;
        }
  
        message = 'Invalid description length. Input characters of length 5 to 100 (alphanumeric, whitespace, comma, hyphen, fullstop)';
        if (data.message === message) {
          Utils.displayMessage('Input alphanumerics, whitespace, comma, hyphen, fullstop; length 5 to 100', 'red', 1);
          return;
        }
  
        message = 'Invalid description character detected. Input characters of length 5 to 100 (alphanumeric, whitespace, comma, hyphen, fullstop)';
        if (data.message === message) {
          Utils.displayMessage('Input alphanumerics, whitespace, comma, hyphen, fullstop; length 5 to 100', 'red', 1);
          return;
        }
  
        message = 'Category is undefined. Input characters of length 3 to 50 (alphanumeric, whitespace, and hyphen)';
        if (data.message === message) {
          Utils.displayMessage(data.message, 'red', 2);
          return;
        }
  
        message = 'Category should be a string of length 3 to 50 (alphanumeric, whitespace, and hyphen)';
        if (data.message === message) {
          Utils.displayMessage(data.message, 'red', 2);
          return;
        }
  
        message = 'Category is empty. Input characters of length 3 to 50 (alphanumeric, whitespace, and hyphen)';
        if (data.message === message) {
          Utils.displayMessage('Input alphanumerics, whitespace, hyphen; length 3 to 50', 'red', 2);
          return;
        }
  
        message = 'Invalid category. Input characters of length 3 to 50 (alphanumeric, whitespace, and hyphen)';
        if (data.message === message) {
          Utils.displayMessage('Input alphanumerics, whitespace, hyphen; length 3 to 50', 'red', 2);
          return;
        }
  
        message = 'imageURL is undefined. Input a valid one';
        if (data.message === message) {
          Utils.displayMessage(data.message, 'red', 3);
          return;
        }
  
        message = 'imageURL should be a string';
        if (data.message === message) {
          Utils.displayMessage(data.message, 'red', 3);
          return;
        }
  
        message = 'imageURL is empty. Input a valid one';
        if (data.message === message) {
          Utils.displayMessage(data.message, 'red', 3);
          return;
        }
  
        message = 'Invalid imageURL detected. Valid format are .jpg, .jpeg, .png, .gif';
        if (data.message === message) {
          Utils.displayMessage('Invalid imageURL. Valid format are .jpg .jpeg .png .gif', 'red', 3);
          return;
        }
  
        message = 'Quantity is undefined. Input positive integer greater than zero and of length 1 to 4';
        if (data.message === message) {
          Utils.displayMessage(data.message, 'red', 4);
          return;
        }
  
        message = 'Quantity should be a string. Input positive integer greater than zero and of length 1 to 4';
        if (data.message === message) {
          Utils.displayMessage(data.message, 'red', 4);
          return;
        }
  
        message = 'Quantity is empty. Input positive integer greater than zero and of length 1 to 4';
        if (data.message === message) {
          Utils.displayMessage('Input positive integer greater than zero and of length 1 to 4', 'red', 4);
          return;
        }
  
        message = 'Invalid quantity length. Input positive integer greater than zero and of length 1 to 4';
        if (data.message === message) {
          Utils.displayMessage('Input positive integer greater than zero and of length 1 to 4', 'red', 4);
          return;
        }
  
        message = 'Invalid quantity. Input positive integer greater than zero and of length 1 to 4';
        if (data.message === message) {
          Utils.displayMessage('Input positive integer greater than zero and of length 1 to 4', 'red', 4);
          return;
        }
  
        message = 'Invalid quantity character detected. Input positive integer greater than zero and of length 1 to 4';
        if (data.message === message) {
          Utils.displayMessage('Input positive integer greater than zero and of length 1 to 4', 'red', 4);
          return;
        }
  
        message = 'Price is undefined. Input positive integer greater than zero but less than length of 10';
        if (data.message === message) {
          Utils.displayMessage(data.message, 'red', 5);
          return;
        }
  
        message = 'Price should be a string. Input positive integer greater than zero but less than length of 10';
        if (data.message === message) {
          Utils.displayMessage(data.message, 'red', 5);
          return;
        }
  
        message = 'Price is empty. Input positive integer greater than zero but less than length of 10';
        if (data.message === message) {
          Utils.displayMessage('Input positive integer greater than zero and length 1 - 10', 'red', 5);
          return;
        }
  
        message = 'Invalid price. Input positive integer greater than zero but less than length of 10';
        if (data.message === message) {
          Utils.displayMessage('Input positive integer greater than zero and length 1 - 10', 'red', 5);
          return;
        }
  
        message = 'Invalid price character detected. Input positive integer greater than zero but less than length of 10';
        if (data.message === message) {
          Utils.displayMessage('Input positive integer greater than zero and length 1 - 10', 'red', 5);
          return;
        }
  
        message = 'No token supplied';
        if (data.message === message) {
          Utils.notification(data.message, 'white', 'red');
          return;
        }
  
        message = 'JsonWebTokenError';
        if (data.message.name === message) {
          Utils.notification(data.message.name, 'white', 'red');
          return;
        }
  
        message = 'Your input is not a valid token. Please input a correct one';
        if (data.message === message) {
          Utils.notification(data.message, 'white', 'red');
          return;
        }
  
        message = 'Updated successfully';
        if (data.message === message) {
          Utils.notification(`Menu #${menuID} updated successfully`, 'white', 'green');
          message = '&#9989';
          Utils.displayMessage(message, 'lime', 0);
          Utils.displayMessage(message, 'lime', 1);
          Utils.displayMessage(message, 'lime', 2);
          Utils.displayMessage(message, 'lime', 3);
          Utils.displayMessage(message, 'lime', 4);
          Utils.displayMessage(message, 'lime', 5);
          localStorage.removeItem('menuURL');
          localStorage.removeItem('menuName');
          localStorage.removeItem('menuImageURL');
          localStorage.removeItem('menuCategory');
          localStorage.removeItem('menuDescription');
          localStorage.removeItem('menuQuantity');
          localStorage.removeItem('menuPrice');
          Utils.clearPostMenu();

          setTimeout(() => {
            location.assign('menu-admin.html');
          }, 2000);
        }
      })
      .catch((error) => {
        console.log('Info From Catch', error);
      });
  }
};
document.querySelector('#postmenu').addEventListener('submit', postMenu);

const cancelUpdateMenu = () => {
  localStorage.removeItem('menuURL');
  localStorage.removeItem('menuName');
  localStorage.removeItem('menuImageURL');
  localStorage.removeItem('menuCategory');
  localStorage.removeItem('menuDescription');
  localStorage.removeItem('menuQuantity');
  localStorage.removeItem('menuPrice');
  location.assign('menu-admin.html');
};
document.querySelector('#postmenu').addEventListener('reset', cancelUpdateMenu);

const menuItem = document.querySelector('.menuItem');
const clearError = (event) => {
  if (event.target === menuItem) {
    Utils.clearMessage(0);
  }
  if (event.target === description) {
    Utils.clearMessage(1);
  }
  if (event.target === category) {
    Utils.clearMessage(2);
  }
  if (event.target === imageURL) {
    Utils.clearMessage(3);
  }
  if (event.target === quantity) {
    Utils.clearMessage(4);
  }
  if (event.target === price) {
    Utils.clearMessage(5);
  }
};

document.querySelector('.menuItem').addEventListener('click', clearError);
document.querySelector('#description').addEventListener('click', clearError);
document.querySelector('#category').addEventListener('click', clearError);
document.querySelector('#imageURL').addEventListener('click', clearError);
document.querySelector('#quantity').addEventListener('click', clearError);
document.querySelector('#price').addEventListener('click', clearError);
