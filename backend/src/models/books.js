const mongoose = require('mongoose');

const BooksSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        require: true,
        minlength: 5,
        maxlength: 255,
    },
    author: {
        type: String,
        require: true,
        minlength: 5,
        maxlength: 255
    },
    categories: {
        type: Array,
        required: true
    },
    pageCount: {
        type: Number,
        required: true
    },
    thumbnail: {
        type: String,
        require: true
    }
});

const Books = mongoose.model('Books', BooksSchema);

exports.Books = Books;