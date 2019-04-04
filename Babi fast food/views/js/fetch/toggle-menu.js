const toggleMenu = document.querySelector('.toggle-menu');
const switchDirection = document.querySelector('.toggle-menu span');
const dashboardOptions = document.querySelector('.dashboard-menu');
const cartModal = document.querySelector('.cart-modal');
const modal = document.querySelector('.modal');

const toggleMenuDashboard = () => {
  if (dashboardOptions.style.display === 'block' && cartModal.style.display === 'block') {
    dashboardOptions.style.display = 'none';
    cartModal.style.display = 'none';
    toggleMenu.style.width = '100px';
    switchDirection.style.transform = 'scaleX(1)';
  } else {
    dashboardOptions.style.display = 'block';
    cartModal.style.display = 'block';
    toggleMenu.style.width = '250px';
    switchDirection.style.transform = 'scaleX(-1)';
  }
};
toggleMenu.addEventListener('click', toggleMenuDashboard);

window.onclick = (event) => {
  if (event.target === cartModal || event.target === modal) {
    cartModal.style.display = 'none';
    modal.style.display = 'none';
    toggleMenu.style.width = '100px';
    switchDirection.style.transform = 'scaleX(1)';
  }
};
