import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import './Registration.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../../assets/logo.svg';


export default function Registration({ history }) {
    const[ name, setName ] = useState('');
    const[ lastname, setLastname] = useState('');
    const[ email, setEmail ] = useState('');
    const[ password, setPassword ] = useState('');

    function submitData(Event) {
        Event.preventDefault();
        fetch(process.env.REACT_APP_API_URL+'/api/users', {
            method: 'POST',
            headers:{
                name: name+' '+lastname,
                email,
                password
            }
        }).then(
            function(response) {
                if(response.status === 400) {
                    toast.error('Erro ao cadastrar!', { autoClose: 2000 });
                    return;
                }
                const token = response.headers.get('x-auth-token');
                localStorage.setItem('x-auth-token', token);
                toast.success('Registration was successful!', {
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
                <title>The Bookiary - Registration!</title>
            </Helmet>
            <div className="registration-container">
                <ToastContainer/>
                <div className="logo-container"><img src={logo} alt="TheBookiary"/></div>
                <div className="fields-container">
                    <h1>Registrate:</h1>
                    <form onSubmit={submitData}>
                        <input type="text" onChange={(e) => setName(e.target.value)} className="name-input" placeholder="First name"/>
                        <input type="text" onChange={(e) => setLastname(e.target.value)} className="lastname-input" placeholder="Last name"/>
                        <input type="email" onChange={(e) => setEmail(e.target.value)} className="email-input" placeholder="Email address"/>
                        <input type="password" onChange={(e) => setPassword(e.target.value)} className="password-input" placeholder="Create password"/>
                        <button className="btn" type="submit">Registrate</button>
                    </form>
                </div>
            </div>
        </>
    )
}