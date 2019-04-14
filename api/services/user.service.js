import bcrypt from 'bcrypt';
import dummyData from '../utilitys/dummyData';
import validator from '../utilitys/user.validation';


const UserService = {
  signUp(user) {
    // lets validate the users input
    const { error } = validator.checkUser(user);
    if (error) return { status: 400, err: error.details[0].message };
    // lets check if the email entered already exist
    const checkUser = dummyData.users.find(useremail => useremail.email === user.email);
    if (checkUser) return { status: 400, err: 'This email address already exist!' };

    // lets get the id of the last user in the record and assign an increament +1 to the new record
    const userLength = dummyData.users.length;
    const lastId = dummyData.users[userLength - 1].id;
    const newId = lastId + 1;
    user.id = newId;

    // lets hash the password entered by the user
    user.password = bcrypt.hashSync(user.password, 10);

    dummyData.users.push(user);
    return user;
  },

  signIn(user) {
    // Validating user inputs
    const { error } = validator.checkLogin(user);
    if (error) return { status: 400, err: error.details[0].message };

    // Chech whether the entered email match the one in database
    const checkUser = dummyData.users.find(username => username.email === user.email);
    if (!checkUser) return { status: 400, err: 'Incorrect Email' };

    // Chech whether the entered email match the one in database
    const findPassword = userPassword => userPassword.password === user.password;
    const checkPassword = dummyData.users.find(findPassword);
    if (!checkPassword) return { status: 400, err: 'Incorrect Password' };

    return checkUser;
  },
};

export default UserService;
