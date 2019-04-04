import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import {
  successfulOrder, invalidLocationLength, invalidLocationCharacter, undefinedQuantity,
  emptyQuantity, invalidQuantity, excessQuantity, unstringedLocation, outOfStockMenu,
  successfulOrder2, nonExistingMenuId
} from './mockData/orderMock';

const { expect } = chai;

chai.use(chaiHttp);
let userToken;
let adminToken;

describe('Test Homepage API Endpoint', () => {
  it('Should return status code 200 for success', (done) => {
    chai.request(app)
      .get('/api/v1')
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body.message).to.equal('Welcome to Fast-Food-Fast');
        done();
      });
  });
});

describe('Test Invalid URL', () => {
  it('Should return status code 404', (done) => {
    chai.request(app)
      .get('/invalid/undefined/route')
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body.message).to.equal('oooop! This page does not exist');
        done();
      });
  });
});

describe('Create Token for testing Order Endpoints', () => {
  it('should return token for successful login', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'marcus2cu@yahoo.com',
        password: 'marcpass'
      })
      .end((error, response) => {
        expect(response).to.have.status(200);
        userToken = response.body.token;
        done();
      });
  });
  it('should return token for successful login', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'admin@gmail.com',
        password: 'adminuser'
      })
      .end((error, response) => {
        expect(response).to.have.status(200);
        adminToken = response.body.token;
        done();
      });
  });
});

describe('Test for POST order', () => {
  it('Should return 406 for excess quantity', (done) => {
    chai.request(app)
      .post('/api/v1/orders')
      .set('authorization', userToken)
      .send(excessQuantity)
      .end((error, response) => {
        expect(response).to.have.status(406);
        expect(response.body).to.be.a('object');
        done();
      });
  });
  it('Should return 201 for success', (done) => {
    chai.request(app)
      .post('/api/v1/orders')
      .set('authorization', userToken)
      .send(successfulOrder)
      .end((error, response) => {
        expect(response).to.have.status(201);
        expect(response.body.message).to.equal('Order placed successfully');
        done();
      });
  });
  it('Should return 201 for success', (done) => {
    chai.request(app)
      .post('/api/v1/orders')
      .set('authorization', userToken)
      .send(successfulOrder2)
      .end((error, response) => {
        expect(response).to.have.status(201);
        expect(response.body.message).to.equal('Order placed successfully');
        done();
      });
  });
  it('Should return 400 for unstringed location', (done) => {
    chai.request(app)
      .post('/api/v1/orders')
      .set('authorization', userToken)
      .send(unstringedLocation)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.message).to.equal('Invalid location. Input a string character of length 5 to 100 (alphanumeric, whitespace, comma, fullstop, and hypen are allowed)');
        done();
      });
  });
  it('Should return 400 for invalid location length', (done) => {
    chai.request(app)
      .post('/api/v1/orders')
      .set('authorization', userToken)
      .send(invalidLocationLength)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.message).to.equal('Invalid location length. Input a string character of length 5 to 100 (alphanumeric, whitespace, comma, fullstop, and hypen are allowed)');
        done();
      });
  });
  it('Should return 400 for invalid location character', (done) => {
    chai.request(app)
      .post('/api/v1/orders')
      .set('authorization', userToken)
      .send(invalidLocationCharacter)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.message).to.equal('Invalid location character. Input a string character of length 5 to 100 (alphanumeric, whitespace, comma, fullstop, and hypen are allowed)');
        done();
      });
  });
  it('Should return 400 for non-existing menuId', (done) => {
    chai.request(app)
      .post('/api/v1/orders')
      .set('authorization', userToken)
      .send(nonExistingMenuId)
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body).to.be.a('object');
        done();
      });
  });
  it('Should return 400 for undefined quantity', (done) => {
    chai.request(app)
      .post('/api/v1/orders')
      .set('authorization', userToken)
      .send(undefinedQuantity)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.message).to.equal('Invalid quantity detected. It should be a positive integer greater than zero');
        done();
      });
  });
  it('Should return 400 for empty quantity', (done) => {
    chai.request(app)
      .post('/api/v1/orders')
      .set('authorization', userToken)
      .send(emptyQuantity)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.message).to.equal('Invalid quantity detected. It should be a positive integer greater than zero');
        done();
      });
  });
  it('Should return 400 for invalid quantity', (done) => {
    chai.request(app)
      .post('/api/v1/orders')
      .set('authorization', userToken)
      .send(invalidQuantity)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.message).to.equal('Invalid quantity detected. It should be a positive integer greater than zero');
        done();
      });
  });
  it('Should return 406 for out-of-stock menu', (done) => {
    chai.request(app)
      .post('/api/v1/orders')
      .set('authorization', userToken)
      .send(outOfStockMenu)
      .end((error, response) => {
        expect(response).to.have.status(406);
        expect(response.body).to.be.a('object');
        done();
      });
  });
});

describe('Test GET User Order History Endpoint', () => {
  it('Should return 200 for success when usertype = user', (done) => {
    chai.request(app)
      .get('/api/v1/users/2/orders')
      .set('authorization', userToken)
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.a('object');
        expect(response.body).to.have.property('orderHistory');
        done();
      });
  });
  it('Should return 200 for success when usertype = admin', (done) => {
    chai.request(app)
      .get('/api/v1/users/2/orders')
      .set('authorization', adminToken)
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.a('object');
        expect(response.body).to.have.property('orderHistory');
        done();
      });
  });
  it('Should return 404 for non-existing user when usertype = admin', (done) => {
    chai.request(app)
      .get('/api/v1/users/3/orders')
      .set('authorization', adminToken)
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.equal('This user does not exist');
        done();
      });
  });
  it('Should return 200 for empty user history when usertype = admin', (done) => {
    chai.request(app)
      .get('/api/v1/users/1/orders')
      .set('authorization', adminToken)
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.a('object');
        done();
      });
  });
  it('Should return 401 for unauthorized user', (done) => {
    chai.request(app)
      .get('/api/v1/users/1/orders')
      .set('authorization', userToken)
      .end((error, response) => {
        expect(response).to.have.status(401);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.equal('Unauthorized access');
        done();
      });
  });
  it('Should return 400 for invalid userId format', (done) => {
    chai.request(app)
      .get('/api/v1/users/a/orders')
      .set('authorization', userToken)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.equal('Invalid URL. userId should be a positive integer greater than zero');
        done();
      });
  });
  it('Should return 400 for invalid userId format', (done) => {
    chai.request(app)
      .get('/api/v1/users/a/orders')
      .set('authorization', adminToken)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.equal('Invalid URL. userId should be a positive integer greater than zero');
        done();
      });
  });
});

describe('Test GET ALL ORDERS by Admin', () => {
  it('Should return 200 for success', (done) => {
    chai.request(app)
      .get('/api/v1/orders')
      .set('authorization', adminToken)
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.a('object');
        expect(response.body).to.have.property('allOrders');
        done();
      });
  });
});

describe('Test GET SPECIFIC ORDER by Admin', () => {
  it('Should return 200 for success', (done) => {
    chai.request(app)
      .get('/api/v1/orders/1')
      .set('authorization', adminToken)
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.a('object');
        expect(response.body).to.have.property('foundOrder');
        done();
      });
  });
  it('Should return 400 for invalid orderId format', (done) => {
    chai.request(app)
      .get('/api/v1/orders/a')
      .set('authorization', adminToken)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.equal('Invalid URL. orderId should be a positive integer greater than zero');
        done();
      });
  });
  it('Should return 404 for non-existing orderId', (done) => {
    chai.request(app)
      .get('/api/v1/orders/10000000')
      .set('authorization', adminToken)
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.equal('Sorry, this order does not exist');
        done();
      });
  });
});

describe('Test UPDATE ORDER by Admin', () => {
  it('Should return 200 for success', (done) => {
    chai.request(app)
      .put('/api/v1/orders/1/process')
      .set('authorization', adminToken)
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.equal('Order is currently processing');
        done();
      });
  });
  it('Should return 200 for success', (done) => {
    chai.request(app)
      .put('/api/v1/orders/2/cancel')
      .set('authorization', adminToken)
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.equal('Order is cancelled');
        done();
      });
  });
  it('Should return 404 for non-existing orderId', (done) => {
    chai.request(app)
      .put('/api/v1/orders/100000/process')
      .set('authorization', adminToken)
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.equal('Sorry, this order does not exists.');
        done();
      });
  });
  it('Should return 404 for non-existing orderId', (done) => {
    chai.request(app)
      .put('/api/v1/orders/100000/cancel')
      .set('authorization', adminToken)
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.equal('Sorry, this order does not exists.');
        done();
      });
  });
  it('Should return 406 for already processing order', (done) => {
    chai.request(app)
      .put('/api/v1/orders/1/process')
      .set('authorization', adminToken)
      .end((error, response) => {
        expect(response).to.have.status(406);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.equal('Sorry, this order cannot be updated at this time');
        done();
      });
  });
  it('Should return 200 for successful complete order', (done) => {
    chai.request(app)
      .put('/api/v1/orders/1/complete')
      .set('authorization', adminToken)
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.equal('Order is completed');
        done();
      });
  });
  it('Should return 406 for already cancelled order', (done) => {
    chai.request(app)
      .put('/api/v1/orders/2/cancel')
      .set('authorization', adminToken)
      .end((error, response) => {
        expect(response).to.have.status(406);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.equal('Sorry, this order cannot be updated at this time');
        done();
      });
  });
  it('Should return 406 for unsuccessful complete order', (done) => {
    chai.request(app)
      .put('/api/v1/orders/2/complete')
      .set('authorization', adminToken)
      .end((error, response) => {
        expect(response).to.have.status(406);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.equal('This order can only be completed after its been placed on processing');
        done();
      });
  });
  it('Should return 406 for already processing/Cancelled order', (done) => {
    chai.request(app)
      .put('/api/v1/orders/1/cancel')
      .set('authorization', adminToken)
      .end((error, response) => {
        expect(response).to.have.status(406);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.equal('Sorry, this order cannot be updated at this time');
        done();
      });
  });
});
