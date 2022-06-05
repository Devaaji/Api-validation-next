import express from 'express';
import { getUserinfo, login, register } from '../controllers/auth.js';

const router = express.Router();

router.get('/me', getUserinfo);
router.post('/register', register);
router.post('/login', login);

export default router;