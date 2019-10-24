const config = require('config');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const routes = require('./routes');
const app = express();

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
	optionsSucessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(routes);

app.listen(3000, () => console.log('Rodando!'));