import express from 'express';
import { deleteUser, getAllUsers, updateUser } from '../controllers/user.js';

const router = express.Router();

router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/', getAllUsers);

export default router;