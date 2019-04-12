import { Router } from 'express';

// Load 

// controller
import UserController from '../controllers/user.controllers';

const router = Router();

router.get('/', UserController.fetchAllUsers);
router.post('/auth/signup', UserController.signUp);
router.get('/:id', UserController.getSingleUser);

export default router;
