import usersTable from './authTable';
import menusTable from './menuTable';
import ordersTable from './orderTable';
import createAdmin from './signupAdmin';

usersTable()
  .then(() => createAdmin()
    .then(() => menusTable()
      .then(() => ordersTable())))
  .catch(error => console.log(error));
