const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 50
	},
	email: {
		type: String,
		require: true,
		minlength: 5,
		maxlength: 255,
		unique: true
	},
	password: {
		type: String,
		require: true,
		minlength: 3,
		maxlength: 255
	},
	isAdmin: Boolean
});

UserSchema.methods.generateAuthToken = function() {
	const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('myprivatekey'), { expiresIn: '30m'});
	return token;
};

UserSchema.post('save', function(error, doc, next) {
	if (error.name === 'MongoError' && error.code === 11000) {
		next(new Error('The email already exists!'));
	} else {
		next();
	}
});

const User = mongoose.model('User', UserSchema);

function validateUser(user) {
	const schema = {
		name: Joi.string().min(3).max(50).required(),
		email: Joi.string().min(3).max(255).required().email(),
		password: Joi.string().min(3).max(255).required()
	};

	return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;