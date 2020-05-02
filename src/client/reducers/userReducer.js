export const userReducer = ( state = {}, action ) => {
    let newState = {...state};

    if(action.type === 'user/SET_FIRST_NAME') {
        newState.firstName = action.payload.firstName;
    }

    if(action.type === 'user/SET_LAST_NAME') {
        newState.lastName = action.payload.lastName;
    }

    return newState;
};
