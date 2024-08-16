import { Model, DataTypes, Sequelize } from 'sequelize';
import  User  from "./user"

interface ArticleAttributes {
  id: number;
  title: string;
  content: string;
  authorId: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface ArticleCreationAttributes {
  title: string;
  content: string;
  authorId: number;
  published: boolean;
}

export class Article extends Model<ArticleAttributes, ArticleCreationAttributes> implements ArticleAttributes {
  public id!: number;
  public title!: string;
  public content!: string;
  public authorId!: number;
  public published!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: any) {
    Article.belongsTo(models.User, { foreignKey: 'authorId', as: 'author' });
  }

  static initModel(sequelize: Sequelize): typeof Article {
    Article.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        authorId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'Users',
            key: 'id',
          },
        },
        published: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        sequelize,
        modelName: 'Article',
        tableName: 'Articles',
      }
    );
    return Article;
  }
}