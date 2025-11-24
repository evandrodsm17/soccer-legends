const { Model } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    checkPassword(password) {
      return bcrypt.compare(password, this.passwordHash);
    }
  }

  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: { isEmail: true }
      },

      password: {
        type: DataTypes.VIRTUAL,
        allowNull: false,
      },

      passwordHash: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "User",

      hooks: {
        beforeSave: async (user) => {
          if (user.password) {
            user.passwordHash = await bcrypt.hash(user.password, 10);
          }
        },
      },
    }
  );

  return User;
};
