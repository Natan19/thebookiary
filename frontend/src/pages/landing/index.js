import React from 'react';
import './Landing.css';
import logo from '../../assets/logo.svg';
import { Helmet } from 'react-helmet';

export default function Landing({ history }) {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8"/>
                <title>Welcome to the bookiary!</title>
            </Helmet>
            <div className="landing-container">
                <div className="logo-container"><img src={logo} alt="TheBookiary"/></div>
                <div className="blurb-container">
                    Welcome to The Bookiary, a platform to help you keep track of your reading habits.
                    <p>Log in or register to begin!</p>
                </div>
                <div className="buttons-container">
                    <button className="btn" onClick={() => history.push('/login')}>Log in</button>
                    <button className="btn--outlined" onClick={() => history.push('/register')}>Register</button>
                </div>  
            </div>
        </>
    )
}