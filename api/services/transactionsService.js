import dummyData from '../utilitys/dummyData';
import Transaction from '../models/transaction.model';

const accountService = {

  // lets fetch all transactions from an account number
  fetchAllTransaction(accountNumber) {
    // eslint-disable-next-line eqeqeq
    // eslint-disable-next-line radix
    accountNumber = parseInt(accountNumber);
    const checkTransactions = findTransaction => findTransaction.accountNumber == accountNumber;
    const transaction = dummyData.transactions.filter(checkTransactions);
    if (!transaction) return { status: 404, err: `Account Number " ${accountNumber} " was not found` };


    const validTransactions = dummyData.transactions.map((transaction) => {
      const newTransaction = new Transaction();
      newTransaction.id = transaction.id;
      newTransaction.createdOn = transaction.createdOn;
      newTransaction.type = transaction.type;
      newTransaction.accountNumber = transaction.accountNumber;
      newTransaction.cashier = transaction.cashier;
      newTransaction.amount = transaction.amount;
      newTransaction.oldBalance = transaction.oldBalance;
      newTransaction.newBalance = transaction.newBalance;

      return newTransaction;
    });
    // const counts = dummyData.transactions.reduce((p, c) => {
    //   const { name } = c.accountNumber;
    //   if (!p.hasOwnProperty(name)) {
    //     p[name] = 0;
    //   }
    //   p[name] + 1;
    //   return p;
    // }, {});

    return transaction;
  },


};


export default accountService;
