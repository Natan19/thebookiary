const axios = require('axios').default;

const booksApi = axios.create({
    baseURL: 'https://www.googleapis.com/books/v1/'
});

module.exports = booksApi;