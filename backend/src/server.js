const config = require('config');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const redis = require('redis');
const bluebird = require('bluebird');

const routes = require('./routes');
const app = express();

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);
const redisClient = redis.createClient(8100);

redisClient.on('error', (err) => {
	console.log('err '+err);
});

redisClient.on('connect', () => console.log('==> CONNECTED'));

if (!config.get('myprivatekey')) {
	console.error('FATAL ERROR: myprivatekey is not defined.');
	process.exit(1);
}

mongoose.connect('mongodb+srv://omnistack-natan:9ojtYpwDoSCRKqXj@cluster0-gtna0.mongodb.net/thebookiary?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
const corsOptions = {
	origin: 'http://localhost:3001',
	optionsSucessStatus: 200,
	exposedHeaders: ['x-auth-token']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(function(req, res, next) {
	req.redisClient = redisClient;
	next();
});
app.use(routes);

app.listen(3000, () => console.log('Rodando!'));