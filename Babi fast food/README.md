# Fast-Food-Fast
[![Build Status](https://travis-ci.org/marcdomain/Fast-Food-Fast.svg?branch=develop)](https://travis-ci.org/marcdomain/Fast-Food-Fast) [![Coverage Status](https://coveralls.io/repos/github/marcdomain/Fast-Food-Fast/badge.svg?branch=develop)](https://coveralls.io/github/marcdomain/Fast-Food-Fast?branch=develop) [![Maintainability](https://api.codeclimate.com/v1/badges/2d74b6d3d4da8005455f/maintainability)](https://codeclimate.com/github/marcdomain/Fast-Food-Fast/maintainability)

## Description
Fast-Food-Fast​ is a food delivery service app for a restaurant.

<br/><b>Project Plan (PIVOTAL TRACKER STORIES):</b> https://www.pivotaltracker.com/n/projects/2196535
<br/><b>UI-pages:</b> https://marcdomain.github.io/Fast-Food-Fast/UI
<br/><b> Hosted API on Heroku: </b> https://marcus-fast-food-fast.herokuapp.com/api/v1
 <br/><b> API documentation: </b> https://marcus-fast-food-fast.herokuapp.com/api-docs

## Features
Below are the features of Fast-Food-Fast Application at this point


###
- User can Signup <br>
- User can Login <br>
- Admin can post menu <br>
- User can get all available menu (all menu with quantity greater than zero)<br>
- Admin can get all menu (in stock or out of stock)<br>
- User can post Orders to the app (Orders are deducted from the available menu. When user attempts to place order with quantity beyond the stock, he/she is prompted the maximum quantity that can be ordered at that time.)<br>
- User can get his/her order history<br/>
- User can delete a Specific order<br/>
- Admin can also get order history of specific user <br>
- Admin can get all orders in the app <br>
- Admin can get a Specific order<br/>
- Admin can process a specific order <br>
- Admin can cancel a specific order <br>
- Admin can complete a specific order <br>
- Admin can update a specific menu <br>
- Admin can delete a sepecific menu <br>
- Admin can get a specific menu 
<br/>

## API Endpoints

<table>

<tr><th>HTTP VERB</th><th>API ENDPOINT</th><th>FUNCTION</th><th>INPUT</th><th>OUTPUT</th></tr>

<tr>
<td>POST</td> <td>api/v1/auth/signup</td>  <td>Signup user</td>
<td>
{<br> name: "string",<br>email: "string",<br>phone: "string",<br> address: "string",<br>password: "string"<br>}
</td>
<td>
{<br> message: "string",<br>token: "string"<br>}
</td>
</tr>

<tr>
<td>POST</td> <td>api/v1/auth/login</td>  <td>Login user</td>
<td>
{<br> email: "string",<br>password: "string"<br>}
</td>
<td>
{<br> message: "string",<br>token: "string"<br>}
</td>
</tr>

<tr>
<td>POST</td> <td>api/v1/menu</td>  <td>Create new menu</td>
<td>
{<br> menu: "string",<br>description: "string",<br>category: "string",<br>quantity: "string",<br>price: "string"<br>}<br>"Authorization": "token"
</td>
<td>{<br>message: "string"<br>menu: {object}<br>}</td>
</tr>

<tr>
<td>GET</td> <td>api/v1/menu</td>  <td>Get All Available Menu</td>
<td>"Authorization": "token" or undefined</td>
<td>{<br>message: "string"<br>allMenu: {object}<br>}</td>
</tr>

<tr>
<td>GET</td> <td>api/v1/menu/admin</td>  <td>Get All Menu in Database</td>
<td>"Authorization": "token"</td>
<td>{<br>message: "string"<br>allMenu: {object}<br>}</td>
</tr>

<tr>
<td>GET</td> <td>api/v1/menu/:menuId</td>  <td>Get A Specific Menu</td>
<td>menuId: "Number"<br>"Authorization": "token"</td>
<td>{<br>message: "string"<br>foundMenu: {object}<br>}</td>
</tr>

<tr>
<td>PUT</td> <td>api/v1/menu/:menuId</td>  <td>Update menu</td>
<td>
{<br> menu: "string",<br>description: "string",<br>category: "string",<br>quantity: "string",<br>price: "string"<br>}
<br>menuId: "Number"
<br>"Authorization": "token"
</td>
<td>{<br>message: "string"<br>menu: {object}<br>}</td>
</tr>

<tr>
<td>DELETE</td> <td>api/v1/menu/:menuId</td>  <td>Update menu</td>
<td>
menuId: "Number"<br>"Authorization": "token"
</td>
<td>{<br>message: "string"<br>menu: {object}<br>}</td>
</tr>

<tr><td>POST</td> <td>api/v1/orders</td>  <td>Place order</td>
<td>{<br>orderItems: [<br>{<br>menuId: "Number",<br>quantity: "Number"<br>}<br>],<br>location: "string" or undefined,<br>}<br>"Authorization": "token"</td>
<td>{<br>message: "string",<br>newOrder: {object}<br>}</td>
</tr>

<tr>
<td>GET</td> <td>api/v1/users/:userId/orders</td>  <td>Get user order history</td>
<td>userId: "Number"<br>"Authorization": "token"</td>
<td>{<br>message: "string"<br>orderHistory: {object}<br>}</td>
</tr>

<tr>
<td>DELETE</td> <td>api/v1/orders/:orderId</td>  <td>Delete specific order</td>
<td>"Authorization": "token"</td>
<td>{<br>message: "string"<br>}</td>
</tr>

<tr>
<td>GET</td> <td>api/v1/orders</td>  <td>Get all orders</td>
<td>"Authorization": "token"</td>
<td>{<br>message: "string"<br>allOrders: {object}<br>}</td>
</tr>

<tr>
<td>GET</td> <td>api/v1/orders/:orderId</td>  <td>Get specific order</td>
<td>"Authorization": "token"</td>
<td>{<br>message: "string"<br>foundOrder: {object}<br>}</td>
</tr>

<tr>
<td>PUT</td> <td>api/v1/orders/:orderId/process</td>  <td>Process specific order</td>
<td>"Authorization": "token"</td>
<td>{<br>message: "string"<br>}</td>
</tr>

<tr>
<td>PUT</td> <td>api/v1/orders/:orderId/cancel</td>  <td>Cancel specific order</td>
<td>"Authorization": "token"</td>
<td>{<br>message: "string"<br>}</td>
</tr>

<tr>
<td>PUT</td> <td>api/v1/orders/:orderId/complete</td>  <td>Complete specific order</td>
<td>"Authorization": "token"</td>
<td>{<br>message: "string"<br>}</td>
</tr>

</table>

## Installation
1. Clone this repository below:
```
https://github.com/marcdomain/Fast-Food-Fast
```
2. cd into the repository:
```
cd Fast-Food-Fast
```
3. Open the repository in terminal and Install dependencies by running:
```
npm install
```
4. Create a database for the project

5. Create a .env file in the root directory and setup your database credentials and token key

6. Run "npm start" to start the app

7. Use Postman to test all endpoints

8. Run "npm test" to test all endpoints


## Technologies

ES6: See [here](https://en.wikipedia.org/wiki/ECMAScript) for details.

NodeJS: An open-source, cross-platform JavaScript run-time environment which allows you enjoy the features of Javascript off the web browsers and implement server-side web development. Visit [here](https://nodejs.org/en/) for details.

ExressJS: This is the web application framework for Node.js Visit [here](https://expressjs.com) for details.

Postgresql Database: PostgreSQL is a powerful, open source object-relational database system that uses and extends the SQL language combined with many features that safely store and scale the most complicated data workloads. Visit [here](https://www.postgresql.org/docs) for details.

Airbnb JavaScript style guide was adopted as a coding convention, see [here](https://github.com/airbnb/javascript) for details.


**_This project is under development phase. STAY TUNED_**
