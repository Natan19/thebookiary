const auth = require('./middleware/auth');
const express = require('express');
const LoginController = require('./controllers/LoginController');
const BookController = require('./controllers/BooksController');

const routes = express.Router();

routes.post('/api/login', LoginController.login);
routes.post('/api/users', LoginController.store);
routes.post('/api/books', auth, BookController.store);
routes.get('/api/books/:bookname/', auth, BookController.index);
routes.get('/api/listBooks', auth, BookController.listBooks);

module.exports = routes;