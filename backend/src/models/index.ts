import sequelize from '../config/database';
import User from './user';

// Import other models here as we create them

const models = {
  User,
  // Add other models here
};

// This will sync all models with the database
const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Database synchronized successfully.');
  } catch (error) {
    console.error('Unable to synchronize the database:', error);
  }
};

export { sequelize, models, syncDatabase };