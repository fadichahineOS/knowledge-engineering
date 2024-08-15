import express from 'express';
import { register, login, requestPasswordReset, resetPassword, getProfile, writerSignup, approveWriter, followUser, getWriters } from '../controllers/userController';
import { authMiddleware, AuthRequest } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/request-password-reset', requestPasswordReset);
router.post('/reset-password', resetPassword);
router.post('/writer-signup', writerSignup);
router.put('/approve-writer/:writerId', authMiddleware, approveWriter);

// Protected routes
router.get('/profile', authMiddleware, getProfile);
router.post('/follow', authMiddleware, followUser);
router.get('/writers', authMiddleware, getWriters);


export default router;