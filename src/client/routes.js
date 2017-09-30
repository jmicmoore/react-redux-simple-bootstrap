import React from 'react';
import {BrowserRouter} from 'react-router-dom'
import App from './App';

const Routes = () => {
    return (
        <BrowserRouter basename='/my-cool-app'>
            <App/>
        </BrowserRouter>
    );
};

export default Routes;