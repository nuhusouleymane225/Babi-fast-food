import pool from '../db/connection';
import { queryMenuTableById } from '../db/sqlQueries';

/**
  * @description class representing Validations for Menu
  *
  * @class MenuValidationHandler
  */

class MenuValidationHandler {
  /**
  * @description - This method is responsible for validating admin inputs
  *
  * @static
  * @param {object} request - Request sent to the middleware
  * @param {object} response - Response sent from the middleware
  * @param {object} next - callback function to transfer to the next method
  *
  * @returns {object} - status and object representing fail message
  *
  * @memberof MenuValidationHandler
  */

  static postMenuValidator(request, response, next) {
    let {
      menu, description, category, imageURL, quantity, price
    } = request.body;
    if (menu === undefined) {
      return response.status(400)
        .json({
          status: 'Fail',
          message: 'Menu is undefined. Input characters of length 3 to 30 (alphabets, whitespace, comma, hyphen)',
          sampleMenu: '{"menu": "string", "description": "string", "category": "string", "imageURL": "string", "quantity", "string", "price": "string"}'
        });
    }
    if (typeof menu !== 'string') {
      return response.status(400)
        .json({
          status: 'Fail',
          message: 'Menu should be a string. Input characters of length 3 to 30 (alphabets, whitespace, comma, hyphen)',
          sampleMenu: '{"menu": "string", "description": "string", "category": "string", "imageURL": "string", "quantity", "string", "price": "string"}'
        });
    }
    if (menu === '') {
      return response.status(400)
        .json({
          status: 'Fail',
          message: 'Menu is empty. Input characters of length 3 to 30 (alphabets, whitespace, comma, hyphen)',
          sampleMenu: '{"menu": "string", "description": "string", "category": "string", "imageURL": "string", "quantity", "string", "price": "string"}'
        });
    }
    menu = menu.trim().toLowerCase().replace(/\s\s+/g, ' ');
    if (menu.length < 3 || menu.length > 30) {
      return response.status(400)
        .json({
          status: 'Fail',
          message: 'Invalid menu length. Input characters of length 3 to 30 (alphabets, whitespace, comma, hyphen)',
          sampleMenu: '{"menu": "string", "description": "string", "category": "string", "imageURL": "string", "quantity", "string", "price": "string"}'
        });
    }
    const validMealCharacters = /^[a-z ,-]+$/i;
    if (!validMealCharacters.test(menu)) {
      return response.status(400)
        .json({
          status: 'Fail',
          message: 'Invalid menu character detected. Input characters of length 3 to 30 (alphabets, whitespace, comma, hyphen)',
          sampleMenu: '{"menu": "string", "description": "string", "category": "string", "imageURL": "string", "quantity", "string", "price": "string"}'
        });
    }
    if (description === undefined) {
      return response.status(400)
        .json({
          status: 'Fail',
          message: 'Description is undefined. Input characters of length 5 to 100 (alphanumeric, whitespace, comma, hyphen, fullstop)',
          sampleMenu: '{"menu": "string", "description": "string", "category": "string", "imageURL": "string", "quantity", "string", "price": "string"}'
        });
    }
    if (typeof description !== 'string') {
      return response.status(400)
        .json({
          status: 'Fail',
          message: 'Description should be a string. Input characters of length 5 to 100 (alphanumeric, whitespace, comma, hyphen, fullstop)',
          sampleMenu: '{"menu": "string", "description": "string", "category": "string", "imageURL": "string", "quantity", "string", "price": "string"}'
        });
    }
    if (description === '') {
      return response.status(400)
        .json({
          status: 'Fail',
          message: 'Description is empty. Input characters of length 5 to 100 (alphanumeric, whitespace, comma, hyphen, fullstop)',
          sampleMenu: '{"menu": "string", "description": "string", "category": "string", "imageURL": "string", "quantity", "string", "price": "string"}'
        });
    }
    description = description.trim().replace(/\s\s+/g, ' ');
    if (description.length < 5 || description.length > 100) {
      return response.status(400)
        .json({
          status: 'Fail',
          message: 'Invalid description length. Input characters of length 5 to 100 (alphanumeric, whitespace, comma, hyphen, fullstop)',
          sampleMenu: '{"menu": "string", "description": "string", "category": "string", "imageURL": "string", "quantity", "string", "price": "string"}'
        });
    }
    const validDescriptionCharacter = /^[a-z0-9 .,-]+$/i;
    if (!validDescriptionCharacter.test(description)) {
      return response.status(400)
        .json({
          status: 'Fail',
          message: 'Invalid description character detected. Input characters of length 5 to 100 (alphanumeric, whitespace, comma, hyphen, fullstop)',
          sampleMenu: '{"menu": "string", "description": "string", "category": "string", "imageURL": "string", "quantity", "string", "price": "string"}'
        });
    }
    if (category === undefined) {
      return response.status(400)
        .json({
          status: 'Fail',
          message: 'Category is undefined. Input characters of length 3 to 50 (alphanumeric, whitespace, and hyphen)',
          sampleMenu: '{"menu": "string", "description": "string", "category": "string", "imageURL": "string", "quantity", "string", "price": "string"}'
        });
    }
    if (typeof category !== 'string') {
      return response.status(400)
        .json({
          status: 'Fail',
          message: 'Category should be a string of length 3 to 50 (alphanumeric, whitespace, and hyphen)',
          sampleMenu: '{"menu": "string", "description": "string", "category": "string", "imageURL": "string", "quantity", "string", "price": "string"}'
        });
    }
    if (category === '') {
      return response.status(400)
        .json({
          status: 'Fail',
          message: 'Category is empty. Input characters of length 3 to 50 (alphanumeric, whitespace, and hyphen)',
          sampleMenu: '{"menu": "string", "description": "string", "category": "string", "imageURL": "string", "quantity", "string", "price": "string"}'
        });
    }
    category = category.trim().toLowerCase().replace(/\s\s+/g, ' ');
    const validCategoryCharacter = /^([a-z0-9 -]){3,50}$/i;
    if (!validCategoryCharacter.test(category)) {
      return response.status(400)
        .json({
          status: 'Fail',
          message: 'Invalid category. Input characters of length 3 to 50 (alphanumeric, whitespace, and hyphen)',
          sampleMenu: '{"menu": "string", "description": "string", "category": "string", "imageURL": "string", "quantity", "string", "price": "string"}'
        });
    }
    if (imageURL === undefined) {
      return response.status(400)
        .json({
          status: 'Fail',
          message: 'imageURL is undefined. Input a valid one',
          sampleMenu: '{"menu": "string", "description": "string", "category": "string", "imageURL": "string", "quantity", "string", "price": "string"}'
        });
    }
    if (typeof imageURL !== 'string') {
      return response.status(400)
        .json({
          status: 'Fail',
          message: 'imageURL should be a string',
          sampleMenu: '{"menu": "string", "description": "string", "category": "string", "imageURL": "string", "quantity", "string", "price": "string"}'
        });
    }
    if (imageURL === '') {
      return response.status(400)
        .json({
          status: 'Fail',
          message: 'imageURL is empty. Input a valid one',
          sampleMenu: '{"menu": "string", "description": "string", "category": "string", "imageURL": "string", "quantity", "string", "price": "string"}'
        });
    }
    imageURL = imageURL.trim().replace(/\s\s+/g, '');
    const splitURL = imageURL.split('.');
    const validImage = splitURL[splitURL.length - 1];

    if (validImage.toLowerCase() !== 'jpg' && validImage.toLowerCase() !== 'jpeg'
    && validImage.toLowerCase() !== 'png' && validImage.toLowerCase() !== 'gif') {
      return response.status(400)
        .json({
          status: 'Fail',
          message: 'Invalid imageURL detected. Valid format are .jpg, .jpeg, .png, .gif',
          sampleMenu: '{"menu": "string", "description": "string", "category": "string", "imageURL": "string", "quantity", "string", "price": "string"}'
        });
    }
    if (quantity === undefined) {
      return response.status(400)
        .json({
          status: 'Fail',
          message: 'Quantity is undefined. Input positive integer greater than zero and of length 1 to 4',
          sampleMenu: '{"menu": "string", "description": "string", "category": "string", "imageURL": "string", "quantity", "string", "price": "string"}'
        });
    }
    if (typeof quantity !== 'string') {
      return response.status(400)
        .json({
          status: 'Fail',
          message: 'Quantity should be a string. Input positive integer greater than zero and of length 1 to 4',
          sampleMenu: '{"menu": "string", "description": "string", "category": "string", "imageURL": "string", "quantity", "string", "price": "string"}'
        });
    }
    if (quantity === '') {
      return response.status(400)
        .json({
          status: 'Fail',
          message: 'Quantity is empty. Input positive integer greater than zero and of length 1 to 4',
          sampleMenu: '{"menu": "string", "description": "string", "category": "string", "imageURL": "string", "quantity", "string", "price": "string"}'
        });
    }
    quantity = quantity.trim();
    if (quantity.length < 1 || quantity.length > 4) {
      return response.status(400)
        .json({
          status: 'Fail',
          message: 'Invalid quantity length. Input positive integer greater than zero and of length 1 to 4',
          sampleMenu: '{"menu": "string", "description": "string", "category": "string", "imageURL": "string", "quantity", "string", "price": "string"}'
        });
    }
    if (quantity < 1) {
      return response.status(400)
        .json({
          status: 'Fail',
          message: 'Invalid quantity. Input positive integer greater than zero and of length 1 to 4',
          sampleMenu: '{"menu": "string", "description": "string", "category": "string", "imageURL": "string", "quantity", "string", "price": "string"}'
        });
    }
    const validQuantityCharacter = /^[0-9]+$/;
    if (!validQuantityCharacter.test(quantity)) {
      return response.status(400)
        .json({
          status: 'Fail',
          message: 'Invalid quantity character detected. Input positive integer greater than zero and of length 1 to 4',
          sampleMenu: '{"menu": "string", "description": "string", "category": "string", "imageURL": "string", "quantity", "string", "price": "string"}'
        });
    }
    if (price === undefined) {
      return response.status(400)
        .json({
          status: 'Fail',
          message: 'Price is undefined. Input positive integer greater than zero but less than length of 10',
          sampleMenu: '{"menu": "string", "description": "string", "category": "string", "imageURL": "string", "quantity", "string", "price": "string"}'
        });
    }
    if (typeof price !== 'string') {
      return response.status(400)
        .json({
          status: 'Fail',
          message: 'Price should be a string. Input positive integer greater than zero but less than length of 10',
          sampleMenu: '{"menu": "string", "description": "string", "category": "string", "imageURL": "string", "quantity", "string", "price": "string"}'
        });
    }
    if (price === '') {
      return response.status(400)
        .json({
          status: 'Fail',
          message: 'Price is empty. Input positive integer greater than zero but less than length of 10',
          sampleMenu: '{"menu": "string", "description": "string", "category": "string", "imageURL": "string", "quantity", "string", "price": "string"}'
        });
    }
    price = price.trim();
    if (price < 1) {
      return response.status(400)
        .json({
          status: 'Fail',
          message: 'Invalid price. Input positive integer greater than zero but less than length of 10',
          sampleMenu: '{"menu": "string", "description": "string", "category": "string", "imageURL": "string", "quantity", "string", "price": "string"}'
        });
    }
    const validPriceCharacter = /^([0-9]){1,6}$/;
    if (!validPriceCharacter.test(price)) {
      return response.status(400)
        .json({
          status: 'Fail',
          message: 'Invalid price character detected. Input positive integer greater than zero but less than length of 10',
          sampleMenu: '{"menu": "string", "description": "string", "category": "string", "imageURL": "string", "quantity", "string", "price": "string"}'
        });
    }
    request.body.menu = menu;
    request.body.description = description;
    request.body.category = category;
    request.body.imageURL = imageURL;
    request.body.quantity = quantity;
    request.body.price = price;
    next();
  }

  static getSpecificMenuValidator(request, response, next) {
    const { menuId } = request.params;
    if (!Number(menuId) || menuId < 1) {
      return response.status(404)
        .json({
          status: 'Fail',
          message: 'menuId should be a positive integer greater than zero'
        });
    }
    if (!/^[0-9]+$/.test(menuId)) {
      return response.status(404)
        .json({
          status: 'Fail',
          message: 'menuId should be a positive integer greater than zero'
        });
    }
    pool.query(queryMenuTableById, [menuId])
      .then((result) => {
        if (result.rowCount === 0) {
          return response.status(404)
            .json({
              status: 'Fail',
              message: 'Menu not found'
            });
        }
        const foundMenu = result.rows[0];
        request.body.foundMenu = foundMenu;
        request.params.menuId = menuId;

        next();
      })
      .catch(error => response.status(500)
        .json({
          status: 'Fail',
          message: error.message
        }));
  }
}

const { postMenuValidator, getSpecificMenuValidator } = MenuValidationHandler;

export { postMenuValidator, getSpecificMenuValidator };
