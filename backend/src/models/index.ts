import sequelize from '../config/database';
import User from './user';
import Follow from './follow';

const models = {
  User,
  Follow,
  // Add other models here as we create them
};

const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Database synchronized successfully.');
  } catch (error) {
    console.error('Unable to synchronize the database:', error);
  }
};

export { sequelize, models, syncDatabase };