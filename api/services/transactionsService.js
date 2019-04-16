import dummyData from '../utilitys/dummyData';
import validator from '../utilitys/transaction.validation';
import Transaction from '../models/transaction.model';
import transactionController from '../controllers/transactionsController';

const accountService = {

  // lets fetch all transactions from an account number
  //   fetchAllTransaction(accountNumber) {
  //     // const checkTransactions = findTransaction => findTransaction.accountNumber === accountNumber;
  //     // const transaction = dummyData.transactions.find(checkTransactions);
  //     // if (!transaction) return { status: 404, err: `Account Number " ${accountNumber} " was not found` };


  //     // const validTransactions = dummyData.transactions.map((transaction) => {
  //     //   const newTransaction = new Transaction();
  //     //   newTransaction.id = transaction.id;
  //     //   newTransaction.createdOn = transaction.createdOn;
  //     //   newTransaction.type = transaction.type;
  //     //   newTransaction.accountNumber = transaction.accountNumber;
  //     //   newTransaction.cashier = transaction.cashier;
  //     //   newTransaction.amount = transaction.amount;
  //     //   newTransaction.oldBalance = transaction.oldBalance;
  //     //   newTransaction.newBalance = transaction.newBalance;

  //     //   return newTransaction;
  //     // });
  //     // return validTransactions;
  //     const transaction = dummyData.transactions.find(findTrans => findTrans.accountNumber === accountNumber);
  //     return transaction.id || {};
  //   },


};


export default accountService;
