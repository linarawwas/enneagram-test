"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize, DataTypes) => {
  class Answer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Answer.belongsTo(models.Question, {
        foreignKey: "questionId",
        as: "question",
      });
      Answer.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
    }
  }
  Answer.init(
    {
      grade: DataTypes.INTEGER,
      questionId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Answer",
    }
  );
  Answer.beforeCreate((Answer) => (Answer.id = uuidv4()));

  return Answer;
};
