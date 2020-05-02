import React from 'react';
import {connect} from 'react-redux';
import TextField from '@material-ui/core/TextField'
import { setFirstName, setLastName } from '../actions/userActions';

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
                <TextField id='first-name' label='Enter First Name' variant='outlined' value={this.props.firstName} onChange={this.handleFirstNameChange}/>
                <TextField id='last-name' label='Enter Last Name' variant='outlined' value={this.props.lastName} onChange={this.handleLastNameChange}/>
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

const mapDispatchToProps = {
    setFirstName,
    setLastName
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
