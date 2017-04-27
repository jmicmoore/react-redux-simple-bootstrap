/**
 * Created by jmoor6 on 12/17/16.
 */

import React from 'react';
import {connect} from 'react-redux';
import TextField from 'material-ui/TextField';
import * as userActions from '../actions/userActions';

class UserProfile extends React.Component {
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
            <div>
                <TextField id='first-name' hintText="Enter First Name" value={this.props.firstName} onChange={this.handleFirstNameChange}/>
                <TextField id='last-name' hintText="Enter Last Name" value={this.props.lastName} onChange={this.handleLastNameChange}/>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);