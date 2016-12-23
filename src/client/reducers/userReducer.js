/**
 * Created by jmoor6 on 12/17/16.
 */

const initialState = {
    firstName: 'Unknown',
    lastName: ''
};

// TODO: Why does using initialState here cause a React Warning?
export const userReducer = ( state = {}, action) => {
    let newState = {...state};

    if(action.type === 'user/SET_FIRST_NAME') {
        newState.firstName = action.payload.firstName;
    }

    if(action.type === 'user/SET_LAST_NAME') {
        newState.lastName = action.payload.lastName;
    }

    return newState;
};