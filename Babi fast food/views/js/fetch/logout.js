const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('orderItems');
  localStorage.removeItem('userId');
  localStorage.removeItem('email');
  localStorage.removeItem('menuURL');
  localStorage.removeItem('menuName');
  localStorage.removeItem('menuImageURL');
  localStorage.removeItem('menuCategory');
  localStorage.removeItem('menuDescription');
  localStorage.removeItem('menuQuantity');
  localStorage.removeItem('menuPrice');
  location.assign('index.html');
};

const dropdownLogout = document.querySelector('div > a.logout');
if (dropdownLogout) {
  dropdownLogout.addEventListener('click', logout);
}
document.querySelector('.logout').addEventListener('click', logout);
