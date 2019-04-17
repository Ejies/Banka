import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

// configure chai
chai.use(chaiHttp);
const { expect } = chai;


describe('Signup', () => {
  it('User signup', (finish) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Content-type', 'application/json')
      .send({
        firstname: 'Mathew ',
        lastname: 'Jide',
        email: 'mathewj@yahoo.com',
        password: 'mathJ123',
        type: 'staff',
        isAdmin: true,
      })
      .end((err, res) => {
        expect(res.body.status).to.be.equal(201);
        expect(res.body).to.have.property('status');
        expect(res.body).to.be.an('object');
        finish();
      });
  });

  it('Ensure all fields are Entered', (finish) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Content-type', 'application/json')
      .send({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        type: '',
        isAdmin: true,
      })
      .end((err, res) => {
        expect(res.body.status).to.be.equal(400);
        expect(res.body).to.have.property('status');
        expect(res.body).to.be.an('object');
        finish();
      });
  });

  it('Checks if email already exist', (finish) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Content-type', 'application/json')
      .send({
        firstname: 'John ',
        lastname: 'Alex',
        email: 'johfgfgjjdsdnscx@yahoo.com',
        password: 'dfdffdffdf',
        type: 'staff',
        isAdmin: true,
      })
      .end((err, res) => {
        expect(res.body.status).to.be.equal(201);
        expect(res.body).to.have.property('status');
        expect(res.body).to.be.an('object');
        finish();
      });
  });
});

describe('Signin', () => {
  it('Allow user to sign in', (finish) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .set('Content-type', 'application/json')
      .send({
        email: 'john@yahoo.com',
        password: 'xxxxxx',
      })
      .end((err, res) => {
        expect(res.body.status).to.be.equal('success');
        expect(res.body).to.have.property('status');
        expect(res.body).to.be.an('object');
        finish();
      });
  });


  it('Ensure all fields are Entered', (finish) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .set('Content-type', 'application/json')
      .send({
        email: '',
        password: '',
      })
      .end((err, res) => {
        expect(res.body.status).to.be.equal(400);
        expect(res.body).to.have.property('status');
        expect(res.body).to.be.an('object');
        finish();
      });
  });

  it('Check if email doesnt exsist', (finish) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .set('Content-type', 'application/json')
      .send({
        email: 'jo@yahoo.com',
        password: 'xxxxxx',
      })
      .end((err, res) => {
        expect(res.body.status).to.be.equal(400);
        expect(res.body).to.have.property('status');
        expect(res.body).to.be.an('object');
        finish();
      });
  });

  it('Checks for incorrect password', (finish) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .set('Content-type', 'application/json')
      .send({
        email: 'john@yahoo.com',
        password: 'xxxxxyy',
      })
      .end((err, res) => {
        expect(res.body.status).to.be.equal(400);
        expect(res.body).to.have.property('status');
        expect(res.body).to.be.an('object');
        finish();
      });
  });
});
