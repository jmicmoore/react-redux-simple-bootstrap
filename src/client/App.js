/**
 * Created by jmoor6 on 12/17/16.
 */

import React from 'react';
import {connect} from 'react-redux';
import {Route, withRouter} from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Home from './components/Home';
import UserProfile from './components/UserProfile';

class App extends React.Component {
    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <Route exact path="/" component={Home}/>
                    <Route path="/profile" component={UserProfile}/>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default withRouter(connect()(App));