/**
 * Created by jmoor6 on 12/17/16.
 */

import React from 'react';
import {connect} from 'react-redux';

class App extends React.Component {

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

export default connect()(App);