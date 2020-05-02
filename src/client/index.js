import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes'
import { Provider } from 'react-redux';
import store from './store';


const renderApp = Component => {
    ReactDOM.render(
        <Provider store={store}>
            <Component />
        </Provider>,
        document.getElementById('content')
    );
}

renderApp(Routes);

console.log("Hello World from the Client!");
