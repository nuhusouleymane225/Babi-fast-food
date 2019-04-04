import pool from '../db/connection';
import {
  queryMenuTableById, menuQuantityAfterOrder, queryOrdersById
} from '../db/sqlQueries';

/**
  * @description class representing Validation for Orders
  *
  * @class OrderValidators
  */

class OrderValidators {
  /**
  * @description - This method is responsible for validating inputs
  *
  * @static
  * @param {object} request - Request sent to the middleware
  * @param {object} response - Response sent from the middleware
  * @param {object} next - callback function to transfer to the next method
  *
  * @returns {object} - status and object representing fail message
  *
  * @memberof OrderValidators
  */

  static placeOrderValidator(request, response, next) {
    const { orderItems } = request.body;
    let { location } = request.body;
    const userId = request.authData.payload.id;
    let total = 0;
    const promises = [];
    let newQuantity;
    if (location !== undefined) {
      if (typeof location !== 'string') {
        return response.status(400)
          .json({
            status: 'Fail',
            message: 'Invalid location. Input a string character of length 5 to 100 (alphanumeric, whitespace, comma, fullstop, and hypen are allowed)',
            sampleInput: {
              orderItems: [
                {
                  menuId: 'Number',
                  quantity: 'Number'
                },
                {
                  menuId: 'Number',
                  quantity: 'Number'
                }
              ]
            },
            location: 'string or undefined or empty'
          });
      }
      location = location.trim().replace(/\s\s+/g, ' ');
      if (location !== '') {
        if (location.length < 5 || location.length > 100) {
          return response.status(400)
            .json({
              status: 'Fail',
              message: 'Invalid location length. Input a string character of length 5 to 100 (alphanumeric, whitespace, comma, fullstop, and hypen are allowed)',
              sampleInput: {
                orderItems: [
                  {
                    menuId: 'Number',
                    quantity: 'Number'
                  },
                  {
                    menuId: 'Number',
                    quantity: 'Number'
                  }
                ]
              },
              location: 'string or undefined or empty'
            });
        }
        const validLocationCharacters = /^[a-z0-9 ,-.]+$/i;
        if (!validLocationCharacters.test(location)) {
          return response.status(400)
            .json({
              status: 'Fail',
              message: 'Invalid location character. Input a string character of length 5 to 100 (alphanumeric, whitespace, comma, fullstop, and hypen are allowed)',
              sampleInput: {
                orderItems: [
                  {
                    menuId: 'Number',
                    quantity: 'Number'
                  },
                  {
                    menuId: 'Number',
                    quantity: 'Number'
                  }
                ]
              },
              location: 'string or undefined or empty'
            });
        }
      }
    }
    orderItems.forEach((order, index, orderArray) => {
      if (order.menuId === undefined) {
        return response.status(400)
          .json({
            status: 'Fail',
            message: 'menuId is undefined. Please input menuId as a positive integer greater than zero',
            sampleInput: {
              orderItems: [
                {
                  menuId: 'Number',
                  quantity: 'Number'
                },
                {
                  menuId: 'Number',
                  quantity: 'Number'
                }
              ]
            },
            location: 'string or undefined or empty'
          });
      }
      if (order.menuId === '') {
        return response.status(400)
          .json({
            status: 'Fail',
            message: 'menuId is empty. Please input menuId as a positive integer greater than zero',
            sampleInput: {
              orderItems: [
                {
                  menuId: 'Number',
                  quantity: 'Number'
                },
                {
                  menuId: 'Number',
                  quantity: 'Number'
                }
              ]
            },
            location: 'string or undefined or empty'
          });
      }
      const validInteger = /^[0-9]+$/;
      if (!Number(order.menuId) || order.menuId < 1 || !validInteger.test(order.menuId)) {
        return response.status(400)
          .json({
            status: 'Fail',
            message: 'Invalid menuId detected. It should be a positive integer greater than zero',
            sampleInput: {
              orderItems: [
                {
                  menuId: 'Number',
                  quantity: 'Number'
                },
                {
                  menuId: 'Number',
                  quantity: 'Number'
                }
              ]
            },
            location: 'string or undefined or empty'
          });
      }
      if (order.menuId.length > 8) {
        return response.status(400)
          .json({
            status: 'Fail',
            message: `menuId '${order.menuId}' is out of range. It should be less than millions`,
            sampleInput: {
              orderItems: [
                {
                  menuId: 'Number',
                  quantity: 'Number'
                },
                {
                  menuId: 'Number',
                  quantity: 'Number'
                }
              ]
            },
            location: 'string or undefined or empty'
          });
      }
      if (!Number(order.quantity) || order.quantity < 1 || !validInteger.test(order.quantity)) {
        return response.status(400)
          .json({
            status: 'Fail',
            message: 'Invalid quantity detected. It should be a positive integer greater than zero',
            sampleInput: {
              orderItems: [
                {
                  menuId: 'Number',
                  quantity: 'Number'
                },
                {
                  menuId: 'Number',
                  quantity: 'Number'
                }
              ]
            },
            location: 'string or undefined or empty'
          });
      }
      pool.query(queryMenuTableById, [order.menuId])
        .then((result) => {
          if (result.rowCount === 0) {
            return response.status(404)
              .json({
                status: 'Fail',
                message: `Sorry the menu with 'id: ${order.menuId}' does not exist`
              });
          }
          const { price } = result.rows[0];
          order.amount = order.quantity * price;
          order.menu = result.rows[0].menu;
          total += order.amount;

          if (result.rows[0].quantity === 0) {
            return response.status(406)
              .json({
                status: 'Fail',
                message: `Sorry, '${result.rows[0].menu} (menuId: ${order.menuId})' is currently out of stock. Check again later`
              });
          }
          if (result.rows[0].quantity < order.quantity) {
            return response.status(406)
              .json({
                status: 'Fail',
                message: `Maximum quantity of '${result.rows[0].menu} (menuId: ${order.menuId})' you can order at this time is ${result.rows[0].quantity}`
              });
          }

          newQuantity = result.rows[0].quantity - order.quantity;
          promises.push(order);
          return promises;
        })
        .then((feedback) => {
          pool.query(menuQuantityAfterOrder, [newQuantity, order.menuId])
            .then(() => {});

          if (orderArray.length === feedback.length) {
            const variables = [userId, JSON.stringify(feedback), total,
              location || request.authData.payload.address];

            request.body.variables = variables;
            next();
          }
        })
        .catch(error => response.status(500)
          .json({
            message: error.message
          }));
    });
  }

  /**
  * @description - This method is responsible for validating input to params field
  *
  * @static
  * @param {object} request - Request sent to the middleware
  * @param {object} response - Response sent from the middleware
  * @param {object} next - callback function to transfer to the next method
  *
  * @returns {object} - status and object representing fail message
  *
  * @memberof OrderValidators
  */

  static getOrderHistoryValidator(request, response, next) {
    const { userId } = request.params;
    if (!Number(userId) || userId <= 0) {
      return response.status(400)
        .json({
          status: 'Fail',
          message: 'Invalid URL. userId should be a positive integer greater than zero'
        });
    }
    next();
  }

  /**
  * @description - This method is responsible for validating input to params field
  *
  * @static
  * @param {object} request - Request sent to the middleware
  * @param {object} response - Response sent from the middleware
  * @param {object} next - callback function to transfer to the next method
  *
  * @returns {object} - status and object representing fail message
  *
  * @memberof OrderValidators
  */

  static getSpecificOrderValidator(request, response, next) {
    const { orderId } = request.params;
    if (!Number(orderId) || orderId <= 0) {
      return response.status(400)
        .json({
          status: 'Fail',
          message: 'Invalid URL. orderId should be a positive integer greater than zero'
        });
    }
    next();
  }

  /**
  * @description - This method is responsible for validating orderId and status
  *
  * @static
  * @param {object} request - Request sent to the middleware
  * @param {object} response - Response sent from the middleware
  * @param {object} next - callback function to transfer to the next method
  *
  * @returns {object} - status and object representing fail message
  *
  * @memberof OrderValidators
  */

  static updateOrderValidator(request, response, next) {
    const { orderId } = request.params;
    pool.query(queryOrdersById, [orderId])
      .then((data) => {
        if (data.rowCount === 0) {
          return response.status(404)
            .json({
              status: 'Fail',
              message: 'Sorry, this order does not exists.'
            });
        }
        if (data.rows[0].status === 'Processing' || data.rows[0].status === 'Completed'
        || data.rows[0].status === 'Cancelled') {
          return response.status(406)
            .json({
              status: 'Fail',
              message: 'Sorry, this order cannot be updated at this time'
            });
        }
        next();
      })
      .catch(error => response.status(500)
        .json({
          status: 'Fail',
          message: error.message
        }));
  }

  /**
  * @description - This method is responsible for validating orderId and status
  *
  * @static
  * @param {object} request - Request sent to the middleware
  * @param {object} response - Response sent from the middleware
  * @param {object} next - callback function to transfer to the next method
  *
  * @returns {object} - status and object representing fail message
  *
  * @memberof OrderValidators
  */

  static completeOrderValidator(request, response, next) {
    const { orderId } = request.params;
    pool.query(queryOrdersById, [orderId])
      .then((data) => {
        if (data.rowCount === 0) {
          return response.status(404)
            .json({
              status: 'Fail',
              message: 'Sorry, this order does not exists.'
            });
        }
        if (data.rows[0].status !== 'Processing') {
          return response.status(406)
            .json({
              status: 'Fail',
              message: 'This order can only be completed after its been placed on processing'
            });
        }
        next();
      })
      .catch(error => response.status(500)
        .json({
          status: 'Fail',
          message: error.message
        }));
  }
}

const {
  placeOrderValidator, getOrderHistoryValidator, getSpecificOrderValidator,
  updateOrderValidator, completeOrderValidator
} = OrderValidators;

export {
  placeOrderValidator, getOrderHistoryValidator, getSpecificOrderValidator,
  updateOrderValidator, completeOrderValidator
};
