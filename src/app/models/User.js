import Sequelize, { Model } from 'sequelize';

import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL, // não vai existir na base de dados, apenas no código
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    // vai executar antes de salvar as informações de usuário
    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8); // estamos aplicando a criptografia da senha do user
      }
    });

    return this;
  }

  // para criar o relacionamento entre User e File
  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id' });
  }

  // checando se a senha que o usuário está inserindo está correta
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
