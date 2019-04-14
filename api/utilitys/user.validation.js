import joi from 'joi';

exports.checkUser = (user) => {
  const userSchema = {
    firstname: joi.string().min(3).required(),
    lastname: joi.string().min(3).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    type: joi.string().required().valid('staff', 'client'),
    isAdmin: joi.boolean().required(),
  };
  return joi.validate(user, userSchema);
};

exports.checkLogin = (user) => {
  const login = {
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
  };
  return joi.validate(user, login);
};
