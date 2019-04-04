import bcrypt from 'bcrypt';
import pool from '../connection';
import 'dotenv/config';

const sql = 'insert into users (name, email, phone, address, password, usertype) values ($1, $2, $3, $4, $5, $6)';
const password = bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10);
const variables = [
  process.env.ADMIN_NAME,
  process.env.ADMIN_EMAIL,
  process.env.ADMIN_PHONE,
  process.env.ADMIN_ADDRESS,
  password,
  'admin'
];

class InsertAdminHandler {
  static createAdmin() {
    const create = pool.query(sql, variables)
      .then((() => console.log('Admin signed up successfully')))
      .catch((error) => {
        console.log(error);
      });
    return create;
  }
}

const { createAdmin } = InsertAdminHandler;

export default createAdmin;
