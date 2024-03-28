require('dotenv').config();
const jwt = require('jsonwebtoken');

const checkUser = (req, res, next) => {
	const token = req.cookies.jwt;
	if (token) {
		jwt.verify(token, process.env.REFRESH_TOKEN, (err, decodedToken) => {
			if (err) {
				res.locals.user = null;
				console.log('error');
				next();
			} else {
				let user = decodedToken.username;
				console.log("user exists");
				console.log(user);
				res.locals.user = user;
				next();
			}
		});
	} else {
		console.log('else');
		res.locals.user = null;
		next();
	}
};

module.exports = {
	checkUser,
};
