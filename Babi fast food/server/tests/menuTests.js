import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

import {
  correctMenu, undefinedMenu, emptyMenu, invalidMenuLength, invalidMenuCharacter,
  undefinedDescription, emptyDescription, invalidDescriptionLength, invalidDescriptionCharacter,
  undefinedCategory, emptyCategory, invalidCategory, undefinedQuantity, emptyQuantity,
  invalidQuantityLength, invalidQuantity, invalidQuantityCharacter, undefinedPrice, emptyPrice,
  invalidPrice, invalidPriceCharacter, correctMenu2, correctMenu3, updateMenu, correctMenu5,
  unstringedMenu, unstringedDescription, unstringedCategory, unstringedQuantity, unstringedPrice,
  undefinedImageURL, unstringedImageURL, emptyImageURL, invalidImageFormat, correctMenu4
} from './mockData/menuMock';

const { expect } = chai;

chai.use(chaiHttp);
let generateToken;

describe('Create Token For non-admin user', () => {
  it('should return token for successful login', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'marcus2cu@yahoo.com',
        password: 'marcpass'
      })
      .end((error, response) => {
        expect(response).to.have.status(200);
        generateToken = response.body.token;
        done();
      });
  });
});

describe('Test POST MENU endpoint for non-admin user', () => {
  it('should return 401 if not Admin userType', (done) => {
    chai.request(app)
      .post('/api/v1/menu')
      .set('authorization', generateToken)
      .end((error, response) => {
        expect(response).to.have.status(401);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.equal('Hey! You need admin privilege to access this endpoint.');
        done();
      });
  });
});

describe('Create Token For Admin', () => {
  it('should return token for successful login', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'admin@gmail.com',
        password: 'adminuser'
      })
      .end((error, response) => {
        expect(response).to.have.status(200);
        generateToken = response.body.token;
        done();
      });
  });
});

describe('Test GET available menu before posting menu', () => {
  it('Should return 404 for empty menu', (done) => {
    chai.request(app)
      .get('/api/v1/menu')
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.equal('Menu list is empty at this time. Please check again later');
        done();
      });
  });
});

describe('Test GET all menu in databse before posting menu', () => {
  it('Should return 404 for empty menu', (done) => {
    chai.request(app)
      .get('/api/v1/menu/admin')
      .set('authorization', generateToken)
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.equal('You are yet to upload menu. Start uploading now');
        done();
      });
  });
});

describe('Test POST MENU endpoint for admin userType', () => {
  it('should return 201 for success', (done) => {
    chai.request(app)
      .post('/api/v1/menu')
      .set('authorization', generateToken)
      .send(correctMenu)
      .end((error, response) => {
        expect(response).to.have.status(201);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.equal('Menu created successfully');
        done();
      });
  });
  it('should return 201 for success', (done) => {
    chai.request(app)
      .post('/api/v1/menu')
      .set('authorization', generateToken)
      .send(correctMenu2)
      .end((error, response) => {
        expect(response).to.have.status(201);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.equal('Menu created successfully');
        done();
      });
  });
  it('should return 201 for success', (done) => {
    chai.request(app)
      .post('/api/v1/menu')
      .set('authorization', generateToken)
      .send(correctMenu3)
      .end((error, response) => {
        expect(response).to.have.status(201);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.equal('Menu created successfully');
        done();
      });
  });
  it('should return 201 for success', (done) => {
    chai.request(app)
      .post('/api/v1/menu')
      .set('authorization', generateToken)
      .send(correctMenu4)
      .end((error, response) => {
        expect(response).to.have.status(201);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.equal('Menu created successfully');
        done();
      });
  });
  it('should return 201 for success', (done) => {
    chai.request(app)
      .post('/api/v1/menu')
      .set('authorization', generateToken)
      .send(correctMenu5)
      .end((error, response) => {
        expect(response).to.have.status(201);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.equal('Menu created successfully');
        done();
      });
  });
  it('should return 400 for undefined menu', (done) => {
    chai.request(app)
      .post('/api/v1/menu')
      .set('authorization', generateToken)
      .send(undefinedMenu)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.equal('Menu is undefined. Input characters of length 3 to 30 (alphabets, whitespace, comma, hyphen)');
        done();
      });
  });
  it('should return 400 for unstringed menu', (done) => {
    chai.request(app)
      .post('/api/v1/menu')
      .set('authorization', generateToken)
      .send(unstringedMenu)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.equal('Menu should be a string. Input characters of length 3 to 30 (alphabets, whitespace, comma, hyphen)');
        done();
      });
  });
  it('should return 400 for empty menu', (done) => {
    chai.request(app)
      .post('/api/v1/menu')
      .set('authorization', generateToken)
      .send(emptyMenu)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.equal('Menu is empty. Input characters of length 3 to 30 (alphabets, whitespace, comma, hyphen)');
        done();
      });
  });
  it('should return 400 for invalid menu length', (done) => {
    chai.request(app)
      .post('/api/v1/menu')
      .set('authorization', generateToken)
      .send(invalidMenuLength)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.equal('Invalid menu length. Input characters of length 3 to 30 (alphabets, whitespace, comma, hyphen)');
        done();
      });
  });
  it('should return 400 for invalid menu character', (done) => {
    chai.request(app)
      .post('/api/v1/menu')
      .set('authorization', generateToken)
      .send(invalidMenuCharacter)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.equal('Invalid menu character detected. Input characters of length 3 to 30 (alphabets, whitespace, comma, hyphen)');
        done();
      });
  });
  it('should return 400 for undefined description', (done) => {
    chai.request(app)
      .post('/api/v1/menu')
      .set('authorization', generateToken)
      .send(undefinedDescription)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.equal('Description is undefined. Input characters of length 5 to 100 (alphanumeric, whitespace, comma, hyphen, fullstop)');
        done();
      });
  });
  it('should return 400 for unstrined description', (done) => {
    chai.request(app)
      .post('/api/v1/menu')
      .set('authorization', generateToken)
      .send(unstringedDescription)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.equal('Description should be a string. Input characters of length 5 to 100 (alphanumeric, whitespace, comma, hyphen, fullstop)');
        done();
      });
  });
  it('should return 400 for empty description', (done) => {
    chai.request(app)
      .post('/api/v1/menu')
      .set('authorization', generateToken)
      .send(emptyDescription)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.equal('Description is empty. Input characters of length 5 to 100 (alphanumeric, whitespace, comma, hyphen, fullstop)');
        done();
      });
  });
  it('should return 400 for empty description', (done) => {
    chai.request(app)
      .post('/api/v1/menu')
      .set('authorization', generateToken)
      .send(invalidDescriptionLength)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.equal('Invalid description length. Input characters of length 5 to 100 (alphanumeric, whitespace, comma, hyphen, fullstop)');
        done();
      });
  });
  it('should return 400 for invalid description character', (done) => {
    chai.request(app)
      .post('/api/v1/menu')
      .set('authorization', generateToken)
      .send(invalidDescriptionCharacter)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.equal('Invalid description character detected. Input characters of length 5 to 100 (alphanumeric, whitespace, comma, hyphen, fullstop)');
        done();
      });
  });
  it('should return 400 for undefined category', (done) => {
    chai.request(app)
      .post('/api/v1/menu')
      .set('authorization', generateToken)
      .send(undefinedCategory)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.equal('Category is undefined. Input characters of length 3 to 50 (alphanumeric, whitespace, and hyphen)');
        done();
      });
  });
  it('should return 400 for unstringed category', (done) => {
    chai.request(app)
      .post('/api/v1/menu')
      .set('authorization', generateToken)
      .send(unstringedCategory)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.equal('Category should be a string of length 3 to 50 (alphanumeric, whitespace, and hyphen)');
        done();
      });
  });
  it('should return 400 for empty category', (done) => {
    chai.request(app)
      .post('/api/v1/menu')
      .set('authorization', generateToken)
      .send(emptyCategory)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.equal('Category is empty. Input characters of length 3 to 50 (alphanumeric, whitespace, and hyphen)');
        done();
      });
  });
  it('should return 400 for invalid category', (done) => {
    chai.request(app)
      .post('/api/v1/menu')
      .set('authorization', generateToken)
      .send(invalidCategory)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.equal('Invalid category. Input characters of length 3 to 50 (alphanumeric, whitespace, and hyphen)');
        done();
      });
  });
  it('should return 400 for undefined imageURL', (done) => {
    chai.request(app)
      .post('/api/v1/menu')
      .set('authorization', generateToken)
      .send(undefinedImageURL)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.equal('imageURL is undefined. Input a valid one');
        done();
      });
  });
  it('should return 400 for unstringed imageURL', (done) => {
    chai.request(app)
      .post('/api/v1/menu')
      .set('authorization', generateToken)
      .send(unstringedImageURL)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.equal('imageURL should be a string');
        done();
      });
  });
  it('should return 400 for empty imageURL', (done) => {
    chai.request(app)
      .post('/api/v1/menu')
      .set('authorization', generateToken)
      .send(emptyImageURL)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.equal('imageURL is empty. Input a valid one');
        done();
      });
  });
  it('should return 400 for invalid imageURL format', (done) => {
    chai.request(app)
      .post('/api/v1/menu')
      .set('authorization', generateToken)
      .send(invalidImageFormat)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.equal('Invalid imageURL detected. Valid format are .jpg, .jpeg, .png, .gif');
        done();
      });
  });
  it('should return 400 for undefined quantity', (done) => {
    chai.request(app)
      .post('/api/v1/menu')
      .set('authorization', generateToken)
      .send(undefinedQuantity)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.equal('Quantity is undefined. Input positive integer greater than zero and of length 1 to 4');
        done();
      });
  });
  it('should return 400 for unstringed quantity', (done) => {
    chai.request(app)
      .post('/api/v1/menu')
      .set('authorization', generateToken)
      .send(unstringedQuantity)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.equal('Quantity should be a string. Input positive integer greater than zero and of length 1 to 4');
        done();
      });
  });
  it('should return 400 for empty quantity', (done) => {
    chai.request(app)
      .post('/api/v1/menu')
      .set('authorization', generateToken)
      .send(emptyQuantity)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.equal('Quantity is empty. Input positive integer greater than zero and of length 1 to 4');
        done();
      });
  });
  it('should return 400 for invalid quantity length', (done) => {
    chai.request(app)
      .post('/api/v1/menu')
      .set('authorization', generateToken)
      .send(invalidQuantityLength)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.equal('Invalid quantity length. Input positive integer greater than zero and of length 1 to 4');
        done();
      });
  });
  it('should return 400 for invalid quantity', (done) => {
    chai.request(app)
      .post('/api/v1/menu')
      .set('authorization', generateToken)
      .send(invalidQuantity)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.equal('Invalid quantity. Input positive integer greater than zero and of length 1 to 4');
        done();
      });
  });
  it('should return 400 for invalid quantity character', (done) => {
    chai.request(app)
      .post('/api/v1/menu')
      .set('authorization', generateToken)
      .send(invalidQuantityCharacter)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.equal('Invalid quantity character detected. Input positive integer greater than zero and of length 1 to 4');
        done();
      });
  });
  it('should return 400 for undefined price', (done) => {
    chai.request(app)
      .post('/api/v1/menu')
      .set('authorization', generateToken)
      .send(undefinedPrice)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.equal('Price is undefined. Input positive integer greater than zero but less than length of 10');
        done();
      });
  });
  it('should return 400 for empty price', (done) => {
    chai.request(app)
      .post('/api/v1/menu')
      .set('authorization', generateToken)
      .send(unstringedPrice)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.equal('Price should be a string. Input positive integer greater than zero but less than length of 10');
        done();
      });
  });
  it('should return 400 for empty price', (done) => {
    chai.request(app)
      .post('/api/v1/menu')
      .set('authorization', generateToken)
      .send(emptyPrice)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.equal('Price is empty. Input positive integer greater than zero but less than length of 10');
        done();
      });
  });
  it('should return 400 for invalid price', (done) => {
    chai.request(app)
      .post('/api/v1/menu')
      .set('authorization', generateToken)
      .send(invalidPrice)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.equal('Invalid price. Input positive integer greater than zero but less than length of 10');
        done();
      });
  });
  it('should return 400 for invalid price character', (done) => {
    chai.request(app)
      .post('/api/v1/menu')
      .set('authorization', generateToken)
      .send(invalidPriceCharacter)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.equal('Invalid price character detected. Input positive integer greater than zero but less than length of 10');
        done();
      });
  });
});

describe('GET All Available Menu', () => {
  it('Should return 200 for success', (done) => {
    chai.request(app)
      .get('/api/v1/menu')
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.equal('List of Available Menu');
        done();
      });
  });
});

describe('GET All Menu in Database', () => {
  it('Should return 200 for success', (done) => {
    chai.request(app)
      .get('/api/v1/menu/admin')
      .set('authorization', generateToken)
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.equal('List of All Menu in Database');
        done();
      });
  });
});

describe('GET Specific Menu', () => {
  it('Should return 200 for success', (done) => {
    chai.request(app)
      .get('/api/v1/menu/1')
      .set('authorization', generateToken)
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.equal('Menu fetched successfully');
        done();
      });
  });
});

describe('Update specific Menu', () => {
  it('Should return 200 for success', (done) => {
    chai.request(app)
      .put('/api/v1/menu/2')
      .set('authorization', generateToken)
      .send(updateMenu)
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.equal('Updated successfully');
        done();
      });
  });
});

describe('Delete specific Menu', () => {
  it('Should return 200 for success', (done) => {
    chai.request(app)
      .delete('/api/v1/menu/3')
      .set('authorization', generateToken)
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.a('object');
        done();
      });
  });
});
