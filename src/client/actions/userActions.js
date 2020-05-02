import store from '../store';

export const setFirstName = (firstName) => {
    store.dispatch({
        type: 'user/SET_FIRST_NAME',
        payload: firstName
    });
};

export const setLastName = (lastName) => {
    store.dispatch({
        type: 'user/SET_LAST_NAME',
        payload: lastName
    });
};
