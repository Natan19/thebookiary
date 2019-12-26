import React from 'react';
import logo from '../../assets/dashboard-logo.svg';
import { useHistory } from 'react-router-dom';
 
export default function Header(props) {
    let history = useHistory();
    return (
        <>
            <div className="header">
                <div className="header-content-container">
                    <img src={logo} alt="dashboard-logo" onClick={() => history.push('/')}/>
                    <div className="searchbar-container">
                        {props.children}
                    </div>
                    <div className="userinfo-container">
                    </div>
                </div>
            </div>
        </>
    )
}