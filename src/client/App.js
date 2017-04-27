/**
 * Created by jmoor6 on 12/17/16.
 */

import React from 'react';
import {connect} from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends React.Component {

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    {this.props.children}
                </div>
            </MuiThemeProvider>
        );
    }
}

export default connect()(App);