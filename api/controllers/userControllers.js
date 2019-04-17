import UserService from '../services/userService';

const jwt = require('jsonwebtoken');

let msg;
let usertoken;
const UserController = {
  signUp(req, res) {
    /*
        Expect json of the format
        {
            email: "jay@example.com"
            firstname: "Joe"
            lastname: "Doe"
            password: "xxxxxx"
            type: "type of user"
            isAdmin: "true or false"

        }
      */
    const newUser = req.body;
    const createdUser = UserService.signUp(newUser);

    // lets check if we received an error from oudfdfdr service
    if (createdUser.status === 400) {
      msg = 'Registration Not Successful';
      return res.header('Authorization', usertoken).status(400).json({
        status: 400,
        message: `Oops! Your Registeration was not successful : ${createdUser.err}`,
      }).status(400);
    }
    // lets check if we receive an id
    if (createdUser.id != null) {
      usertoken = jwt.sign({ createdUser }, 'privatekey', { expiresIn: '24h' });
      msg = {
        token: usertoken,
        id: createdUser.id,
        firstname: createdUser.firstname,
        lastname: createdUser.lastname,
        email: createdUser.email,
      };
      // lets generate a token for the registered user
      return res.header('Authorization', usertoken).status(201).json({
        status: 201,
        message: 'You have Successfully registered',
        data: msg,
      }).status(201);
    }
  },


  signIn(req, res) {
    const user = req.body;
    const foundUser = UserService.signIn(user);
    usertoken = jwt.sign({ foundUser }, 'privatekey', { expiresIn: '24h' });
    if (foundUser.status === 400) {
      return res.header('Authorization', usertoken).status(400).json({
        status: 400,
        message: `Oops! Your Registeration was not success : ${foundUser.err}`,
      }).status(400);
    }
    if (foundUser.id != null) {
      msg = {
        token: usertoken,
        id: foundUser.id,
        firstname: foundUser.firstname,
        lastname: foundUser.lastname,
        email: foundUser.email,
      };
      return res.json({
        status: 'success',
        data: msg,
      }).status(200);
    }
  },

};

export default UserController;
