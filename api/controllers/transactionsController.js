import moment from 'moment';
import TransactionService from '../services/transactionsService';
import dummyData from '../utilitys/dummyData';


const transactionController = {
  fetchAllTransaction(req, res) {
    const { accountNumber } = req.params;
    const allTransactions = TransactionService.fetchAllTransaction(accountNumber);
    returnreturn res.status(200).json({
        success: false,
        Transactions: allTransactions,
        });
  },

  credit(req, res) {
    let { amount } = req.body;
    let { accountNumber } = req.params;
    const { id } = req.body.cashier;
    accountNumber = parseInt(accountNumber, 10);
    amount = parseFloat(amount);

    const findAccount = checkData => checkData.accountNumber === accountNumber;
    const foundAccount = dummyData.accounts.find(findAccount);

    if (amount === undefined || amount === '' || amount === null) {
      return res.status(400).json({
        status: 400,
        error: 'No amount entered',
      });
    }

    if (amount === 0 || amount < 0) {
      return res.status(400).json({
        status: 400,
        error: 'Amount is too low',
      });
    }

    if (!foundAccount) {
      return res.status(400).json({
        status: 400,
        error: 'Account number does not exists',
      });
    }

    const lastId = dummyData.transactions.length + 1;
    const transactionData = {

      id: lastId,
      createdOn: moment().format(),
      type: 'credit',
      accountNumber,
      cashier: id,
      amount,
      oldBalance: parseFloat(foundAccount.balance).toFixed(2),
      newBalance: parseFloat(foundAccount.balance) + parseFloat(amount),
    };
    dummyData.transactions.push(transactionData);
    foundAccount.balance = transactionData.newBalance;

    res.status(200).json({
      status: 200,
      data: {
        transactionId: transactionData.id,
        accountNumber,
        amount: parseFloat(amount).toFixed(2),
        cashier: transactionData.cashier,
        transactionType: transactionData.type,
        accountBalance: parseFloat(foundAccount.balance).toFixed(2),
      },
    });
  },

  debit(req, res) {
    let { amount } = req.body;
    let { accountNumber } = req.params;
    const { id } = req.body;
    accountNumber = parseInt(accountNumber, 10);
    amount = parseFloat(amount);

    const findAccount = checkData => checkData.accountNumber === accountNumber;
    const foundAccount = dummyData.accounts.find(findAccount);

    if (amount === undefined || amount === '' || amount === null) {
      return res.status(400).json({
        status: 400,
        error: 'No amount entered',
      });
    }

    if (amount === 0 || amount < 0) {
      return res.status(400).json({
        status: 400,
        error: 'Amount is too low',
      });
    }

    if (!foundAccount) {
      return res.status(400).json({
        status: 400,
        error: 'Account number does not exists',
      });
    }

    if (amount > foundAccount.balance) {
      return res.status(400).json({
        status: 400,
        error: 'You have insufficient funds',
      });
    }
    const lastId = dummyData.transactions.length + 1;
    const transactionData = {

      id: lastId,
      createdOn: moment().format(),
      type: 'credit',
      accountNumber,
      cashier: id,
      amount,
      oldBalance: parseFloat(foundAccount.balance).toFixed(2),
      newBalance: parseFloat(foundAccount.balance) - parseFloat(amount),
    };
    dummyData.transactions.push(transactionData);
    foundAccount.balance = transactionData.newBalance;

    res.status(200).json({
      status: 200,
      data: {
        transactionId: transactionData.id,
        accountNumber,
        amount: parseFloat(amount).toFixed(2),
        cashier: transactionData.cashier,
        transactionType: transactionData.type,
        accountBalance: parseFloat(foundAccount.balance).toFixed(2),
      },
    });
  },
};

export default transactionController;
