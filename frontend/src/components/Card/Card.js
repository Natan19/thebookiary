import React from 'react';

export default function Card(props) {
    return (
        <>
            {props.bookArr.map(book => (<div className="book-container" key={book._id}>
                <img src={book.thumbnail ? book.thumbnail : 'https://via.placeholder.com/200x300'}/>
                <div className="info-container">
                    <h4>{book.title}</h4>
                    <p>Author: <span>{ book.authors.length > 0 ? book.authors.join(', ') : 'N/A'}</span></p>
                    <p>Categories: <span>{book.categories.length > 0 ? book.categories.join(', ') : 'N/A'}</span></p>
                    <p>Page count: <span>{book.pageCount ? book.pageCount : 'N/A'}</span></p>
                </div>
            </div>))}
        </>
    )
}