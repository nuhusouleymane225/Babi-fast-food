const authForm = () => {
  const selectDiv = document.querySelectorAll('.auth-form');
  const selectForm = document.querySelectorAll('form');
  const displayModal = document.querySelector('.modal');
  const closeSignup = document.querySelector('.close-signup');
  const closeLogin = document.querySelector('.close-login');

  const toggleForm = (event) => {
    if (event.target.id === 'login' || event.target.id === 'login-drop') {
      selectDiv[0].style.display = 'none';
      selectDiv[1].style.display = 'block';
      displayModal.style.display = 'block';

      setTimeout(() => {
        selectForm[2].setAttribute('class', 'form-after-click');
      }, 50);
    }
    if (event.target.id === 'signup' || event.target.id === 'signup-drop') {
      selectDiv[1].style.display = 'none';
      selectDiv[0].style.display = 'block';
      displayModal.style.display = 'block';

      setTimeout(() => {
        selectForm[1].setAttribute('class', 'form-after-click');
      }, 50);
    }
    if (event.target.id === 'login-modal') {
      selectDiv[0].style.display = 'none';
      selectDiv[1].style.display = 'block';
      selectForm[2].setAttribute('class', 'translate-form');
    }
    if (event.target.id === 'signup-modal') {
      selectDiv[1].style.display = 'none';
      selectDiv[0].style.display = 'block';
      selectForm[1].setAttribute('class', 'translate-form');
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

authForm();
