import express from 'express';
import controller from '../controllers/userController';
import validateToken from '../middlewares/auth';
import verifyAdmin from '../middlewares/verifyAdmin';

const router : express.Router = express.Router();

router.post('/register', controller.createUser);
router.post('/login', controller.login);
router.get('/', validateToken, verifyAdmin, controller.getUsers);

export default router;
