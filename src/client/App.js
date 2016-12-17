/**
 * Created by jmoor6 on 12/17/16.
 */

import React from 'react';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: ''
        };

        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
    }

    handleFirstNameChange(event){
        this.setState({firstName: event.target.value});
    }

    handleLastNameChange(event){
        this.setState({lastName: event.target.value});
    }

    render(){
        return (
            <form>
                <label>
                    First Name:
                    <input type="text" value={this.state.firstName} onChange={this.handleFirstNameChange} />
                </label>
                <label>
                    Last Name:
                    <input type="text" value={this.state.lastName} onChange={this.handleLastNameChange} />
                </label>
            </form>
        );
    }
};

export default App;