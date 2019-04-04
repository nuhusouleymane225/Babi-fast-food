import pool from '../db/connection';
import { queryUsersByEmail, queryUsersByPhone } from '../db/sqlQueries';

/**
  * @description class representing Validations of user input
  *
  * @class UserValidationHandler
  */

class UserValidationHandler {
  /**
  * @description - This method is responsible for validating signup inputs
  *
  * @static
  * @param {object} request - Request sent to the middleware
  * @param {object} response - Response sent from the middleware
  * @param {object} next - callback function to transfer to the next method
  *
  * @returns {object} - status and object representing fail message
  *
  * @memberof UserValidationHandler
  */

  static signupValidator(request, response, next) {
    let {
      name, email, phone, address, password
    } = request.body;

    if (name === undefined) {
      return response.status(400)
        .json({
          status: 'Fail',
          message: 'Name cannot be undefined. Input 4 to 50 alphabets',
          sampleCredentials: '{"name": "string", "email": "string", "phone": "string", "address", "string", "password": "string"}'
        });
    }
    if (typeof name !== 'string') {
      return response.status(400)
        .json({
          status: 'Fail',
          message: 'Name should be a string. Input 4 to 50 alphabets',
          sampleCredentials: '{"name": "string", "email": "string", "phone": "string", "address", "string", "password": "string"}'
        });
    }
    if (name === '') {
      return response.status(400)
        .json({
          status: 'Fail',
          message: 'Name cannot be empyt. Input 4 to 50 alphabets',
          sampleCredentials: '{"name": "string", "email": "string", "phone": "string", "address", "string", "password": "string"}'
        });
    }
    name = name.trim().replace(/\s\s+/g, ' ');
    if (name.length < 4 || name.length > 50) {
      return response.status(400)
        .json({
          status: 'Fail',
          message: 'Name should be 4 to 50 aplhabets long',
          sampleCredentials: '{"name": "string", "email": "string", "phone": "string", "address", "string", "password": "string"}'
        });
    }
    const validNameCharacters = /^[a-z ]+$/i;
    if (!validNameCharacters.test(name)) {
      return response.status(400)
        .json({
          status: 'Fail',
          message: 'Name accepts only alphabet and whitespace',
          sampleCredentials: '{"name": "string", "email": "string", "phone": "string", "address", "string", "password": "string"}'
        });
    }

    if (email === undefined) {
      return response.status(400)
        .json({
          status: 'Fail',
          message: 'Email cannot be undefined',
          sampleCredentials: '{"name": "string", "email": "string", "phone": "string", "address", "string", "password": "string"}'
        });
    }
    if (typeof email !== 'string') {
      return response.status(400)
        .json({
          status: 'Fail',
          message: 'Email should be a string. Input an email 8 to 50 characters',
          sampleCredentials: '{"name": "string", "email": "string", "phone": "string", "address", "string", "password": "string"}'
        });
    }
    if (email === '') {
      return response.status(400)
        .json({
          status: 'Fail',
          message: 'Email field cannot be empty. Input an email 8 to 50 characters',
          sampleCredentials: '{"name": "string", "email": "string", "phone": "string", "address", "string", "password": "string"}'
        });
    }
    const validEmailCharacter = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!validEmailCharacter.test(email)) {
      return response.status(400)
        .json({
          status: 'Fail',
          message: "Please input a valid email format 'example@domain.com'",
          sampleCredentials: '{"name": "string", "email": "string", "phone": "string", "address", "string", "password": "string"}'
        });
    }
    email = email.toLowerCase().trim();
    if (email.length < 8 || email.length > 50) {
      return response.status(400)
        .json({
          status: 'Fail',
          message: 'Email should be 8 to 50 characters',
          sampleCredentials: '{"name": "string", "email": "string", "phone": "string", "address", "string", "password": "string"}'
        });
    }
    pool.query(queryUsersByEmail, [email])
      .then((data) => {
        if (data.rowCount !== 0) {
          return response.status(409)
            .json({
              status: 'Fail',
              message: 'Email already exist, please Signup with a new one'
            });
        }
        if (phone === undefined) {
          return response.status(400)
            .json({
              status: 'Fail',
              message: 'Phone is undefined. Input integer of 7 to 13 characters long',
              sampleCredentials: '{"name": "string", "email": "string", "phone": "string", "address", "string", "password": "string"}'
            });
        }
        if (typeof phone !== 'string') {
          return response.status(400)
            .json({
              status: 'Fail',
              message: 'Phone should be a string. Input integer of 7 to 13 characters long',
              sampleCredentials: '{"name": "string", "email": "string", "phone": "string", "address", "string", "password": "string"}'
            });
        }
        if (phone === '') {
          return response.status(400)
            .json({
              status: 'Fail',
              message: 'Phone field cannot be empty. Input integer of 7 to 13 characters long',
              sampleCredentials: '{"name": "string", "email": "string", "phone": "string", "address", "string", "password": "string"}'
            });
        }
        phone = phone.trim();
        if (phone.length < 7 || phone.length > 13) {
          return response.status(400)
            .json({
              status: 'Fail',
              message: 'Phone should be integer of 7 to 13 characters long',
              sampleCredentials: '{"name": "string", "email": "string", "phone": "string", "address", "string", "password": "string"}'
            });
        }
        const validPhoneCharacter = /^[0-9]*$/;
        if (!validPhoneCharacter.test(phone)) {
          return response.status(400)
            .json({
              status: 'Fail',
              message: 'Phone should be positive integer of length 7 to 13',
              sampleCredentials: '{"name": "string", "email": "string", "phone": "string", "address", "string", "password": "string"}'
            });
        }
        if (!Number(phone)) {
          return response.status(400)
            .json({
              status: 'Fail',
              message: 'Phone should be a positive integer of length 7 to 13',
              sampleCredentials: '{"name": "string", "email": "string", "phone": "string", "address", "string", "password": "string"}'
            });
        }
        pool.query(queryUsersByPhone, [phone])
          .then((result) => {
            if (result.rowCount !== 0) {
              return response.status(409)
                .json({
                  status: 'Fail',
                  message: 'Phone number already exist, please Signup with a new one',
                  sampleCredentials: '{"name": "string", "email": "string", "phone": "string", "address", "string", "password": "string"}'
                });
            }
            if (address === undefined) {
              return response.status(400)
                .json({
                  status: 'Fail',
                  message: 'Address is undefined. Input 5 to 100 characters (alphanumeric, comma, hyphen and whitespace)',
                  sampleCredentials: '{"name": "string", "email": "string", "phone": "string", "address", "string", "password": "string"}'
                });
            }
            if (typeof address !== 'string') {
              return response.status(400)
                .json({
                  status: 'Fail',
                  message: 'Address should be a string. Input 5 to 100 characters (alphanumeric, comma, hyphen and whitespace)',
                  sampleCredentials: '{"name": "string", "email": "string", "phone": "string", "address", "string", "password": "string"}'
                });
            }
            if (address === '') {
              return response.status(400)
                .json({
                  status: 'Fail',
                  message: 'Address should be 5 to 100 characters (alphanumeric, comma, hyphen and whitespace)',
                  sampleCredentials: '{"name": "string", "email": "string", "phone": "string", "address", "string", "password": "string"}'
                });
            }
            address = address.trim().replace(/\s\s+/g, ' ');
            if (address.length < 5 || address.length > 100) {
              return response.status(400)
                .json({
                  status: 'Fail',
                  message: 'Address should be 5 to 100 characters (alphanumeric, comma, hyphen and whitespace)',
                  sampleCredentials: '{"name": "string", "email": "string", "phone": "string", "address", "string", "password": "string"}'
                });
            }
            const validAddressCharacter = /^[a-z0-9 ,-.]+$/i;
            if (!validAddressCharacter.test(address)) {
              return response.status(400)
                .json({
                  status: 'Fail',
                  message: 'Address should be 5 to 100 characters (alphanumeric, comma, hyphen and whitespace)',
                  sampleCredentials: '{"name": "string", "email": "string", "phone": "string", "address", "string", "password": "string"}'
                });
            }
            if (password === undefined) {
              return response.status(400)
                .json({
                  status: 'Fail',
                  message: 'Password is undefined. Input 4 to 20 characters',
                  sampleCredentials: '{"name": "string", "email": "string", "phone": "string", "address", "string", "password": "string"}'
                });
            }
            if (typeof password !== 'string') {
              return response.status(400)
                .json({
                  status: 'Fail',
                  message: 'Password should be a string. Input 4 to 20 characters',
                  sampleCredentials: '{"name": "string", "email": "string", "phone": "string", "address", "string", "password": "string"}'
                });
            }
            if (password === '') {
              return response.status(400)
                .json({
                  status: 'Fail',
                  message: 'Password cannot be empty. Input 4 to 20 characters',
                  sampleCredentials: '{"name": "string", "email": "string", "phone": "string", "address", "string", "password": "string"}'
                });
            }
            password = password.trim();
            if (password.length < 4 || password.length > 20) {
              return response.status(400)
                .json({
                  status: 'Fail',
                  message: 'Invalid password length. Input 4 to 20 characters',
                  sampleCredentials: '{"name": "string", "email": "string", "phone": "string", "address", "string", "password": "string"}'
                });
            }
            if (password.includes(' ')) {
              return response.status(400)
                .json({
                  status: 'Fail',
                  message: 'Remove whitespace from your password and input 4 to 20 characters',
                  sampleCredentials: '{"name": "string", "email": "string", "phone": "string", "address", "string", "password": "string"}'
                });
            }
            request.body.name = name;
            request.body.email = email;
            request.body.phone = phone;
            request.body.address = address;
            request.body.password = password;
            next();
          });
      })
      .catch(error => response.status(500)
        .json({
          status: 'Fail',
          message: error.message
        }));
  }

  /**
  * @description - This method is responsible for validating login inputs
  *
  * @static
  * @param {object} request - Request sent to the middleware
  * @param {object} response - Response sent from the middleware
  * @param {object} next - callback function to transfer to the next method
  *
  * @returns {object} - status and object representing fail message
  *
  * @memberof UserValidationHandler
  */

  static loginValidator(request, response, next) {
    let { email, password } = request.body;
    if (email === undefined) {
      return response.status(400)
        .json({
          status: 'Fail',
          message: 'Email is undefined',
          sampleCredentials: '{"email": "string", "password": "string"}'
        });
    }
    if (typeof email !== 'string') {
      return response.status(400)
        .json({
          status: 'Fail',
          message: 'Email should be a string',
          sampleCredentials: '{"email": "string", "password": "string"}'
        });
    }
    email = email.toLowerCase().trim();
    if (email === '') {
      return response.status(400)
        .json({
          status: 'Fail',
          message: 'Email cannot be empty.',
          sampleCredentials: '{"email": "string", "password": "string"}'
        });
    }
    pool.query(queryUsersByEmail, [email])
      .then((result) => {
        if (result.rowCount === 0) {
          return response.status(404)
            .json({
              status: 'Fail',
              message: 'Email not found. Please signup',
              sampleCredentials: '{"name": "string", "email": "string", "phone": "string", "address", "string", "password": "string"}'
            });
        }
        if (password === undefined) {
          return response.status(400)
            .json({
              status: 'Fail',
              message: 'Password is undefined. Please input your password',
              sampleCredentials: '{"email": "string", "password": "string"}'
            });
        }
        if (typeof password !== 'string') {
          return response.status(400)
            .json({
              status: 'Fail',
              message: 'Password should be a string',
              sampleCredentials: '{"email": "string", "password": "string"}'
            });
        }
        password = password.trim();
        if (password === '') {
          return response.status(400)
            .json({
              status: 'Fail',
              message: 'Password is empty. Please input your password',
              sampleCredentials: '{"email": "string", "password": "string"}'
            });
        }

        request.body.password = password;
        request.body.email = email;
        next();
      })
      .catch(error => response.status(500)
        .json({
          message: error.message
        }));
  }
}

const { signupValidator, loginValidator } = UserValidationHandler;

export { signupValidator, loginValidator };
