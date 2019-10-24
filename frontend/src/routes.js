import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import landing from './pages/landing/index';
import registration from './pages/registration/index';
import login from './pages/login/index';
import dashboard from './pages/dashboard/index';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={landing}/>
                <Route path="/register" exact component={registration}/>
                <Route path="/login" exact component={login}/>
                <Route path="/dashboard" exact component={dashboard}/>
            </Switch>
        </BrowserRouter>
    )
}