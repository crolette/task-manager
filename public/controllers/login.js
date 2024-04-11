const {
	getUser,
	checkUserExists,
	checkPassword,
} = require('../utils/getUsers');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { setUser, setHashPwd } = require('../utils/setUsers');

loginUser = async (req, res) => {
	console.log('loginUser');
	res.render('login');
};

loginCheck = async (req, res) => {
	console.log('loginCheck')
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

	if (checkPassword(user, pwd)) {
		// if user exists create a jwt token
		res.locals.user = username;
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

		return res.status(200).redirect('/home');
	} else {
		return res
			.status(401)
			.render('login', { message: `Wrong username or password` });
	}
};

logOut = async (req, res) => {
	console.log('logout');
	const cookie = req.cookies;
	console.log(cookie);

	if (!cookie)
		return res
			.status(204)
			.render('login', { message: 'You need to login or create an account' });

	// delete the cookie when logged out
	res.clearCookie('jwt', {
		httpOnly: true,
		sameSite: 'None',
		secure: true,
		maxAge: 0,
	});

	return res.status(204).redirect('/');
};

signUpForm = async (req, res) => {
	res.render('signup');
};

signUp = async (req, res) => {
	const { username, pwd } = req.body;
	// if no username or pwd submitted, sends a 400 error

	const userExists = await checkUserExists(username);
	if (userExists)
		return res.status(200).render('signup', {
			message: 'User already exists, choose another username',
		});
	else {
		console.log('create user');
		const [hash, salt] = await setHashPwd(pwd);

		await setUser(username, hash, salt);
		console.log('user created');
		// if user exists create a jwt token
		const accessToken = jwt.sign(
			{ username: username },
			process.env.ACCESS_TOKEN
		);

		const refreshToken = jwt.sign(
			{ username: username },
			process.env.REFRESH_TOKEN,
			{ expiresIn: '1d' }
		);

		res.cookie('jwt', refreshToken, {
			httpOnly: true,
			sameSite: 'None',
			secure: true,
			maxAge: 24 * 60 * 60 * 100,
		});
		return res.status(200).redirect('/home');
	}
};

module.exports = {
	loginUser,
	loginCheck,
	logOut,
	signUpForm,
	signUp,
};
