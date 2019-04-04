const baseURL = 'https://marcus-fast-food-fast.herokuapp.com/api/v1';
// const baseURL = 'http://localhost:5030/api/v1';

class Utils {
  static displayMessage(message, color, fieldIndex) {
    const formAlert = document.querySelectorAll('.formAlert')[fieldIndex];
    formAlert.innerHTML = message;
    formAlert.style.display = 'inline-block';
    formAlert.style.color = color;

    if (message === 'Menu created successfully') {
      formAlert.style.backgroundColor = 'none';
    }
  }

  static clearMessage(index) {
    const formAlert = document.querySelectorAll('.formAlert')[index];
    formAlert.style.display = 'none';
  }

  static notification(message, color, background) {
    const pageAlert = document.querySelector('.pageAlert');
    pageAlert.innerHTML = message;
    pageAlert.style.color = color;
    pageAlert.style.backgroundColor = background;
    pageAlert.style.display = 'block';

    setTimeout(() => {
      pageAlert.style.backgroundColor = 'transparent';
      pageAlert.style.color = 'transparent';
    }, 6000);
  }

  static clearSignup() {
    document.querySelector('#name').value = '';
    document.querySelector('#email').value = '';
    document.querySelector('#phone').value = '';
    document.querySelector('#address').value = '';
    document.querySelector('#password').value = '';
  }

  static clearLogin() {
    document.querySelector('#email1').value = '';
    document.querySelector('#password1').value = '';
  }

  static clearPostMenu() {
    document.querySelector('#menu').value = '';
    document.querySelector('#description').value = '';
    document.querySelector('#category').value = '';
    document.querySelector('#imageURL').value = '';
    document.querySelector('#quantity').value = '';
    document.querySelector('#price').value = '';
  }
}
