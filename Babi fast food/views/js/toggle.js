const authForm = () => {
  const selectDiv = document.querySelectorAll('.auth-form');
  const selectForm = document.querySelectorAll('form');
  const displayModal = document.querySelector('.modal');
  const closeSignup = document.querySelector('.close-signup');
  const closeLogin = document.querySelector('.close-login');
  const signupDrop = document.querySelector('div > a#signupDrop');
  const loginDrop = document.querySelector('div > a#loginDrop');

  const toggleForm = (event) => {
    if (event.target.id === 'login' || event.target === loginDrop) {
      selectDiv[0].style.display = 'none';
      selectDiv[1].style.display = 'block';
      displayModal.style.display = 'block';

      setTimeout(() => {
        selectForm[1].setAttribute('class', 'form-after-click');
      }, 50);
    }
    if (event.target.id === 'signup' || event.target === signupDrop) {
      selectDiv[1].style.display = 'none';
      selectDiv[0].style.display = 'block';
      displayModal.style.display = 'block';

      setTimeout(() => {
        selectForm[0].setAttribute('class', 'form-after-click');
      }, 50);
    }
    if (event.target.id === 'login-modal') {
      selectDiv[0].style.display = 'none';
      selectDiv[1].style.display = 'block';
      selectForm[1].removeAttribute('class');
      selectForm[1].setAttribute('class', 'translate-form');
    }
    if (event.target.id === 'signup-modal') {
      selectDiv[1].style.display = 'none';
      selectDiv[0].style.display = 'block';
      selectForm[0].removeAttribute('class');
      selectForm[0].setAttribute('class', 'translate-form');
    }
    if (event.target === closeSignup || event.target === closeLogin) {
      displayModal.style.display = 'none';
    }
  };
  const signup = document.querySelector('#signup');
  const login = document.querySelector('#login');
  const loginModal = document.querySelector('#login-modal');
  const signupModal = document.querySelector('#signup-modal');

  signup.addEventListener('click', toggleForm);
  login.addEventListener('click', toggleForm);
  loginModal.addEventListener('click', toggleForm);
  signupModal.addEventListener('click', toggleForm);
  closeSignup.addEventListener('click', toggleForm);
  closeLogin.addEventListener('click', toggleForm);
  if (signupDrop && loginDrop) {
    signupDrop.addEventListener('click', toggleForm);
    loginDrop.addEventListener('click', toggleForm);
  }

  const cartModal = document.querySelector('.cart-modal');
  window.onclick = (event) => {
    if (event.target === displayModal || event.target === cartModal) {
      displayModal.style.display = 'none';
      if (cartModal && toggleCart) {
        cartModal.style.display = 'none';
        toggleCart.style.width = '150px';
      }
    }
  };
};

authForm();
