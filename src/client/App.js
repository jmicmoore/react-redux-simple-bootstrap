import { hot } from 'react-hot-loader/root';
import React from 'react';
import store from "./store"
import Routes from "./routes"
import {Provider} from "react-redux"

const App = () => {
    return (
        <Provider store={store}>
            <Routes />
        </Provider>
    );
};

export default hot(App);
