const LocalStrategy = require('passport-local').Strategy
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const { v4: uuidv4 } = require('uuid');
const db = require('../models/index');
const { validPassword, genPassword } = require('../utils/passwordUtils');


module.exports = (passport) => {
  /**
  * --------------- サインアップの設定 ---------------
  */
  passport.use('signup', new LocalStrategy({
      usernameField: 'userEmail',
      passwordField: 'userPassword'
    }, async (userEmail, userPassword, done) => {
      // パスワード/ハッシュ 取得
      const saltHash = genPassword(userPassword);
      // ユーザー検索
      db.User.findOne({ where: { userEmail: [userEmail] } }).then(user => {
        if (user) return done(null, false, { message: 'This email address already exists' })
        // ユーザー作成
        db.User.create({
          userEmail: userEmail,
          userPassword: saltHash.hash,
          userPasswordSalt: saltHash.salt,
          userActiveToken: uuidv4()
        }).then(user => {
          return done(null, user)
        }).catch((error) => {
          return done(null, false, { message: 'Failed to create user' })
        });
      }).catch((error) => {
        return done(null, false, { message: 'Failed to search user' })
      });
    })
  );

  /**
  * --------------- サインインの設定 ---------------
  */
  passport.use('login', new LocalStrategy({
      usernameField: 'userEmail',
      passwordField: 'userPassword'
    }, async (userEmail, userPassword, done) => {
      db.User.findOne({ where: { userEmail: userEmail } }).then(user => {
        if (user) {       // ユーザー存在時
          if (validPassword(userPassword, user.userPassword, user.userPasswordSalt)) {
            return done(null, user)
          } else {
            return done(null, false, { message: 'Your password is incorrect' })
          }
        } else {          // ユーザー未存在時
          return done(null, false, { message: 'User does not exist' })
        }
      }).catch(error => {
        return done(error, false, { message: 'User search failed' })
      })
    }
  ));

  /**
  * --------------- トークン認証の設定 ---------------
  */
  passport.use(new JwtStrategy({
      secretOrKey: 'TOP_SECRET',
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
    }, async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        return done(error);
      }
    }
  ));
}