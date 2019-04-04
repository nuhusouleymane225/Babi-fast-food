import pool from '../connection';

const createMenusTable = `DROP TABLE IF EXISTS menus CASCADE;
CREATE TABLE menus (
  id SERIAL PRIMARY KEY NOT NULL,
  menu CHARACTER VARYING(30) NOT NULL,
  description CHARACTER VARYING(100) NOT NULL,
  category CHARACTER VARYING(20) NOT NULL,
  imageURL TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  price INTEGER NOT NULL
)`;

class MenuTableHandler {
  static menusTable() {
    const create = pool.query(createMenusTable)
      .then(() => console.log('menusTable ==>> INITIALIZED'))
      .catch(error => console.log(`menus table ${error}`));
    return create;
  }
}

const { menusTable } = MenuTableHandler;

export default menusTable;
