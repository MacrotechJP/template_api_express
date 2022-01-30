const passport = require('passport');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const db = require('../../models/index');
const genPassword = require('../../utils/passwordUtils').genPassword;
const mailSend = require('../../utils/mailSendUtils').mailSend;
const formatDate = require('../../utils/dateUtils').formatDate;
const Op = Sequelize.Op;


const authController = {
  /**
   * 新規会員登録
   * @param {*} req リクエスト
   * @param {*} res レスポンス
   */
  signUp: async (req, res) => {
    passport.authenticate('signup', async (err, user, info) => {
      try {
        if (err || !user) return res.status(200).json({ result: 'error', error_message: info.message });
        // 会員登録完了メール送信
        const mailSendResult = await mailSend({
          subject: '【Cloud Wiki】会員登録完了のお知らせ',
          to: user.userEmail
        }, 'sign-up', { activeTokenCode: user.userActiveToken })
        if(mailSendResult) {
          res.status(200).json({ result: 'success', user:user });
        } else {
          res.status(200).json({ result: 'error', error_message: 'Failed to send email' });
        }
      } catch (error) {
        res.status(200).json({ result: 'error', error_message: 'Login process failed' });
      }
    })(req, res);
  },

  /**
   * 会員ログイン
   * @param {*} req リクエスト
   * @param {*} res レスポンス
   */
  signIn: async (req, res) => {
    passport.authenticate('login', async (err, user, info) => {
      try {
        if (err || !user) return res.status(200).json({ result: 'error', error_message: info.message });
        // ログイン処理
        req.login(user, { session: false }, async (error) => {
          if (error) return res.status(200).json({ result: 'error', error_message: 'Login process failed' });

          const body = { userId: user.userId, userEmail: user.userEmail, userIsActive: user.userIsActive };
          const token = jwt.sign({ user: body }, 'TOP_SECRET', { expiresIn: '1d' });

          res.status(200).json({ result: 'success', user:user, token: token });
        });
      } catch (error) {
        res.status(200).json({ result: 'error', error_message: 'Login process failed' });
      }
    })(req, res);
  },

  /**
   * アカウント有効化（メール送信）
   * @param {*} req
   * @param {*} res
   */
  sendAccountActivation: async (req, res) => {
    // ユーザー更新用データ
    const updateData = { userActiveToken: uuidv4() }
    // ユーザー情報の更新
    let updateResult = false
    await db.User.update({
      userActiveToken: updateData.userActiveToken
    },{
      where: { userId: req.user.userId }
    }).then((result) => {
      updateResult = result
      if (!updateResult) return res.status(200).json({ result: 'error', error_message: "Update failed" });
    }).catch((error) => {
      return res.status(200).json({ result: 'error', error_message: error });
    });
    // アカウント有効化メール送信
    const mailSendResult = await mailSend({
      subject: '【Cloud Wiki】アカウント有効化のお知らせ',
      to: req.user.userEmail
    }, 'account-activation', {
      activeTokenCode: updateData.userActiveToken
    })
    if(mailSendResult) {
      res.status(200).json({ result: 'success' });
    } else {
      res.status(200).json({ result: 'error', error_message: 'Failed to send email' });
    }
  },

  /**
   * アカウント有効化（ユーザー情報更新）
   * * ユーザーTB更新 → パスワード再設定TB更新
   * @param {*} req
   * @param {*} res
   */
  beginAccountActivation: async (req, res) => {
    const activeTokenCode = req.body.activeTokenCode
    // ユーザー検索
    let user = null
    await db.User.findOne({ where: { activeTokenCode: [activeTokenCode] } }).then(resultUser => {
      user = resultUser
    }).catch((error) => {         // ユーザー情報取得失敗
      res.status(200).json({ result: 'error', error_message: error });
    });
    // ユーザーが存在しない場合
    if (!user) return res.status(200).json({ result: 'error', error_message: 'User does not exist' });
    // ユーザーが存在する場合 + ユーザー情報更新
    await db.User.update( { isActive: true }, { where: { id: user.id } }
    ).then((result) => {                                    // ユーザー情報更新成功
      if (result) { res.status(200).json({ result: 'success' }); }
      else { res.status(200).json({ result: 'error', error_message: 'Failed to update user information' }); }
    }).catch((error) => {                                   // ユーザー情報更新失敗
      res.status(200).json({ result: 'error', error_message: error });
    });
  },

  /**
   * パスワード再設定（メール送信）
   * * 脆弱性対策としてユーザー未存在時も`success`とする
   * @param {*} req リクエスト
   * @param {*} res レスポンス
   */
  sendPasswordReset: async (req, res) => {
    // パスワード再設定の対象メールアドレス
    const userEmail = req.body.userEmail
    // パスワード再設定トークン期限（1時間）
    const resetPasswordTokenExpair = new Date()
    resetPasswordTokenExpair.setHours(resetPasswordTokenExpair.getHours() + 1);
    // ユーザーパスワード登録用データ
    const registData = {
      resetPasswordToken: uuidv4(),
      resetPasswordTokenExpair: resetPasswordTokenExpair
    }
    // ユーザー検索
    let user = null
    await db.User.findOne({ where: { userEmail: [userEmail] } }).then(resultUser => {
      user = resultUser
    }).catch((error) => {         // ユーザー情報取得失敗
      res.status(200).json({ result: 'error', error_message: error });
    });
    // ユーザーが存在しない場合
    if (!user) return res.status(200).json({ result: 'success' });
    // ユーザーが存在する場合 + ユーザーパスワード登録
    let userPassword = null
    await db.UserPassword.create({
      userId: user.id,
      resetPasswordToken: registData.resetPasswordToken,
      resetPasswordTokenExpair: registData.resetPasswordTokenExpair,
      isUsed: false,
      usedAt: null,
      createdAt: new Date(),
      updatedAt: new Date()
    }).then(resultUserPassword  => {
      userPassword = resultUserPassword
    }).catch((error) => {         // ユーザー情報取得失敗
      res.status(200).json({ result: 'error', error_message: error });
    });
    // パスワード再設定メール送信
    const mailSendResult = await mailSend({
      subject: '【Agile Boost】パスワード再設定のお知らせ',
      to: user.userEmail
    }, 'password-reset', {
      resetPasswordToken: userPassword.resetPasswordToken,
      resetPasswordTokenExpair: formatDate(userPassword.resetPasswordTokenExpair, 'yyyy/MM/dd HH:mm:ss')
    })
    if(mailSendResult) {
      res.status(200).json({ result: 'success' });
    } else {
      res.status(200).json({ result: 'error', error_message: 'Failed to send email' });
    }
  },

  /**
   * パスワード再設定（ユーザー情報更新）
   * * ユーザーTB更新 → パスワード再設定TB更新
   * @param {*} req リクエスト
   * @param {*} res レスポンス
   */
  beginPasswordReset: (req, res) => {
    // パスワード再設定トークン
    const resetPasswordToken = req.body.resetPasswordToken
    // パスワード再設定トークン検索
    db.UserPassword.findOne({
      where: {
      [Op.and]: {
        resetPasswordToken: resetPasswordToken,
        resetPasswordTokenExpair: {
          [Op.gte]: new Date()
          },
        isUsed: false
      }
    }}).then(userPassword => {
      if (userPassword) {         // パスワード再設定トークン存在時
        // パスワード/ハッシュ 取得
        const saltHash = genPassword(req.body.userPassword);
        console.log(saltHash)
        // ユーザー情報更新処理
        db.User.update(
          { userPassword: saltHash.hash, passwordSalt: saltHash.salt },
          { where: { id: userPassword.userId } }
        ).then(() => {            // 更新処理成功時
          // パスワード再設定レコード更新処理
          db.UserPassword.update(
            { isUsed: true, usedAt: new Date(), },
            { where: { id: userPassword.id } }
          ).then(() => {          // 更新処理成功時
            res.status(200).json({ result: 'success' });
          }).catch((error) => {   // 更新処理失敗時
            res.status(200).json({ result: 'error', error_message: error });
          });
        }).catch((error) => {     // 更新処理失敗時
          res.status(200).json({ result: 'error', error_message: error });
        });
      } else {                    // パスワード再設定トークン未存在時
        res.status(200).json({ result: 'error', error_message: "No Valid Reset Password Token Exists" });
      }
    }).catch((error) => {         // ユーザー情報取得失敗
      res.status(200).json({ result: 'error', error_message: error });
    });
  },
}

module.exports = authController;