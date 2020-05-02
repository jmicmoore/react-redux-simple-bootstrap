import React from 'react';
import { Router } from '@reach/router'
import UserProfile from './components/UserProfile'
import Home from './components/Home'

const Routes = () => {
    return (
        <Router basepath='/my-cool-app'>
            <UserProfile path='/nested/profile' />
            <Home path='/' />
        </Router>
    );
};

export default Routes;
