import express from 'express';
import { createArticle, getAllArticles, getArticleById, updateArticle, deleteArticle } from '../controllers/articleController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { articleValidator } from '../validators/articleValidator';

const router = express.Router();

router.post('/', authMiddleware, articleValidator, createArticle);
router.get('/', getAllArticles);
router.get('/:id', getArticleById);
router.put('/:id', authMiddleware, articleValidator, updateArticle);
router.delete('/:id', authMiddleware, deleteArticle);

export default router;