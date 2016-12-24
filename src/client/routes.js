/**
 * Created by jmoor6 on 12/23/16.
 */

import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './App';
import Home from './components/Home';
import UserProfile from './components/UserProfile';

const Routes = () => {
    return (
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Home}/>
                <Route path="profile" component={UserProfile}/>
            </Route>
        </Router>
    );
};

export default Routes;