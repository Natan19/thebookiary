const bcrypt = require('bcrypt');
const { User, validate } = require('../models/user');

module.exports = {
	async login(req, res) {
		const { email, password } = req.headers;
		const savedUser = await User.findOne({email}).select(['password', 'name', 'email']);
		if (savedUser) {
			const savedPassword = savedUser.password;
			await bcrypt.compare(password, savedPassword).then(function(response) {
				if(!response) return res.status(400).json({error: 'senha inválida!'});
			});
			const token = savedUser.generateAuthToken();
			return res.header('x-auth-token', token).send({
				'success':'login authentication was successful!'
			});
		}
		return res.status(400).json({ error: 'user not found!'});
	},
	async store(req, res) {
		const dataObj = { name: req.headers.name, email: req.headers.email, password: req.headers.password };
		const error = validate(dataObj);

		if (error.error) return res.status(400).send(error);
		const { name, email, password } = req.headers;

		let user = await User.findOne({ email: req.body.email });
		if (user) return res.status(400).send('User already registered');

		user = new User({
			name,
			password,
			email
		});
		user.password = await bcrypt.hash(user.password, 10);
		
		try {
			await user.save();
		} catch (error) {
			res.json({error: 'user already exists!'}, 400);	
		}
		const token = user.generateAuthToken();
		res.status(200).header('x-auth-token', token).send();
	}
};