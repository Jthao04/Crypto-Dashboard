import express from 'express';
import authMiddleware from '../Middleware/authMiddleware.js';

const router = express.Router();

router.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: 'This is a protected route', userId: req.userId });
});

export default router;