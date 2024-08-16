import sequelize from '../config/database';
import  User  from './user';
import  Follow  from './follow';
import { Article } from './article';

const models = {
  User,
  Follow,
  Article,
};

Object.values(models).forEach((model: any) => {
  if (model.associate) {
    model.associate(models);
  }
});

const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Database synchronized successfully.');
  } catch (error) {
    console.error('Unable to synchronize the database:', error);
  }
};

export { sequelize, models, syncDatabase };