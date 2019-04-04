
const login = (eventBtn) => {
  eventBtn.preventDefault();
  const email = document.querySelector('#email1').value.trim();
  const password = document.querySelector('#password1').value.trim();

  fetch(`${baseURL}/auth/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  })
    .then(response => response.json())
    .then((result) => {
      let message = '';

      message = 'Email is undefined';
      if (result.message === message) {
        Utils.displayMessage(result.message, 'red', 5);
        return;
      }

      message = 'Email should be a string';
      if (result.message === message) {
        Utils.displayMessage(result.message, 'red', 5);
        return;
      }

      message = 'Email cannot be empty.';
      if (result.message === message) {
        Utils.displayMessage(result.message, 'red', 5);
        return;
      }

      message = 'Email not found. Please signup';
      if (result.message === message) {
        Utils.displayMessage(result.message, 'red', 5);
        return;
      }

      message = 'Password is undefined. Please input your password';
      if (result.message === message) {
        Utils.displayMessage(result.message, 'red', 6);
        return;
      }

      message = 'Password should be a string';
      if (result.message === message) {
        Utils.displayMessage(result.message, 'red', 6);
        return;
      }

      message = 'Password is empty. Please input your password';
      if (result.message === message) {
        Utils.displayMessage('Passeord cannot be empty', 'red', 6);
        return;
      }

      message = 'Incorrect password. Please input your correct password';
      if (result.message === message) {
        Utils.displayMessage('Password Incorrect', 'red', 6);
        return;
      }

      message = '&#9989';
      Utils.displayMessage(message, 'lime', 5);
      Utils.displayMessage(message, 'lime', 6);
      Utils.clearLogin();

      localStorage.setItem('token', result.token);

      const jwtDecode = (t) => {
        const token = {};
        token.raw = t;
        token.header = JSON.parse(window.atob(t.split('.')[0]));
        token.payload = JSON.parse(window.atob(t.split('.')[1]));
        return (token);
      };

      let { token } = result;
      let decoded = jwtDecode(token);

      if (decoded.payload.payload.usertype === 'admin') {
        setTimeout(() => {
          location.assign('orders-admin.html');
        }, 500);
        return;
      }

      setTimeout(() => {
        location.assign('menu.html');
      }, 500);
    })
    .catch((error) => {
      console.log('Info From Catch', error);
    });
};

document.querySelector('#loginForm').addEventListener('submit', login);

const removeError = (event) => {
  if (event.target === email1) {
    Utils.clearMessage(5);
  }
  if (event.target === password1) {
    Utils.clearMessage(6);
  }
};

document.querySelector('#email1').addEventListener('click', removeError);
document.querySelector('#password1').addEventListener('click', removeError);
