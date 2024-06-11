"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Question.belongsTo(models.Category, {
        foreignKey: "categoryId",
        as: "category",
      });
      Question.hasMany(models.Answer, {
        foreignKey: "questionId",
        as: "answers",
      });
    }
  }
  Question.init(
    {
      text: DataTypes.STRING,
      categoryId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Question",
    }
  );
  Question.beforeCreate((Question) => (Question.id = uuidv4()));

  return Question;
};
