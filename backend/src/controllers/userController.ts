import { Request, Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
import { models } from '../models';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwt';
import { sendPasswordResetEmail } from '../utils/email';
import { randomBytes } from 'crypto';
import { Op } from 'sequelize';
import { ValidationError } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';


export const register = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await models.User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate a unique username
    let username = `${firstName.toLowerCase()}${lastName.toLowerCase()}`;
    let usernameSuffix = '';
    while (await models.User.findOne({ where: { username: username + usernameSuffix } })) {
      usernameSuffix = uuidv4().substr(0, 8);
    }
    username += usernameSuffix;

    const user = await models.User.create({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
      role: 'reader', // Default role for regular sign-up
      isApproved: true, // Readers are automatically approved
    });

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error: unknown) {
    console.error('Registration error:', error);
    if (error instanceof ValidationError) {
      res.status(400).json({ message: 'Validation error', errors: error.errors });
    } else if (error instanceof Error) {
      res.status(500).json({ message: 'Internal server error', error: error.message });
    } else {
      res.status(500).json({ message: 'Internal server error', error: 'An unknown error occurred' });
    }
  }
};


export const writerSignup = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, phoneNumber, discipline, password } = req.body;

    if (!password) {
      return res.status(400).json({ message: 'Password is required' });
    }

    const existingUser = await models.User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate a unique username
    let username = `${firstName.toLowerCase()}${lastName.toLowerCase()}`;
    let usernameSuffix = '';
    while (await models.User.findOne({ where: { username: username + usernameSuffix } })) {
      usernameSuffix = uuidv4().substr(0, 8);
    }
    username += usernameSuffix;

    const user = await models.User.create({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
      role: 'writer',
      isApproved: false,
      bio: `Interested in ${discipline}`,
    });

    res.status(201).json({
      message: 'Writer signup successful. Awaiting approval.',
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        role: user.role,
        isApproved: user.isApproved,
      },
    });
  } catch (error: unknown) {
    console.error('Writer signup error:', error);
    if (error instanceof ValidationError) {
      res.status(400).json({ message: 'Validation error', errors: error.errors });
    } else if (error instanceof Error) {
      res.status(500).json({ message: 'Internal server error', error: error.message });
    } else {
      res.status(500).json({ message: 'Internal server error', error: 'An unknown error occurred' });
    }
  }
};


export const login = async (req: Request, res: Response) => {
  try {
    const { emailOrUsername, password } = req.body;

    if (!emailOrUsername || !password) {
      return res.status(400).json({ message: 'Email/Username and password are required' });
    }

    const user = await models.User.findOne({
      where: {
        [Op.or]: [{ email: emailOrUsername }, { username: emailOrUsername }]
      }
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid email/username or password' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: 'Invalid email/username or password' });
    }

    // Check if the user is a writer and if they're approved
    if (user.role === 'writer' && !user.isApproved) {
      return res.status(403).json({ 
        message: 'Your writer account is pending approval. Please wait for admin approval.',
        isApproved: false,
        role: 'writer'
      });
    }

    const token = generateToken(user.id);

    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        role: user.role,
        isApproved: user.isApproved,
      },
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const requestPasswordReset = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await models.User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const resetToken = randomBytes(20).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

    await user.update({
      resetToken,
      resetTokenExpiry,
    });

    await sendPasswordResetEmail(user.email, resetToken);

    res.json({ message: 'Password reset email sent' });
  } catch (error) {
    console.error('Password reset request error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, newPassword } = req.body;
    const user = await models.User.findOne({
      where: {
        resetToken: token,
        resetTokenExpiry: { [Op.gt]: new Date() },
      },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await user.update({
      password: hashedPassword,
      resetToken: null,
      resetTokenExpiry: null,
    });

    res.json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Password reset error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = await models.User.findByPk(req.user.userId, {
      attributes: ['id', 'username', 'email', 'role', 'bio', 'articlesWritten', 'isApproved']
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const followUser = async (req: AuthRequest, res: Response) => {
  try {
    const followerId = req.user?.userId;
    const { followedId } = req.body;

    if (!followerId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const follower = await models.User.findByPk(followerId);
    const followed = await models.User.findByPk(followedId);

    if (!follower || !followed) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (followed.role !== 'writer') {
      return res.status(400).json({ message: 'You can only follow writers' });
    }

    await models.Follow.create({
      followerId,
      followedId,
    });

    res.status(200).json({ message: 'Successfully followed the user' });
  } catch (error) {
    console.error('Follow error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


export const approveWriter = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const adminUser = await models.User.findByPk(req.user.userId);
    if (!adminUser || adminUser.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    const { writerId } = req.params;
    const writer = await models.User.findByPk(writerId);

    if (!writer) {
      return res.status(404).json({ message: 'Writer not found' });
    }

    if (writer.role !== 'writer') {
      return res.status(400).json({ message: 'User is not a writer' });
    }

    await writer.update({ isApproved: true });

    res.json({ 
      message: 'Writer approved successfully', 
      writer: { 
        id: writer.id, 
        username: writer.username, 
        isApproved: writer.isApproved 
      } 
    });
  } catch (error) {
    console.error('Approve writer error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getWriters = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const adminUser = await models.User.findByPk(req.user.userId);
    if (!adminUser || adminUser.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    const writers = await models.User.findAll({
      where: { role: 'writer' },
      attributes: ['id', 'username', 'email', 'isApproved']
    });

    res.json({ writers });
  } catch (error) {
    console.error('Get writers error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};