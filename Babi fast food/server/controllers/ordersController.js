import pool from '../db/connection';
import {
  createOrder, selectUserOrderHistory, selectAllOrders, selectSpecificOrder,
  updateOrderStatus, queryUsersById, returnNewOrder,
  queryUsersByPhone,
  deleteOrderById,
} from '../db/sqlQueries';

/**
  * @description class representing Orders controller action
  *
  * @class OrderHandler
  */

class OrderHandler {
  /**
  * @description - This method is responsible for creating new order
  *
  * @static
  * @param {object} request - Request sent to the router
  * @param {object} response - Response sent from the controller
  *
  * @returns {object} - status and object representing response message
  *
  * @memberof OrderHandler
  */

  static placeOrder(request, response) {
    const { variables } = request.body;

    pool.query(createOrder, variables)
      .then(() => pool.query(returnNewOrder)
        .then((data) => {
          const newOrder = data.rows[0];
          return response.status(201)
            .json({
              message: 'Order placed successfully',
              newOrder
            });
        }))
      .catch(error => response.status(500)
        .json({
          status: 'Fail',
          message: error.message
        }));
  }

  /**
  * @description - This method is responsible for getting order history of a specific user
  *
  * @static
  * @param {object} request - Request sent to the router
  * @param {object} response - Response sent from the controller
  *
  * @returns {object} - status and object representing response message
  *
  * @memberof OrderHandler
  */

  static getUserOrderHistory(request, response) {
    const { userId } = request.params;
    const userInfo = request.authData.payload;
    if (userInfo.usertype === 'admin' || userInfo.id === Number(userId)) {
      return pool.query(selectUserOrderHistory, [userId])
        .then((result) => {
          const orderHistory = result.rows;
          if (orderHistory.length === 0 && userInfo.usertype === 'admin') {
            return pool.query(queryUsersById, [userId])
              .then((data) => {
                if (data.rowCount === 0) {
                  return response.status(404)
                    .json({
                      status: 'Fail',
                      message: 'This user does not exist'
                    });
                }
                return response.status(200)
                  .json({
                    message: `${data.rows[0].email.split('@')[0]} order history is empty at this time. Please check again later`,
                    orderHistory: 'None'
                  });
              });
          }
          if (orderHistory.length === 0 && userInfo.id === Number(userId)) {
            return response.status(200)
              .json({
                message: 'Your order history is empty. Visit menu page and start placing your orders',
                orderHistory: 'None'
              });
          }
          return response.status(200)
            .json({
              message: 'Order history successfully fetched',
              orderHistory
            });
        })
        .catch(error => response.status(500)
          .json({
            status: 'Fail',
            message: error.message
          }));
    }
    return response.status(401)
      .json({
        status: 'Fail',
        message: 'Unauthorized access'
      });
  }

  /**
  * @description - This method is responsible for getting all orders on the app
  *
  * @static
  * @param {object} request - Request sent to the router
  * @param {object} response - Response sent from the controller
  *
  * @returns {object} - status and object representing response message
  *
  * @memberof OrderHandler
  */

  static getAllOrders(request, response) {
    pool.query(selectAllOrders)
      .then((result) => {
        const allOrders = result.rows;
        if (allOrders.length === 0) {
          return response.status(200)
            .json({
              message: 'No orders have been placed. Please check again later',
              allOrders: 'Empty'
            });
        }
        return response.status(200)
          .json({
            message: 'List of all orders',
            allOrders
          });
      })
      .catch(error => response.status(500)
        .json({
          status: 'Fail',
          message: error.message
        }));
  }

  /**
  * @description - This method is responsible for getting a specific order on the app
  *
  * @static
  * @param {object} request - Request sent to the router
  * @param {object} response - Response sent from the controller
  *
  * @returns {object} - status and object representing response message
  *
  * @memberof OrderHandler
  */

  static getSpecificOrder(request, response) {
    const { orderId } = request.params;
    pool.query(selectSpecificOrder, [orderId])
      .then((result) => {
        if (result.rowCount === 1) {
          const foundOrder = result.rows[0];
          return pool.query(queryUsersByPhone, [foundOrder.phone])
            .then((data) => {
              const userData = data.rows[0];
              delete userData.password;
              return response.status(200)
                .json({
                  message: 'Order fetched successfully',
                  foundOrder,
                  userData
                });
            });
        }
        return response.status(404)
          .json({
            message: 'Sorry, this order does not exist'
          });
      })
      .catch(error => response.status(500)
        .json({
          status: 'Fail',
          message: error.message
        }));
  }

  /**
  * @description - This method is responsible for Updating order status to processing
  *
  * @static
  * @param {object} request - Request sent to the router
  * @param {object} response - Response sent from the controller
  *
  * @returns {object} - status and object representing response message
  *
  * @memberof OrderHandler
  */

  static processOrder(request, response) {
    const { orderId } = request.params;
    pool.query(updateOrderStatus, ['Processing', orderId])
      .then(() => response.status(200)
        .json({
          message: 'Order is currently processing'
        }))
      .catch(error => response.status(500)
        .json({
          status: 'Fail',
          message: error.message
        }));
  }

  /**
  * @description - This method is responsible for Updating order status to cancelled
  *
  * @static
  * @param {object} request - Request sent to the router
  * @param {object} response - Response sent from the controller
  *
  * @returns {object} - status and object representing response message
  *
  * @memberof OrderHandler
  */

  static cancelOrder(request, response) {
    const { orderId } = request.params;
    pool.query(updateOrderStatus, ['Cancelled', orderId])
      .then(() => response.status(200)
        .json({
          message: 'Order is cancelled'
        }))
      .catch(error => response.status(500)
        .json({
          status: 'Fail',
          message: error.message
        }));
  }

  /**
  * @description - This method is responsible for Updating order status to completed
  *
  * @static
  * @param {object} request - Request sent to the router
  * @param {object} response - Response sent from the controller
  *
  * @returns {object} - status and object representing response message
  *
  * @memberof OrderHandler
  */

  static completeOrder(request, response) {
    const { orderId } = request.params;
    pool.query(updateOrderStatus, ['Completed', orderId])
      .then(() => response.status(200)
        .json({
          message: 'Order is completed'
        }))
      .catch(error => response.status(500)
        .json({
          status: 'Fail',
          message: error.message
        }));
  }

  /**
  * @description - This method is responsible for Deleting order by a user
  *
  * @static
  * @param {object} request - Request sent to the router
  * @param {object} response - Response sent from the controller
  *
  * @returns {object} - status and object representing response message
  *
  * @memberof OrderHandler
  */
  static deleteOrder(request, response) {
    const { orderId } = request.params;
    if (!Number(orderId)) {
      return response.status(401)
        .json({
          status: 'Fail',
          message: 'Invalid URL. orderId should be a positive integer greater than zero'
        });
    }
    const userId = request.authData.payload.id;
    pool.query(deleteOrderById, [orderId, userId])
      .then((result) => {
        const deletedOrder = result.rows[0];
        if (!deletedOrder) {
          return response.status(401)
            .json({
              status: 'Fail',
              message: 'Unauthorized access'
            });
        }
        return response.status(200)
          .json({
            message: 'Order deleted successfully'
          });
      })
      .catch(error => response.status(500)
        .json({
          status: 'Fail',
          message: error.message
        }));
  }
}

const {
  placeOrder, getUserOrderHistory, getAllOrders, getSpecificOrder,
  processOrder, cancelOrder, completeOrder, deleteOrder
} = OrderHandler;

export {
  placeOrder, getUserOrderHistory, getAllOrders, getSpecificOrder,
  processOrder, cancelOrder, completeOrder, deleteOrder
};
