import dummyData from '../utilitys/dummyData';
import validator from '../utilitys/account.validation';
import Account from '../models/account.model';

const accountService = {
  fetchAllAccounts() {
    const validAccounts = dummyData.accounts.map((account) => {
      const newAccount = new Account();
      newAccount.id = account.id;
      newAccount.accountNumber = account.accountNumber;
      newAccount.createdOn = account.creadedOn;
      newAccount.owner = account.owner;
      newAccount.type = account.type;
      newAccount.status = account.status;
      newAccount.balance = account.balance;

      return newAccount;
    });
    return validAccounts;
  },

  createAccount(account) {
    // lets validate the users input
    const { error } = validator.checkAccount(account);
    if (error) return { status: 400, err: error.details[0].message };

    // // lets check if the account entered already exist
    // const checkAccountNumber = accNumber => accNumber.accountNumber === account.accNumber;
    // const checkAcc = dummyData.accounts.find(checkAccountNumber);
    // if (checkAcc) return { status: 400, err: 'This email address already exist!' };

    // lets get the id of the last user in the record and assign an increament +1 to the new record
    const accountLength = dummyData.accounts.length;
    const lastId = dummyData.users[accountLength - 1].id;
    const newId = lastId + 1;
    account.id = newId;
    account.accountNumber = Math.floor(Math.random() * 10000000000);
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();

    today = `${mm}/${dd}/${yyyy}`;
    account.creadedOn = today;
    return account;
  },

  updateAccount(accountNumber, accountStatus) {
    const checkaccount = findAccount => findAccount.accountNumber === accountNumber;
    const account = dummyData.accounts.find(checkaccount);
    if (!account) return { status: 404, err: `Account Number " ${accountNumber} " was not found` };


    account.status = accountStatus;
    if (account.status == null || account.status === ' ') return { status: 404, err: 'Update not successful, Select account status [savings or dormant]' };
    const newStatus = {
      accountNumber: account.accountNumber,
      status: account.status,
    };

    return { status: 200, message: 'Updated successfully', data: newStatus };
  },

  deleteAccount(accountNumber) {
    const checkaccount = findAccount => findAccount.accountNumber === accountNumber;
    const account = dummyData.accounts.find(checkaccount);
    if (!account) return { status: 404, err: `Account Number " ${accountNumber} " was not found` };

    // // const { error } = validator.updateAccount(accountStatus.status);
    // // if (error) return { status: 400, err: error.details[0].message };

    // if (account.status == null || account.status === ' ') return { status: 404, err: 'Update not successful, Select account status [savings or dormant]' };
    // const newStatus = {
    //   accountNumber: account.accountNumber,
    //   status: account.status,
    // };
    const index = dummyData.accounts.indexOf(account);
    dummyData.accounts.splice(index, 1);

    return { status: 200, message: `Account "${accountNumber}" successfully deleted` };
  },
};

export default accountService;
