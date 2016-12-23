/**
 * Created by jmoor6 on 12/17/16.
 */

import React from 'react';
import {connect} from 'react-redux';
import * as userActions from './actions/userActions';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
    }

    handleFirstNameChange(event){
        this.props.setFirstName(event.target.value);
    }

    handleLastNameChange(event){
        this.props.setLastName(event.target.value);
    }

    render(){
        return (
            <form>
                <label>
                    First NameXXX:
                    <input type="text" value={this.props.firstName} onChange={this.handleFirstNameChange} />
                </label>
                <label>
                    Last Name:
                    <input type="text" value={this.props.lastName} onChange={this.handleLastNameChange} />
                </label>
            </form>
        );
    }
};

const mapStateToProps = (state) => {
    // makes redux state available to components via this.props.xxx
    return {
        firstName: state.user.firstName,
        lastName: state.user.lastName
    };
};

const mapDispatchToProps = () => {
    // makes actions available to components vis this.props.xxx
    return {
        setFirstName : userActions.setFirstName,
        setLastName : userActions.setLastName,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);