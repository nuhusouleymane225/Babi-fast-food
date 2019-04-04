const orderHistory = () => {
  const orderDiv = document.querySelectorAll('.order-history');
  const allOrders = document.querySelector('.all-orders');

  const select = (event) => {
    if (event.target.id === 'pending') {
      orderDiv[1].style.display = 'flex';
      orderDiv[2].style.display = 'none';
      orderDiv[3].style.display = 'none';
      orderDiv[4].style.display = 'none';
      orderDiv[5].style.display = 'flex';
      orderDiv[6].style.display = 'none';
      orderDiv[7].style.display = 'none';
      orderDiv[8].style.display = 'none';
    }
    if (event.target.id === 'accepted') {
      orderDiv[1].style.display = 'none';
      orderDiv[2].style.display = 'flex';
      orderDiv[3].style.display = 'none';
      orderDiv[4].style.display = 'none';
      orderDiv[5].style.display = 'none';
      orderDiv[6].style.display = 'flex';
      orderDiv[7].style.display = 'none';
      orderDiv[8].style.display = 'none';
    }
    if (event.target.id === 'declined') {
      orderDiv[1].style.display = 'none';
      orderDiv[2].style.display = 'none';
      orderDiv[3].style.display = 'flex';
      orderDiv[4].style.display = 'none';
      orderDiv[5].style.display = 'none';
      orderDiv[6].style.display = 'none';
      orderDiv[7].style.display = 'flex';
      orderDiv[8].style.display = 'none';
    }
    if (event.target.id === 'completed') {
      orderDiv[1].style.display = 'none';
      orderDiv[2].style.display = 'none';
      orderDiv[3].style.display = 'none';
      orderDiv[4].style.display = 'flex';
      orderDiv[5].style.display = 'none';
      orderDiv[6].style.display = 'none';
      orderDiv[7].style.display = 'none';
      orderDiv[8].style.display = 'flex';
    }
    if (event.target === allOrders) {
      orderDiv[1].style.display = 'flex';
      orderDiv[2].style.display = 'flex';
      orderDiv[3].style.display = 'flex';
      orderDiv[4].style.display = 'flex';
      orderDiv[5].style.display = 'flex';
      orderDiv[6].style.display = 'flex';
      orderDiv[7].style.display = 'flex';
      orderDiv[8].style.display = 'flex';
    }
  };

  const pending = document.querySelector('#pending');
  const accepted = document.querySelector('#accepted');
  const declined = document.querySelector('#declined');
  const completed = document.querySelector('#completed');

  pending.addEventListener('click', select);
  accepted.addEventListener('click', select);
  declined.addEventListener('click', select);
  completed.addEventListener('click', select);
  allOrders.addEventListener('click', select);

  const selectMobile = (event) => {
    const mobileDiv = document.querySelectorAll('.mobile');

    if (event.target.id === 'pending') {
      mobileDiv[0].style.display = 'flex';
      mobileDiv[1].style.display = 'none';
      mobileDiv[2].style.display = 'none';
      mobileDiv[3].style.display = 'none';
    }
    if (event.target.id === 'accepted') {
      mobileDiv[0].style.display = 'none';
      mobileDiv[1].style.display = 'flex';
      mobileDiv[2].style.display = 'none';
      mobileDiv[3].style.display = 'none';
    }
    if (event.target.id === 'declined') {
      mobileDiv[0].style.display = 'none';
      mobileDiv[1].style.display = 'none';
      mobileDiv[2].style.display = 'flex';
      mobileDiv[3].style.display = 'none';
    }
    if (event.target.id === 'completed') {
      mobileDiv[0].style.display = 'none';
      mobileDiv[1].style.display = 'none';
      mobileDiv[2].style.display = 'none';
      mobileDiv[3].style.display = 'flex';
    }
    if (event.target === allMobile) {
      mobileDiv[0].style.display = 'flex';
      mobileDiv[1].style.display = 'flex';
      mobileDiv[2].style.display = 'flex';
      mobileDiv[3].style.display = 'flex';
    }
  };
  const pending2 = document.querySelector('#pending');
  pending2.addEventListener('click', selectMobile);
  const accepted2 = document.querySelector('#accepted');
  accepted2.addEventListener('click', selectMobile);
  const declined2 = document.querySelector('#declined');
  declined2.addEventListener('click', selectMobile);
  const completed2 = document.querySelector('#completed');
  completed2.addEventListener('click', selectMobile);
  const allMobile = document.querySelector('.all-orders');
  allMobile.addEventListener('click', selectMobile);
};

window.onload = orderHistory();
