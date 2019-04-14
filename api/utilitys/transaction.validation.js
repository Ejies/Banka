import Joi from 'joi';


exports.checkTransaction = (transactions) => {
  const transactionSchema = {
    amount: Joi.number().required(),
    cashier: Joi.number().required(),
  };

  return Joi.validate(transactions, transactionSchema);
};
