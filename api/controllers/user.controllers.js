import UserService from '../services/user.service';

const UserController = {
  fetchAllUsers(req, res) {
    const allUsers = UserService.fetchAllUsers();
    return res.json({
      status: 'success',
      data: allUsers
    }).status(200);
  },
  addUser(req, res) {
    /*
        Expect json of the format
        {
            email: "jay@example.com"
            firstname: "Joe"
            lastname: "Doe"
            password: "xxxx"
            type: "type of user"
            isAdmin: "true or false"
        
        }
      */
    const newUser = req.body;
    const createdUser = UserService.addUser(newUser);
    return res.json({
      status: 'success',
      data: createdUser
    }).status(201);
  },
  getSingleUser(req, res) {
    const id = req.params.id;
    const foundUser = UserService.addUser(id);
    return res.json({
      status: 'success',
      data: foundUser
    }).status(201);
  }

};

export default UserController;