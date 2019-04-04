const authForm = () => {
  const selectDiv = document.querySelectorAll('.auth-form');
  const selectForm = document.querySelectorAll('form');
  const displayModal = document.querySelector('.modal');
  const closeSignup = document.querySelector('.close-signup');
  const closeLogin = document.querySelector('.close-login');

  const toggleForm = (event) => {
    if (event.target.id === 'login') {
      selectDiv[0].style.display = 'none';
      selectDiv[1].style.display = 'block';
      displayModal.style.display = 'block';

      setInterval(() => {
        selectForm[1].removeAttribute('class');
        selectForm[1].setAttribute('class', 'form-after-click');
      }, 100);
    }
    if (event.target.id === 'signup') {
      selectDiv[1].style.display = 'none';
      selectDiv[0].style.display = 'block';
      displayModal.style.display = 'block';

      setInterval(() => {
        selectForm[0].removeAttribute('class');
        selectForm[0].setAttribute('class', 'form-after-click');
      }, 100);
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

  window.onclick = (event) => {
    if (event.target === displayModal) {
      displayModal.style.display = 'none';
    }
  };
};

window.load = authForm();
