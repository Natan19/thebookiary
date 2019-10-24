import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import './Login.css';
import logo from '../../assets/logo.svg';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login({ history }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    async function submitData(Event) {
        Event.preventDefault();
        fetch(process.env.REACT_APP_API_URL+'/api/login', {
            method: "POST",
            headers: {
                email,
                password
            }
        }).then(
            function(response) {
                if (response.status === 400) {
                    toast.error('Wrong email or password!', { autoClose: 2000 });
                    return;
                }
                const token = response.headers.get('x-auth-token');
                localStorage.setItem('x-auth-token', token);
                toast.success('Success! You are now being redirected to the dashboard.', {
                    onClose: () => history.push('/dashboard'),
                    autoClose: 1000
                });
            }
        )
    }
    return (
        <>
            <Helmet>
                <meta charset="utf-8"/>
                <title>The Bookiary - Log in!</title>
            </Helmet>
            <div className="login-container">
                <ToastContainer/>
                <div className="logo-container"><img src={logo} alt="TheBookiary"/></div>
                <div className="fields-container">
                    <h1>Log in:</h1>
                    <form onSubmit={submitData}>
                        <input type="email" placeholder="Email address" onChange={event => setEmail(event.target.value)}/>
                        <input type="password" placeholder="Password" onChange={event => setPassword(event.target.value)}/>
                        <button className="btn" type="submit">Login</button>
                    </form>
                </div>
            </div>
        </>
    )
}