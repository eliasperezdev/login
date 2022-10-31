import express from 'express';
import controller from '../controllers/userController';

const router : express.Router = express.Router();

router.post('/register', controller.createUser);
router.post('/login', controller.login);

export default router;
