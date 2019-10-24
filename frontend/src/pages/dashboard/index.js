import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import './Dashboard.css';
import logo from '../../assets/dashboard-logo.svg';
import { toast, ToastContainer } from 'react-toastify';

export default function Dashboard({ history }) {
    const[books, setBooks] = useState([]);
    const[searchParam, setSearchParam] = useState('');
    fetch(process.env.REACT_APP_API_URL+'/api/listBooks', {
        method: 'GET',
        headers:{
            authorization: localStorage.getItem('x-auth-token')
        }
    })
    .then(response=>response.json())
    .then(
        function(response){
            if(response.status === 400) {
                toast('An error occuredd with your request', { autoClose: 2000});
                return;
            }
            setBooks(response);
        }
    );
    useEffect(() => {
        if (searchParam.length > 3) {
        }
    }, [searchParam]);
    return (
        <>
            <Helmet>
                <meta charset="utf-8"/>
                <title>The Bookiary - Your list!</title>
            </Helmet>
            <div className="header">
                <ToastContainer/>
                <div className="header-content-container">
                    <img src={logo} alt="dashboard-logo" onClick={() => history.push('/')}/>
                    <div className="searchbar-container">
                        <input type="text" onChange={(e) => setSearchParam(e.target.value)} placeholder="Find a book"/>
                    </div>
                    <div className="userinfo-container">
                    </div>
                </div>
            </div>
            <div className="content-container">
                {books.map(book => (<div className="book-container" key={book._id}>
                    <img src={book.thumbnail}/>
                    <div className="info-container">
                        <h4>{book.title}</h4>
                        <p>Author: <span>{book.author}</span></p>
                        <p>Categories: <span>{book.categories}</span></p>
                        <p>Page count: <span>{book.pageCount}</span></p>
                    </div>
                </div>))}
            </div>
        </>
    )
}