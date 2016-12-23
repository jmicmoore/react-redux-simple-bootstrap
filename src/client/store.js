/**
 * Created by jmoor6 on 12/17/16.
 */
import { createStore, combineReducers } from 'redux';
import { userReducer } from './reducers/userReducer';

const reducers = {
    user: userReducer,
};

const store = createStore(combineReducers(reducers));

export default store;