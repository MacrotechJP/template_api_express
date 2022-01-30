'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // User.hasMany(models.UserWiki, { foreignKey: 'userId' });
    }
  };
  User.init({
    userId: {                   // 主キー
      type: DataTypes.INTEGER,  field: 'user_id',  comment: "ユーザーID",  allowNull: false,
      autoIncrement: true,   primaryKey: true
    },
    userEmail: {                // 標準キー
      type: DataTypes.STRING,  field: 'user_email',  comment: "ユーザーメールアドレス",  allowNull: false,
      unique: true
    },
    userPassword: {             // 標準キー
      type: DataTypes.STRING,  field: 'user_password',  comment: "ユーザーパスワード",  allowNull: false
    },
    userPasswordSalt: {         // 標準キー
      type: DataTypes.STRING,  field: 'user_password_salt',  comment: "ユーザーパスワードソルト",  allowNull: false
    },
    userIsActive: {             // 標準キー
      type: DataTypes.BOOLEAN,  field: 'user_is_active',  comment: "ユーザー有効化状態",  allowNull: false,
      defaultValue: false
    },
    userActiveToken: {          // 標準キー
      type: DataTypes.STRING,  field: 'user_active_token',  comment: "ユーザー有効化トークン",  allowNull: false
    },
    userResetPassToken: {       // 標準キー
      type: DataTypes.STRING,  field: 'user_reset_pass_token',  comment: "ユーザーパスワード再設定トークン"
    },
    userResetPassTokenExpair: { // 標準キー
      type: DataTypes.DATE,  field: 'user_reset_pass_token_expair',  comment: "ユーザーパスワード再設定トークン有効期限"
    },
    createdAt: {            // 標準キー
      type: DataTypes.DATE,  field: 'user_created_at',  comment: "ユーザー作成日時",  allowNull: false
    },
    updatedAt: {            // 標準キー
      type: DataTypes.DATE,  field: 'user_updated_at',  comment: "ユーザー更新日時",  allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users'
  });
  return User;
};