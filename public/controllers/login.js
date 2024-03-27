const { getUser } = require('../utils/getUsers');
require('dotenv').config();
const jwt = require('jsonwebtoken');

loginUser = async (req, res) => {
	res.render('login');
};

loginCheck = async (req, res) => {
	const { username, pwd } = req.body;
	// if no username or pwd submitted, sends a 400 error
	if (!username || !pwd)
		return res.status(400).render('login', {
			message: 'Username and password are required.',
		});

	// if no username in the db, sends a 401 error
	const user = await getUser(username);
	if (user == undefined)
		return res.status(401).render('login', { message: `User do not exist` });

	// if user exists create a jwt token
	const accessToken = jwt.sign(
		{ username: user.username },
		process.env.ACCESS_TOKEN
	);

	const refreshToken = jwt.sign(
		{ username: user.username },
		process.env.REFRESH_TOKEN,
		{ expiresIn: '1d' }
	);

	res.cookie('jwt', refreshToken, {
		httpOnly: true,
		sameSite: 'None',
		secure: true,
		maxAge: 24 * 60 * 60 * 100,
	});

	return res.status(200).render('login', { message: 'Successfully connected' });
};

module.exports = {
	loginUser,
	loginCheck,
};
