/**
 * Created by jmoor6 on 12/13/16.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import { Provider } from 'react-redux';
import store from './store';

renderApp(Routes);

function renderApp(Component) {
    ReactDOM.render(
        <Provider store={store}>
            <Component/>
        </Provider>,
        document.getElementById('content')
    );
};


console.log("Hello World from the Client!");