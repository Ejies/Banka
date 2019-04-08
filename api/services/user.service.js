import dummyData from '../utilitys/dummyData';
import User from '../models/user.models';

const UserService = {
  fetchAllUsers() {
    const validUsers = dummyData.users.map((user) => {
      const newUser = new User();
      newUser.id = user.id;
      newUser.firstname = user.firstname;
      newUser.lastname = user.lastname;
      newUser.password = user.password;
      newUser.type = user.type;
      newUser.email = user.email;
      newUser.isAdmin = user.isAdmin;
      
      return newUser;
    });
    return validUsers;
  },

  addUser(user) {
    const userLength = dummyData.users.length;
    const lastId = dummyData.users[userLength - 1].id;
    const newId = lastId + 1;
    user.id = newId;
    dummyData.users.push(user);
    return user;

  },

  getAUser(id) {
    const user = dummyData.users.find(user => user.id == id);
    return user || {};
  }
};

export default UserService;