import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import './Dashboard.css';
import logo from '../../assets/dashboard-logo.svg';
import { toast, ToastContainer } from 'react-toastify';
import SearchBar from '../../components/SearchBar/index';

export default function Dashboard({ history }) {
    const[savedBooks, setSavedBooks] = useState([]);
    const[bookInfo, setBookInfo] = useState({});
    
    useEffect(() => {
        if(Object.keys(bookInfo).length != 0) {
            fetch(process.env.REACT_APP_API_URL+'/api/books', {
                method: 'POST',
                headers:{
                    authorization: localStorage.getItem('x-auth-token'),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(bookInfo.volumeInfo)
            })
            .then(response=>response.json())
            .then(
                function(response){
                    if(response.status === 400) {
                        toast.error('An error occuredd with your request', { autoClose: 2000});
                        return;
                    }
                    toast.success('The book was successfully added to your list!', { autoClose: 2000});
                }
            )
        }
    }, [bookInfo]);

    useEffect(() => {
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
                setSavedBooks(response);
            }
        );
    }, [bookInfo ]);

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
                        <SearchBar setSelectedResult={setBookInfo}/>
                    </div>
                    <div className="userinfo-container">
                    </div>
                </div>
            </div>
            <div className="content-container">
                {savedBooks.map(book => (<div className="book-container" key={book._id}>
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