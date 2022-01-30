const request = require('request');
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const upload = require('../../config/multer').upload;
const uploadSingle = upload.single('file');
const authController = require('../../controllers/v1/auth_controller');
const passport = require('passport');




const config = require('../../config/config.json')[express().get('env')];

/**
 * --------------- ルーティング設定 ---------------
 */
/** general */
router.get("/health", validateParam([]), isParamInvalid, async (req, res) => {
	const job = await wikiDemoCreate.add({ video: 'http://example.com/video1.mov' });
	res.status(200).json({ result: 'success', message: 'running' });
});
router.post("/recaptcha/verify", validateParam([]), isParamInvalid, (req, res) => {
	request.post({
		uri: "https://www.google.com/recaptcha/api/siteverify",
		formData: {
			"secret": config.appConf.googleRecaptcha.secretKey,
			"response": req.body.token
		}
	}, function(error, response, body){
		body = JSON.parse(body)
		if (body.success && body.score > 0.8) {
			res.status(200).json({ result: 'success' });
		} else {
			res.status(200).json({ result: 'error', error_message: 'Verification failed' });
		}
	});
});

/** auth */
router.post("/auth/sign-up", validateParam(['userEmail', 'userPassword']), isParamInvalid, (req, res) => {
	authController.signUp(req, res)
});
router.post("/auth/sign-in", validateParam([]), isParamInvalid, (req, res, next) => {
	authController.signIn(req, res, next)
});
router.delete("/auth/sign-out", validateParam([]), isParamInvalid, (req, res) => {
	res.status(204).json();
});
router.get("/auth/me", checkLoggedIn, validateParam([]), isParamInvalid, (req, res) => {
	res.status(200).json({ result: 'success', user: req.user });
});
router.get('/auth/send-account-activation', checkLoggedIn, (req, res) => {
	authController.sendAccountActivation(req, res)
});
router.post('/auth/begin-account-activation', validateParam(['activeTokenCode']), isParamInvalid, (req, res) => {
	authController.beginAccountActivation(req, res)
});
router.post("/auth/send-password-reset", validateParam(['userEmail']), isParamInvalid, (req, res) => {
	authController.sendPasswordReset(req, res)
});
router.post("/auth/begin-password-reset", validateParam(['resetPasswordToken', 'userPassword']), isParamInvalid, (req, res) => {
	authController.beginPasswordReset(req, res)
});


/**
 * --------------- チェックメソッド ---------------
 */
/**
 * ログイン必須判定
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function checkLoggedIn(req, res, next) {
	passport.authenticate('jwt', { session: false }, function(err, user) {
		if (err || !user) {
			return res.status(401).json({ result: 'error', error_message: "InvalidAuthenticationInfo" });
		} else {
			req.user = user
			next()
		}
  })(req, res, next);
}

/**
 * URLパラメーターエラー存在チェック
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function isParamInvalid(req, res, next) {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {		// パラメーターエラー有り
		res.status(400).json({ data: 'Parameter Invalid', detail: errors.array() });
	} else {						// パラメーターエラー無し
		next()
	}
}

/**
 * URLパラメーターバリデーション
 * @param paramList バリデーションチェック対象のパラメーター名
 * @returns checkList バリデーションチェック対象のメソッドリスト
 */
function validateParam(paramList) {
	var checkList = []
	/** ユーザー関連 */
	if (paramList.some(c => c === 'userEmail')) {
		checkList.push(
			body('userEmail').not().isEmpty().withMessage('メールアドレスは必須項目')
								.isEmail().withMessage('メールアドレスの形式不備')
		)
	}
	if (paramList.some(c => c === 'userPassword')) {
		checkList.push( body('userPassword').not().isEmpty().withMessage('パスワードは必須項目') )
	}
	if (paramList.some(c => c === 'activeTokenCode')) {
		checkList.push( body('activeTokenCode').not().isEmpty().withMessage('有効化コードは必須項目') )
	}
	if (paramList.some(c => c === 'resetPasswordToken')) {
		checkList.push( body('resetPasswordToken').not().isEmpty().withMessage('パスワード再設定トークンは必須項目') )
	}
	/** プロジェクト関連 */
	if (paramList.some(c => c === 'projectName')) {
		checkList.push( body('projectName').not().isEmpty().withMessage('プロジェクト名は必須項目') )
	}
	if (paramList.some(c => c === 'isPrivate')) {
		checkList.push( body('isPrivate').not().isEmpty().withMessage('非公開フラグは必須項目') )
	}
	if (paramList.some(c => c === 'seacretCode')) {
		checkList.push( body('seacretCode').not().isEmpty().withMessage('認証コードは必須項目') )
	}
	if (paramList.some(c => c === 'infoTitle')) {
		checkList.push( body('infoTitle').not().isEmpty().withMessage('お知らせタイトルは必須項目') )
	}
	if (paramList.some(c => c === 'infoDetail')) {
		checkList.push( body('infoDetail').not().isEmpty().withMessage('お知らせ内容は必須項目') )
	}
	if (paramList.some(c => c === 'serviceName')) {
		checkList.push( body('serviceName').not().isEmpty().withMessage('サービス名は必須項目') )
	}
	if (paramList.some(c => c === 'iconPath')) {
		checkList.push( body('iconPath').not().isEmpty().withMessage('アイコンパスは必須項目') )
	}
	if (paramList.some(c => c === 'accessUrl')) {
		checkList.push( body('accessUrl').not().isEmpty().withMessage('アクセスURLは必須項目') )
	}
	if (paramList.some(c => c === 'storeId')) {
		checkList.push( body('storeId').not().isEmpty().withMessage('ストアIDは必須項目') )
	}
	return checkList;
}

module.exports = router;