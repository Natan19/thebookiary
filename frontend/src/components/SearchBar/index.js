import React, { Component } from 'react';
import './searchBar.css';
import { FaPlus } from 'react-icons/fa';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            searchParam: '',
            results: []
        };
        this.setSelectedResult = this.props.setSelectedResult.bind(this);
    }

    componentDidMount() {
    }
    
    componentDidUpdate(prevProps, prevState) {
        if (prevState.searchParam !== this.state.searchParam) {
            if (this.state.searchParam.length > 3) {
                fetch(process.env.REACT_APP_API_URL+'/api/books/'+encodeURIComponent(this.state.searchParam), {
                    method: 'GET',
                    headers:{
                        authorization: localStorage.getItem('x-auth-token')
                    }
                })
                .then(response=>response.json())
                .then(
                    (response) => {
                        if(response.status === 400) {
                            return;
                        }
                        this.setState({results: response})
                    }
                );
            }

            if (this.state.searchParam.length === 0) {
                this.setState({results: {}});
            }
        }
    }

    componentWillUmnount() {
    }
    
    clearResults = () => {
        this.setState({ results: {}})
    }
    
    render() {
        return (
            <>
                <div>
                    <input type="text" onKeyUp={e => this.setState({ searchParam: e.target.value })} placeholder="Find a book"/>
                    <div className="results-container" onMouseLeave={() => this.setState({results:[]})}>
                        {Object.keys(this.state.results).map(key => (
                            <div key={this.state.results[key].id} className="book-container">
                                <img src={this.state.results[key].volumeInfo.imageLinks ? this.state.results[key].volumeInfo.imageLinks.thumbnail : ''}/>
                                <p title={this.state.results[key].volumeInfo.title}>{this.state.results[key].volumeInfo.title}</p>
                                <FaPlus className="FaPlus" onClick={() => this.setSelectedResult(this.state.results[key])} />
                            </div>
                        ))}
                    </div>
                </div>
            </>
        )
    }
}

export default SearchBar; 