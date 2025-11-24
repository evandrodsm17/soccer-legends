// Exemplo de uma nova migration para adicionar a coluna 'ativo'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Usuarios', 'ativo', {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('Usuarios', 'ativo');
  }
};