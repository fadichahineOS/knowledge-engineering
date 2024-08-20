import { Request, Response, NextFunction } from 'express';
import { Optional } from 'sequelize';
import { Article } from '../models/article';
import User from '../models/user';
import { validationResult } from 'express-validator';

interface AuthRequest extends Request {
  user?: User;
}

export const createArticle = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, content } = req.body;
    const authorId = req.user!.id;

    const article = await Article.create({
      title, 
      content,
      authorId,
      published: false,
    });

    res.status(201).json(article);
  } catch (error) {
    next(error);
  }
};

export const getAllArticles = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;

    const { count, rows: articles } = await Article.findAndCountAll({
      where: { published: true },
      include: [{ model: User, as: 'author', attributes: ['id', 'username'] }],
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });

    res.status(200).json({
      articles,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      totalArticles: count,
    });
  } catch (error) {
    next(error);
  }
};

export const getArticleById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const article = await Article.findByPk(id, {
      include: [{ model: User, as: 'author', attributes: ['id', 'username'] }],
    });

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    
    res.status(200).json(article);
  } catch (error) {
    next(error);
  }
};

export const updateArticle = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { title, content, published } = req.body;
    const authorId = req.user!.id;

    const article = await Article.findByPk(id);

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    if (article.authorId !== authorId) {
      return res.status(403).json({ message: 'Unauthorized to update this article' });
    }

    await article.update({ title, content, published });

    res.status(200).json(article);
  } catch (error) {
    next(error);
  }
};

export const deleteArticle = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const authorId = req.user!.id;

    const article = await Article.findByPk(id);

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    if (article.authorId !== authorId) {
      return res.status(403).json({ message: 'Unauthorized to delete this article' });  
    }

    await article.destroy();

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};