import AccountService from '../services/account.service';
import dummyData from '../utilitys/dummyData';
import AccountsModel from '../models/account.model';

const jwt = require('jsonwebtoken');

let msg;
let usertoken;
const accountController = {
  fetchAllAccounts(req, res) {
    const allAccounts = AccountService.fetchAllAccounts();
    return res.json({
      status: 'success',
      Accounts: allAccounts,
    }).status(200);
  },

  createAccount(req, res) {
    const newAccount = req.body;
    const createdAccount = AccountService.createAccount(newAccount);

    // lets check if we received an error from oudfdfdr service
    if (createdAccount.status === 400) {
      msg = 'Account Not Successfully created';
      const token = jwt.sign(req.user, 'privatekey');
      return res.header('Authorization', `${token}`).status(400).json({
        status: 400,
        message: `Oops! you were not able to create an account : ${createdAccount.err}`,
      }).status(400);
    }
    // lets check if we receive an id
    if (createdAccount.id != null) {
      const token = jwt.sign(req.user, 'privatekey');
      msg = {
        accountNumber: createdAccount.accountNumber,
        firstName: createdAccount.firstName,
        type: createdAccount.type,
        createdOn: createdAccount.createdOn,
        owner: createdAccount.owner,
      };
      // lets generate a token for the registered user
      return res.header('Authorization', `${token}`).status(400).json({
        status: 201,
        message: 'You have Successfully created an account',
        data: msg,
      }).status(200);
    }
  },

  updateAccount(req, res) {
    const { accountNumber } = req.params;
    const newStatus = req.body.status;
    const foundAccount = AccountService.updateAccount(accountNumber, newStatus);
    return res.json({
      data: foundAccount,
    }).status(200);
  },

  deleteAccount(req, res) {
    const { accountNumber } = req.params;
    const foundAccount = AccountService.deleteAccount(accountNumber);
    return res.json({
      data: foundAccount,
    }).status(200);
  },
};

export default accountController;
