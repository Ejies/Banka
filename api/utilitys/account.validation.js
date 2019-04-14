import joi from 'joi';

exports.checkAccount = (account) => {
  const accountSchema = {
    accountNumber: joi.number().min(10),
    owner: joi.number().required(),
    createdOn: joi.date().required(),
    type: joi.string().valid('savings', 'current').required(),
    openingBalance: joi.number(),
    status: joi.string().valid('draft', 'active', 'dormant'),

  };
  return joi.validate(account, accountSchema);
};

exports.updateAccount = (account) => {
  const accountSchema = {
    status: joi.string().valid('active', 'dormant').required(),
  };
  return joi.validate(account, accountSchema);
};
