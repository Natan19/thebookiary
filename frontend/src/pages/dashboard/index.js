import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import './Dashboard.css';
// Services
import fetchSavedBooks from '../../services/fetchSavedBooks';
import saveBookInfoToUser from '../../services/saveBookInfoToUser';
// Components
import SearchBar from '../../components/SearchBar/index';
import Header from '../../components/Header/Header';
import { toast, ToastContainer } from 'react-toastify';
import Card from '../../components/Card/Card';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            savedBooks:[],
            bookInfo:{}
        }
        this.getBooks = this.getBooks.bind(this);
    }
    getBooks = () => {
        fetchSavedBooks()
        .then(response=>response.json())
        .then(
            (response) => {
                if(response.status === 400) {
                    toast('An error occured with your request', { autoClose: 2000});
                    return;
                }
                this.setState({ savedBooks: response })
            }
        );
    }
    componentDidMount() {
       this.getBooks();
    }
    componentDidUpdate(prevProps, prevState) {
        if(prevState.bookInfo !== this.state.bookInfo) {
            if(this.state.bookInfo) {
                saveBookInfoToUser(this.state.bookInfo)
                .then(response=>response.json())
                .then((response) => {
                    if(response.status === 400) {
                        toast.error('An error occuredd with your request', { autoClose: 2000});
                        return;
                    }
                    toast.success('The book was successfully added to your list!', { autoClose: 2000});
                })
                .then(() => {
                    this.getBooks();
                });
            }
            
        }
        
    }
    componentWillUnmount() {
    }
    setSelectedBookInfo = (bookInfo) => {
        this.setState({ bookInfo });
    }
    render() {
        return (
            <>
                <Helmet>
                    <meta charset="utf-8"/>
                    <title>The Bookiary - Your list!</title>
                </Helmet>
                <ToastContainer/>
                <Header>
                    <SearchBar setSelectedResult={this.setSelectedBookInfo}></SearchBar>                    
                </Header>
                <div className="content-container">
                   <Card bookArr={this.state.savedBooks}/>
                </div>
            </>
        )
    }
}

export default Dashboard;