import bcrypt, { compareSync } from 'bcrypt';
import pool from '../db/connection';
import { createToken } from '../middlewares/authorization';
import { createUser, queryUsersByEmail } from '../db/sqlQueries';

/**
  * @description class representing User Authentication
  *
  * @class UserHandler
  */

class UserHandler {
  /**
  * @description - This method is responsible for creating new users
  *
  * @static
  * @param {object} request - Request sent to the router
  * @param {object} response - Response sent from the controller
  *
  * @returns {object} - status and object representing response message
  *
  * @memberof UserHandler
  */

  static userSignup(request, response) {
    const variables = [
      request.body.name,
      request.body.email,
      request.body.phone,
      request.body.address,
      bcrypt.hashSync(request.body.password, 10)
    ];
    pool.query(createUser, variables)
      .then((data) => {
        const authUser = data.rows[0];
        const username = authUser.email.split('@')[0];
        const token = createToken(authUser);
        return response.status(201)
          .json({
            message: `Hey ${username}, welcome to Marcus Fast-Food-Fast`,
            token
          });
      })
      .catch(error => response.status(500)
        .json({
          status: 'Fail',
          message: error.message
        }));
  }

  /**
  * @description - This method is responsible for loggin in users
  *
  * @static
  * @param {object} request - Request sent to the router
  * @param {object} response - Response sent from the controller
  *
  * @returns {object} - status and object representing response message
  *
  * @memberof UserHandler
  */

  static userLogin(request, response) {
    const variable = [request.body.email];
    pool.query(queryUsersByEmail, variable)
      .then((result) => {
        if (result.rowCount !== 0) {
          const comparePassword = compareSync(request.body.password, result.rows[0].password);
          if (comparePassword) {
            const authUser = result.rows[0];
            const username = variable[0].split('@')[0];
            const token = createToken(authUser);
            return response.status(200)
              .json({
                message: `Welcome back ${username}`,
                token
              });
          }
          response.status(401)
            .json({
              status: 'Fail',
              message: 'Incorrect password. Please input your correct password',
            });
        }
        if (result.rowCount === 0) {
          response.status(404)
            .json({
              status: 'Fail',
              message: 'Email not found. Please signup',
            });
        }
      })
      .catch((error) => {
        response.json({
          status: 'Fail',
          message: error.message,
        });
      });
  }
}

const { userSignup, userLogin } = UserHandler;

export { userSignup, userLogin };
