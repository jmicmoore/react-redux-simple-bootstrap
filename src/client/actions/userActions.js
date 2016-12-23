/**
 * Created by jmoor6 on 12/18/16.
 */
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