module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'avatar_id', {
      type: Sequelize.INTEGER,
      // primary key
      references: {
        model: 'files',
        key: 'id',
      },
      // se a foto for atualizada, ela será atualizada em usuários tbm
      onUpdate: 'CASCADE',
      // se a foto for apagada, ela será setada como nula em usuários
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: async (queryInterface) => {
    return queryInterface.removeColumn('users', 'avatar_id');
  },
};
