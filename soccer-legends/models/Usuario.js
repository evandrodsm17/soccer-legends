const { Model } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    checkPassword(senha) {
      return bcrypt.compare(senha, this.senhaCriptografada);
    }
  }

  Usuario.init(
    {
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: { isEmail: true },
      },

      ativo:{
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },

      senha: {
        type: DataTypes.VIRTUAL,
        // Sugestão: Adicionar um setter para garantir que a senha seja salva no objeto
        set(val) {
          this.setDataValue("senha", val); // Adicionar validação se quiser
          if (val) {
            // Opcional: Adicionar uma validação de comprimento ou complexidade aqui
          }
        },
      },

      senhaCriptografada: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Usuario",
    }
  );

  return Usuario;
};
