/**
 * Created by jmoor6 on 12/17/16.
 */

export const userReducer = ( state = {}, action) => {
    let newState = {...state};

    if(action.type === 'user/SET_FIRST_NAME') {
        newState.firstName = action.payload;
    }

    if(action.type === 'user/SET_LAST_NAME') {
        newState.lastName = action.payload;
    }

    return newState;
};