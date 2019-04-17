import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../index';

const { expect } = chai;
chai.use(chaiHttp);

const payload = {
  firstName: 'Joseph',
  lastName: 'Joe',
  email: 'joe1@gmail.com',
  password: '123456',
};

const token = jwt.sign(payload, 'YOU_OWN_YOUR_OWN', { expiresIn: '24h' });

before('Signin', () => {
  const user = {
    email: 'john@yahoo.com',
    password: 'xxxxxx',
  };
  chai.request(app)
    .post('/api/v1/auth/signin')
    .send(user)
    .end((err, res) => {
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('status');
      expect(res.body.status).to.be.equal('success');
    });
});

// Test for transactions
describe('Transactions', () => {
  it('credit account', () => {
    chai.request(app)
      .get('/api/v1/transactions')
      .set('Authorization', token)
      .end((err, res) => {
        chai.request(app)
          .post(`/api/v1/transactions/${res.body.accountNumber}/credit`)
          .set('Authorization', token)
          .send({
            amount: 300000,
            cashier: 2,
          })
          .end((err, res) => {
            expect(res.body.status).to.be.equal(401);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('status');
          });
      });
  });

  it('debit account', () => {
    chai.request(app)
      .get('/api/v1/transactions')
      .set('Authorization', token)
      .end((err, res) => {
        chai.request(app)
          .post(`/api/v1/transactions/${res.body.accountNumber}/debit`)
          .set('Authorization', token)
          .send({
            amount: 20000,
            cashier: 2,
          })
          .end((err, res) => {
            expect(res.body.status).to.be.equal(401);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('status');
          });
      });
  });

  it('check for insuficient balance', () => {
    chai.request(app)
      .get('/api/v1/transactions')
      .set('Authorization', token)
      .end((err, res) => {
        chai.request(app)
          .post(`/api/v1/transactions/${res.body.accountNumber}/debit`)
          .set('Authorization', token)
          .send({
            amount: 400000000,
            cashier: 2,
          })
          .end((err, res) => {
            expect(res.body.status).to.be.equal(401);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('status');
            expect(res.body).to.have.property('error');
          });
      });
  });

  it('amount and cashier are required', () => {
    chai.request(app)
      .get('/api/v1/transactions')
      .set('Authorization', token)
      .end((err, res) => {
        chai.request(app)
          .post(`/api/v1/transactions/${res.body.accountNumber}/debit`)
          .set('Authorization', token)
          .end((err, res) => {
            expect(res.body.status).to.be.equal(401);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('status');
            expect(res.body).to.have.property('error');
          });
      });
  });

  it('amount and cashier are required', () => {
    chai.request(app)
      .get('/api/v1/transactions')
      .set('Authorization', token)
      .end((err, res) => {
        chai.request(app)
          .post(`/api/v1/transactions/${res.body.accountNumber}/credit`)
          .set('Authorization', token)
          .end((err, res) => {
            expect(res.body.status).to.be.equal(401);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('status');
            expect(res.body).to.have.property('error');
          });
      });
  });

  it('Account not found', () => {
    chai.request(app)
      .get('/api/v1/transactions')
      .set('Authorization', token)
      .end((err, res) => {
        chai.request(app)
          .post('/api/v1/transactions/13/credit')
          .set('Authorization', token)
          .send({
            amount: 10000,
            cashier: 2,
          })
          .end((err, res) => {
            expect(res.body.status).to.be.equal(401);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('status');
            expect(res.body).to.have.property('error');
          });
      });
  });

  it('Account not found', () => {
    chai.request(app)
      .get('/api/v1/transactions')
      .set('Authorization', token)
      .end((err, res) => {
        chai.request(app)
          .post('/api/v1/transactions/13/debit')
          .set('Authorization', token)
          .send({
            amount: 10000,
            cashier: 2,
          })
          .end((err, res) => {
            expect(res.body.status).to.be.equal(401);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('status');
            expect(res.body).to.have.property('error');
          });
      });
  });

  it('Amount should be number', () => {
    chai.request(app)
      .get('/api/v1/transactions')
      .set('Authorization', token)
      .end((err, res) => {
        chai.request(app)
          .post(`/api/v1/transactions/${res.body.accountNumber}/credit`)
          .set('Authorization', token)
          .send({
            amount: 'number please',
            cashier: 2,
          })
          .end((err, res) => {
            expect(res.body.status).to.be.equal(401);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('status');
            expect(res.body).to.have.property('error');
          });
      });
  });

  it('Cashier should be number', () => {
    chai.request(app)
      .get('/api/v1/transactions')
      .set('Authorization', token)
      .end((err, res) => {
        chai.request(app)
          .post(`/api/v1/transactions/${res.body.accountNumber}/credit`)
          .set('Authorization', token)
          .send({
            amount: 100000,
            cashier: 'Number please',
          })
          .end((err, res) => {
            expect(res.body.status).to.be.equal(401);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('status');
            expect(res.body).to.have.property('error');
          });
      });
  });
});
