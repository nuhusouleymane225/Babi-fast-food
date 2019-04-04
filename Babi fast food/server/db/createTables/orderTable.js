import pool from '../connection';

const createOrdersTable = `DROP TABLE IF EXISTS orders CASCADE;
  CREATE TABLE orders (
    id SERIAL PRIMARY KEY NOT NULL,
    userId INTEGER NOT NULL,
    FOREIGN KEY (userId) references users (id) on delete cascade,
    orderItems JSONB NOT NULL,
    total INTEGER NOT NULL,
    location CHARACTER VARYING(100) NOT NULL,
    orderDate TIMESTAMP NOT NULL DEFAULT (NOW()),
    status CHARACTER VARYING(10) NOT NULL DEFAULT ('New')
)`;

class OrderTableHandler {
  static ordersTable() {
    pool.query(createOrdersTable)
      .then(() => console.log('ordersTable ==>> INITIALIZED'))
      .catch(error => console.log(`orders table ${error}`));
  }
}

const { ordersTable } = OrderTableHandler;

export default ordersTable;
