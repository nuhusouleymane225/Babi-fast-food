import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

import {
  correctUser, undefinedName, emptyName, invalidNameLength, invalidNameCharacter,
  undefinedEmail, emptyEmail, invalidEmailLength, invalidEmailCharacter,
  existingEmail, undefinedPhone, emptyPhone, invalidPhoneLength,
  invalidPhoneCharacter, existingPhone, undefinedPassword, emptyPassword,
  invalidPasswordLength, undefinedAddress, emptyAddress, invalidAddressLength,
  invalidAddressCharacter, whitespacePassword, correctLogin, undefinedEmailLogin, emptyEmailLogin,
  nonExistingEmail, undefinedPasswordLogin, emptyPasswordLogin, correctEmailIncorrectPassword,
  unstringedEmailLogin, unstringedPasswordLogin,
  unstringedName, unstringedEmail, unstringedPhone, unstringedAddress, unstringedPassword
} from './mockData/userMock';

const { expect } = chai;

chai.use(chaiHttp);

describe('Test for Signup User', () => {
  it('should return 201 for success', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(correctUser)
      .end((error, response) => {
        expect(response).to.have.status(201);
        expect(response.body.message).to.be.a('string');
        expect(response.body).to.have.property('token');
        done();
      });
  });
  it('should return 400 for undefined name', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(undefinedName)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.message).to.equal('Name cannot be undefined. Input 4 to 50 alphabets');
        done();
      });
  });
  it('should return 400 for unstringed name', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(unstringedName)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.message).to.equal('Name should be a string. Input 4 to 50 alphabets');
        done();
      });
  });
  it('should return 400 for empty name', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(emptyName)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.message).to.equal('Name cannot be empyt. Input 4 to 50 alphabets');
        done();
      });
  });
  it('should return 400 for invalid name length', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(invalidNameLength)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.message).to.equal('Name should be 4 to 50 aplhabets long');
        done();
      });
  });
  it('should return 400 for invalid name character', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(invalidNameCharacter)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.message).to.equal('Name accepts only alphabet and whitespace');
        done();
      });
  });
  it('should return 400 for undefined email', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(undefinedEmail)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.message).to.equal('Email cannot be undefined');
        done();
      });
  });
  it('should return 400 for unstringed email', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(unstringedEmail)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.message).to.equal('Email should be a string. Input an email 8 to 50 characters');
        done();
      });
  });
  it('should return 400 for empty email', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(emptyEmail)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.message).to.equal('Email field cannot be empty. Input an email 8 to 50 characters');
        done();
      });
  });
  it('should return 400 for invalid email length', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(invalidEmailLength)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.message).to.equal('Email should be 8 to 50 characters');
        done();
      });
  });
  it('should return 400 for invalid email character', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(invalidEmailCharacter)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.message).to.equal("Please input a valid email format 'example@domain.com'");
        done();
      });
  });
  it('should return 400 for existing email', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(existingEmail)
      .end((error, response) => {
        expect(response).to.have.status(409);
        expect(response.body.message).to.equal('Email already exist, please Signup with a new one');
        done();
      });
  });
  it('should return 400 for undefined phone', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(undefinedPhone)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.message).to.equal('Phone is undefined. Input integer of 7 to 13 characters long');
        done();
      });
  });
  it('should return 400 for unstringed phone', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(unstringedPhone)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.message).to.equal('Phone should be a string. Input integer of 7 to 13 characters long');
        done();
      });
  });
  it('should return 400 for empty phone field', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(emptyPhone)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.message).to.equal('Phone field cannot be empty. Input integer of 7 to 13 characters long');
        done();
      });
  });
  it('should return 400 for invalid phone length', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(invalidPhoneLength)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.message).to.equal('Phone should be integer of 7 to 13 characters long');
        done();
      });
  });
  it('should return 400 for invalid phone character', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(invalidPhoneCharacter)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.message).to.equal('Phone should be positive integer of length 7 to 13');
        done();
      });
  });
  it('should return 400 for existing phone', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(existingPhone)
      .end((error, response) => {
        expect(response).to.have.status(409);
        expect(response.body.message).to.equal('Phone number already exist, please Signup with a new one');
        done();
      });
  });
  it('should return 400 for undefined password', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(undefinedPassword)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.message).to.equal('Password is undefined. Input 4 to 20 characters');
        done();
      });
  });
  it('should return 400 for unstringed password', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(unstringedPassword)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.message).to.equal('Password should be a string. Input 4 to 20 characters');
        done();
      });
  });
  it('should return 400 for empty password', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(emptyPassword)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.message).to.equal('Password cannot be empty. Input 4 to 20 characters');
        done();
      });
  });
  it('should return 400 for invalid password length', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(invalidPasswordLength)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.message).to.equal('Invalid password length. Input 4 to 20 characters');
        done();
      });
  });
  it('should return 400 for password having whitespace', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(whitespacePassword)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.message).to.equal('Remove whitespace from your password and input 4 to 20 characters');
        done();
      });
  });
  it('should return 400 for undefined address', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(undefinedAddress)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.message).to.equal('Address is undefined. Input 5 to 100 characters (alphanumeric, comma, hyphen and whitespace)');
        done();
      });
  });
  it('should return 400 for unstringed address', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(unstringedAddress)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.message).to.equal('Address should be a string. Input 5 to 100 characters (alphanumeric, comma, hyphen and whitespace)');
        done();
      });
  });
  it('should return 400 for empty address', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(emptyAddress)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.message).to.equal('Address should be 5 to 100 characters (alphanumeric, comma, hyphen and whitespace)');
        done();
      });
  });
  it('should return 400 for invalid address length', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(invalidAddressLength)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.message).to.equal('Address should be 5 to 100 characters (alphanumeric, comma, hyphen and whitespace)');
        done();
      });
  });
  it('should return 400 for invalid address character', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(invalidAddressCharacter)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.message).to.equal('Address should be 5 to 100 characters (alphanumeric, comma, hyphen and whitespace)');
        done();
      });
  });
});

describe('Tests for user Login API', () => {
  it('Should return 200 for success', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(correctLogin)
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.have.property('token');
        expect(response.body.message).to.be.a('string');
        done();
      });
  });
  it('Should return 400 for an undefined email', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(undefinedEmailLogin)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.message).to.equal('Email is undefined');
        done();
      });
  });
  it('Should return 400 for an empty email', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(emptyEmailLogin)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.message).to.equal('Email cannot be empty.');
        done();
      });
  });
  it('Should return 400 for an unstringed email', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(unstringedEmailLogin)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.message).to.equal('Email should be a string');
        done();
      });
  });
  it('Should return 404 for a non-existing email', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(nonExistingEmail)
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body.message).to.equal('Email not found. Please signup');
        done();
      });
  });
  it('Should return 400 for undefined password', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(undefinedPasswordLogin)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.message).to.equal('Password is undefined. Please input your password');
        done();
      });
  });
  it('Should return 400 for an empty password field', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(emptyPasswordLogin)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.message).to.equal('Password is empty. Please input your password');
        done();
      });
  });
  it('Should return 400 for an unstringed password field', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(unstringedPasswordLogin)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.message).to.equal('Password should be a string');
        done();
      });
  });
  it('Should return 401 for a comibination of correct email and incorrect password', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(correctEmailIncorrectPassword)
      .end((error, response) => {
        expect(response).to.have.status(401);
        expect(response.body.message).to.equal('Incorrect password. Please input your correct password');
        done();
      });
  });
});
