import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import User from './user';

class Follow extends Model {
  public id!: number;
  public followerId!: number;
  public followedId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Follow.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    followerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    followedId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'follows',
    indexes: [
      {
        unique: true,
        fields: ['followerId', 'followedId'],
      },
    ],
  }
);

User.belongsToMany(User, { as: 'Followers', through: Follow, foreignKey: 'followedId', otherKey: 'followerId' });
User.belongsToMany(User, { as: 'Following', through: Follow, foreignKey: 'followerId', otherKey: 'followedId' });

export default Follow;