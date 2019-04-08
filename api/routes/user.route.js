import { Router} from 'express';

//controller
import UserController from '../controllers/user.controllers'

const router = Router();

router.get('/', UserController.fetchAllUsers);
router.post('/', UserController.addUser);
router.get('/:id', UserController.getSingleUser);

export default router;
 