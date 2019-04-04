const selectStatus = () => {
  const row = document.querySelectorAll('.row');
  const cancelOrder = document.querySelectorAll('.cancel');
  const processOrder = document.querySelectorAll('.process');
  const completeOrder = document.querySelectorAll('.complete');


  const cancelled = (event) => {
    cancelOrder.forEach((_v, i, cancelArr) => {
      if (event.target === cancelArr[i]) {
        row[i].innerHTML = 'Cancelled';
      }
    });
  };
  for (let i = 0; i < cancelOrder.length; i++) {
    cancelOrder[i].addEventListener('click', cancelled);
  }

  const processing = (event) => {
    processOrder.forEach((_v, i, processArr) => {
      if (event.target === processArr[i]) {
        processArr[i].setAttribute('class', 'processing');
        processArr[i].innerHTML = 'Processing';
        cancelOrder[i].style.display = 'none';
        completeOrder[i].style.display = 'inline-block';
      }
    });
  };
  for (let i = 0; i < processOrder.length; i++) {
    processOrder[i].addEventListener('click', processing);
  }


  const complete = (event) => {
    completeOrder.forEach((_v, i, completeArr) => {
      if (event.target === completeArr[i]) {
        row[i].innerHTML = 'Completed';
      }
    });
  };
  for (let i = 0; i < completeOrder.length; i++) {
    completeOrder[i].addEventListener('click', complete);
  }
};

window.onload = selectStatus();
