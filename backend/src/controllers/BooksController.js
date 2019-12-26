const booksApi = require('../services/booksApi');
const config = require('config');
const { Books } = require('../models/books');
const mongoose = require('mongoose');

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
		let thumbnail;
		try {
			thumbnail = req.body.imageLinks.thumbnail;
		} catch(error) {
			console.log(error);
		}
		
		const savebooks = await Books.create({
			user: userId,
			title,
			authors,
			categories,
			pageCount,
			thumbnail
		});
		
		await savebooks.populate('user').execPopulate();
		await savebooks.save();

		return res.json(savebooks);
	},
	async listBooks(req, res) {
		const ObjectId = mongoose.Schema.Types.ObjectId;	
		const userId = new ObjectId(req.user._id);
		const listBooks = await Books.find({ user: userId });
		res.json(listBooks);
	}
};