import express from 'express';
import { logInHandler, logOutHandler, signUpHandler } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', logInHandler);
router.post('/signup', signUpHandler);
router.post('/logout', logOutHandler);

export default router;