import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';

import { AppContainer } from 'react-hot-loader';
import Routes from './routes'

const renderWithHotReload = Component => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <Component />
            </Provider>
        </AppContainer>,
        document.getElementById('content')
    );
}

renderWithHotReload(Routes);

if (module.hot) {
    module.hot.accept('./routes.js', () => { renderWithHotReload(Routes); })
}

console.log("Hello World from the Client!")
