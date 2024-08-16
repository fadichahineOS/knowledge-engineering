import { body } from 'express-validator';

export const articleValidator = [
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 3, max: 255 })
    .withMessage('Title must be between 3 and 255 characters'),
  body('content')
    .notEmpty()
    .withMessage('Content is required')
    .isLength({ min: 10 })
    .withMessage('Content must be at least 10 characters long'),
  body('published')
    .optional()
    .isBoolean()
    .withMessage('Published must be a boolean value'),
];