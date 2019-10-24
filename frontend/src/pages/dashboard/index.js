import React from 'react';
import { Helmet } from 'react-helmet';
import './Dashboard.css';
import logo from '../../assets/dashboard-logo.svg';

export default function Dashboard({ history }) {
    return (
        <>
            <Helmet>
                <meta charset="utf-8"/>
                <title>The Bookiary - Your list!</title>
            </Helmet>
            <div className="header">
                <div className="header-content-container">
                    <img src={logo} alt="dashboard-logo" onClick={() => history.push('/')}/>
                    <div className="searchbar-container">
                        <input type="text" placeholder="Find a book"/>
                    </div>
                    <div className="userinfo-container">

                    </div>
                </div>
            </div>
            <div className="content-container">
            </div>
        </>
    )
}