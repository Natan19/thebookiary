const booksApi = require('../services/booksApi');
const config = require('config');
const { Books } = require('../models/books');

module.exports = {
	async index(req, res) {
		const params = req.params;
		const apiKey = config.get('googlebooksapikey');
		const response = await booksApi.get('/volumes', {
			params: {
				q:`${params.bookname}`, key: apiKey
			}
		});
		const { items } = response.data;
		return res.json(items);
	},
	async store(req, res) {
		const userId = req.user._id;
		const { title, authors, categories, pageCount } = req.body;
		const thumbnail = req.body.imageLinks.thumbnail;
		
		const savebooks = await Books.create({
			user: userId,
			title,
			authors,
			categories,
			pageCount,
			thumbnail
		});
		
		await savebooks.populate('user').execPopulate();
		
		return res.json(savebooks);
	},
	async listBooks(req, res) {
		const listBooks = await Books.find({ user:{ _id: req.user._id }});
		res.json(listBooks);
	}
};