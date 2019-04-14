import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../index';

// configure chai
chai.use(chaiHttp);
const { expect } = chai;
const payload = {
  id: 1,
  firstName: 'John',
  lastName: 'Alex',
  email: 'john@yahoo.com',
};
const wrongPayload = {
  id: 1,
  firstName: 'mark',
  lastName: 'lewis',
  email: 'lewis@example.com',
};

const testToken = jwt.sign(payload, 'privatekey', { expiresIn: '24h' });
const wrongToken = jwt.sign(wrongPayload, 'privatekey', { expiresIn: '24h' });

// Create Account Test
describe('Create Account', () => {
  it('Create Account', (finish) => {
    chai.request(app)
      .post('/api/v1/accounts')
      .set('Authorization', testToken)
      .end((err, res) => {
        expect(res.body.status).to.be.equal(400);
        expect(res.body).to.have.property('status');
        expect(res.body).to.be.an('object');
        finish();
      });
  });
  it('Invalid Token', () => {
    chai.request(app)
      .post('/api/v1/accounts')
      .set('Authorization', wrongToken)
      .send({
        type: 'current',
        status: 'activate',
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.deep.equal(400);
      });
  });
  it('Account status should be either [dormant or active or draft]', () => {
    chai.request(app)
      .post('/api/v1/accounts')
      .set('Authorization', testToken)
      .send({
        type: 'current',
        status: 'ok',
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.be.equal(400);
        expect(res.body).to.have.property('status');
      });
  });
  it('Account type should be either [savings or current]', () => {
    chai.request(app)
      .post('/api/v1/accounts')
      .set('Authorization', testToken)
      .send({
        type: 'fixed',
        status: 'active',
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.deep.equal(400);
        expect(res.body).to.have.property('status');
      });
  });
});

// Update Account Test
describe('Update Account', () => {
  it('Account doesnt exist', () => {
    chai.request(app)
      .patch('/api/v1/accounts/2032321232')
      .set('Authorization', testToken)
      .send({
        status: 'active',
      })
      .end((err, res) => {
        expect(res).to.be.an('object');
        expect(res.status).to.be.equal(200);
      });
  });
  it('Updated sucessfully', () => {
    chai.request(app)
      .get('/api/v1/accounts/')
      .set('Authorization', testToken)
      .end((err, res) => {
        chai.request(app)
          .patch(`/api/v1/accounts/${res.body.accountNumber}`)
          .set('Authorization', testToken)
          .send({
            status: 'dormant',
          })
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.status).to.be.equal(200);
          });
      });
  });
});

// Delete Account Test
describe('Delete Account', () => {
  it('Account doesnt exist', () => {
    chai.request(app)
      .delete('/api/v1/accounts/2032321232')
      .set('Authorization', testToken)
      .send({
        status: 'active',
      })
      .end((err, res) => {
        expect(res).to.be.an('object');
        expect(res.status).to.be.equal(200);
      });
  });

  it('Account deleted', () => {
    chai.request(app)
      .get('/api/v1/accounts/')
      .set('Authorization', testToken)
      .end((err, res) => {
        chai.request(app)
          .delete(`/api/v1/accounts/${res.body.accountNumber}`)
          .set('Authorization', testToken)
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.status).to.be.equal(200);
          });
      });
  });
});
