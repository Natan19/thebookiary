const bcrypt = require('bcrypt');
const { User, validate } = require('../models/user');

module.exports = {
	async login(req, res) {
		const { email, password } = req.headers;
		
		let savedUser = await req.redisClient.getAsync(email).then((res) => {
			return JSON.parse(res);
		});
		
		if(!savedUser){
			savedUser = await User.findOne({email}).select(['password', 'name', 'email']);
			await req.redisClient.setAsync(email, JSON.stringify(savedUser));
		}

		if (savedUser) {
			const savedPassword = savedUser.password;
			await bcrypt.compare(password, savedPassword).then(function(response) {
				if(!response) return res.status(400).json({error: 'senha inválida!'});
			});
			savedUser = new User({
				name: savedUser.name,
				password: savedUser.password,
				email: savedUser.email
			});
			const token = savedUser.generateAuthToken();
			return res.status(200).header('x-auth-token', token).send({
				'success':'login authentication was successful!'
			});
		}
		return res.status(400).json({ error: 'user not found!'});
	},
	async store(req, res) {
		const { name, email, password } = req.headers;
		const error = validate({name, email, password});

		if (error.error) return res.status(400).send(error);
		
		let user = await User.findOne({ email });
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
			res.status(400).json({error: 'user already exists!'});
		}
		const token = user.generateAuthToken();
		res.status(200).header('x-auth-token', token).send();
	}
};