import pool from '../connection';

const createUsersTable = `DROP TABLE IF EXISTS users CASCADE;
  CREATE TABLE users (
    id SERIAL PRIMARY KEY NOT NULL,
    name CHARACTER VARYING(50) NOT NULL,
    email CHARACTER VARYING(50) UNIQUE NOT NULL,
    phone CHARACTER VARYING(13) UNIQUE NOT NULL,
    address CHARACTER VARYING(100) NOT NULL,
    password CHARACTER VARYING(255) NOT NULL,
    usertype CHARACTER VARYING(5) NOT NULL DEFAULT ('user')
)`;

class UserTableHandler {
  static usersTable() {
    const create = pool.query(createUsersTable)
      .then(() => console.log('usersTable ==>> INITIALIZED'))
      .catch(error => console.log(`users table ${error}`));
    return create;
  }
}

const { usersTable } = UserTableHandler;

export default usersTable;
