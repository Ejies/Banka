import { Router } from 'express';
// controllers
import UserController from '../controllers/userControllers';
import AccountController from '../controllers/accountController';
import TransactionController from '../controllers/transactionsController';
import auth from '../middleware/auth';

const router = Router();

router.post('/auth/signup', UserController.signUp);
router.post('/auth/signin', UserController.signIn);
router.get('/accounts', AccountController.fetchAllAccounts);
router.post('/accounts', auth, AccountController.createAccount);
router.patch('/accounts/:accountNumber', auth, AccountController.updateAccount);
router.delete('/accounts/:accountNumber', auth, AccountController.deleteAccount);
router.get('/transactions/:accountNumber', TransactionController.fetchAllTransaction);
router.post('/transactions/:accountNumber/debit', auth, TransactionController.debit);
router.post('/transactions/:accountNumber/credit', auth, TransactionController.credit);

export default router;
