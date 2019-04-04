
const cartModal = document.querySelector('.cart-modal');

const toggleMenuDashboard = () => {
  if (cartDashboard.style.display === 'block' && cartModal.style.display === 'block') {
    cartDashboard.style.display = 'none';
    cartModal.style.display = 'none';
    toggleCart.style.width = '150px';
  } else {
    cartDashboard.style.display = 'block';
    cartModal.style.display = 'block';
    toggleCart.style.width = '300px';
  }
};
toggleCart.addEventListener('click', toggleMenuDashboard);
