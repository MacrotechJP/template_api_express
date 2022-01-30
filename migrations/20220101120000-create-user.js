'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      userId: {
        type: Sequelize.INTEGER,
        field: 'user_id',
        comment: "ユーザーID",
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      userEmail: {
        type: Sequelize.STRING,
        field: 'user_email',
        comment: "ユーザーメールアドレス",
        allowNull: false,
        unique: true
      },
      userPassword: {
        type: Sequelize.STRING,
        field: 'user_password',
        comment: "ユーザーパスワード",
        allowNull: false
      },
      userPasswordSalt: {
        type: Sequelize.STRING,
        field: 'user_password_salt',
        comment: "ユーザーパスワードソルト",
        allowNull: false
      },
      userIsActive: {
        type: Sequelize.BOOLEAN,
        field: 'user_is_active',
        comment: "ユーザー有効化状態",
        allowNull: false,
        defaultValue: false
      },
      userActiveToken: {
        type: Sequelize.STRING,
        field: 'user_active_token',
        comment: "ユーザー有効化トークン",
        allowNull: false
      },
      userResetPassToken: {
        type: Sequelize.STRING,
        field: 'user_reset_pass_token',
        comment: "ユーザーパスワード再設定トークン"
      },
      userResetPassTokenExpair: {
        type: Sequelize.DATE,
        field: 'user_reset_pass_token_expair',
        comment: "ユーザーパスワード再設定トークン有効期限"
      },
      userCreatedAt: {
        type: Sequelize.DATE,
        field: 'user_created_at',
        comment: "ユーザー作成日時",
        allowNull: false
      },
      userUpdatedAt: {
        type: Sequelize.DATE,
        field: 'user_updated_at',
        comment: "ユーザー更新日時",
        allowNull: false
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};