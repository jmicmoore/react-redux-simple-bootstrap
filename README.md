# react-redux-simple-bootstrap
Minimal React bootstrap with Redux and hot loading.
This walkthrough starts completely from scratch and is geared toward beginners.  Each release incrementally builds on the previous.  Each section has resources for further reading/research.
PLEASE NOTE:  There will be all sorts of things you wouldn't do in production code (like hardcoding paths, etc), especially in the early releases of this.

## Scope
This walkthrough does NOT teach you React, Redux or any of the other technologies.  It is simply a bootstrapping walkthrough.  If you want to understand deeper, read the articles in Resources.

## Acknowlegments

* I'm an old dog who is learning new tricks.  I've only been in the web space 2 for years now (been writing Swing apps and servers most of the my life.)
I've only been in the React space for less than a year, and until recently felt like the entire bootstrapping of bundled apps was udder magic.
I started this project to better understand the separate steps involved in bootstrapping a modern bundled app that uses react-redux.
It was built by standing on the shoulders of others.  Ie. by learning from more experienced devs on my team (Dnyanesh Sonavane, Michael Cook, and Roy Higgins) and doing a little research on my own.

## Prerequisites

1. Install NodeJS and NPM

## Assumptions

1. Using Chrome browser

### Resources

* [Install and work thru a few NodeJS Tutorials](https://github.com/workshopper/learnyounode)

## Step 1 - Hello World from the server-side

1. Clone from GIT repo

1. Go into new folder
    * ```cd react-redux-simple-bootstrap```
    
1. Create src and dist folders
    * ```mkdir src```
    * ```mkdir dist```
    
1. Go into src folder

1. Create minimal server file
    * create new file "server.js"
    * Add the following and save:
    * ```console.log("Hello World!");```
    
1. From command line, create package.json
    * ```run npm init```
    
1. Test from command line
    * ```node src/server.js```
    * should see "Hello World!"
    
1. Create a local package script
    * Edit package.json, "scripts" section
    * Add ```"local": "node ./src/server.js"```
    
1. Test new local script from command line
    * ```npm run local```
    * should see "Hello World!" again (with a few other log lines from npm)

### Resources

* [NodeJS - console](https://nodejs.org/api/console.html#console_console)
* [Using package.json with npm](https://docs.npmjs.com/getting-started/using-a-package.json)
* [Package.json interactive guide](http://browsenpm.org/package.json)
* [Running scripts with npm](https://docs.npmjs.com/cli/run-script)
* [Great article on modules](https://medium.freecodecamp.com/javascript-modules-a-beginner-s-guide-783f7d7a5fcc#.81728hzhn)

## Step 2 - Serving a static file with Express

1. From the command line, install Express
    * ```npm install express --save```
    * node_modules folder is created
    * express is added to the "dependencies" section of package.json
    
1. From the src folder, create server and client folders
    * ```mkdir client```
    * ```mkdir server```
    
1. Move the server.js into the server folder

1. Edit the server.js file and replace the Hello World line with the following:
    ```javascript
    var express = require('express');
    var app = express();
    
    app.use(express.static('./src/client'));
    
    app.listen(3000, function () {
        console.log('Server listening on port 3000!')
    });
    ```
1. Goto src/client, create a file called "index.html", and paste the following:
     ```html
     <!DOCTYPE html>
     <html lang="en">
     <head>
         <meta charset="UTF-8">
         <title>Hello World!</title>
     </head>
     <body>
         <h1>Hello World!</h1>
     </body>
     </html>
     ```
     
1. Tell npm that the server.js file moved
    * Edit package.json, "scripts" section
    * Change the local command to:
    
      ```"local": "node ./src/server/server.js"```
1. Test from the command line
    * ```npm run local```
    * Should see "Server listening on port 3000!" on the command line
    
1. Test that server can serve static HTML content
    * Open browser and type "localhost:3000/index.html"
    * You should see "Hello World!" in the browser
    
1. Change the "Hello World!" header in index.html to read "Hello World from Express!" and refresh your browser.
    * Notice that since there is no bundling your changes are seen as soon as you save your file and refresh.

### Resources

* [Express example](http://expressjs.com/en/starter/hello-world.html)
* [Serving static files](http://expressjs.com/en/starter/static-files.html)

## Step 3 - Using Webpack to Create a Modular JavaScript Project

1. From the command line, install Webpack and Webpack CLI and save to Dev dependencies
    * ```npm install webpack --save-dev```
    * ```npm install webpack-cli --save-dev```
    * webpack is added to the "devDependencies" section of package.json
    
1. Create your bundle with Webpack manually
    * In the src/client folder, create a file called index.js and add the following:
    
        ```javascript
        console.log("Hello World from the Client!");
        ```
    * The from the command line, run
    
        ```javascript
        npx webpack src/client/index.js -o dist/bundle.js
        ```
1. Test from the command line
    * ```node dist/bundle.js```
    * You should see "Hello World from the Client!" on the command line.
    
1. Now, we'll add more permanent configuration.  Create the webpack.config.js file in the root folder and add the following:

    ```javascript
     const path = require('path');   
 
     module.exports = {
         entry: './src/client/index.js',
         output: {
             path: path.resolve(__dirname, 'dist'),
             filename: 'bundle.js'
         }
     };
    ```
1. Bundle the project
    * ```npx webpack```
    
1. Test from the command line
    * ```node dist/bundle.js```
    * You should see "Hello World from the Client!" on the command line.
    

### Resources

* [Webpack intro](http://webpack.github.io/docs/usage.html)
* [Great article on bundling](https://medium.freecodecamp.com/javascript-modules-part-2-module-bundling-5020383cf306#.451pdkj1h)

## Step 4 - Adding an EJS Template to Contain the Bundled Project
    
The bundled project is added via \<script\> tag to the template.  The server created in server.js will then use Express to serve the template as a static file to the browser.    

    
1. From the command line, install EJS (you could also use Pug)
    * ```npm install ejs --save```
    
1. Create an EJS template (could also use Pug)
    * In the src/server folder, create a file called index.ejs and add the following:
    
        ```html
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <title>My Bundled Application</title>
        </head>
        <body>
            <div id="content"></div>
            <script type="text/javascript" src="/bundle.js"></script>
        </body>
        </html>
        ```
    * Note the template is already pointing to the bundle.js file
    
1. Tell Express to use EJS as the template engine
    * Add the following code to src/server/server.js:
    
        ```javascript
        app.set('view engine', 'ejs');
        ```
    * By default Express looks for a "views" folder at the project root for where the template files are located.  Since our index.ejs file is not at the default folder location, we need to let Express know that.
    
        ```javascript
        app.set('views', 'src/server');
        ```

1. Tell Express to serve static files out of the dist directory from now on.

    ```javascript
    app.use(express.static('./dist'));
    ```
     
1. Add a route to Express to render the template on any request

    ```javascript
    app.get('*', function(req, res) {
        res.render('index');
    });
    ````

1. Add the following script to your package.json.  This is just for convenience.
    ```"bundle": "webpack",```
    
1. From the command line, create the bundle
    ```npm run bundle```    
    
1. Test from the command line
    * ```npm run local```
    * Should see "Server listening on port 3000!" on the command line
    
1. Test that server can serve the bundled application
    * Open Chrome browser
    * Hit Option+Command+i (on Mac) or F12 (on PC) to open up the developer tools pane
    * Click on the Console tab
    * Now type "localhost:3000/" in the address bar
    * You should see "Hello World!" being logged in the console area
     
1. Right now we have the bundling but NOT hot reloading.  If you made changes to the index.js right now, you would have to rebundle your app again, restart your server and refresh your browser to see the changes.  First we need to add React, then forms, then we'll work on hotloading!
     
### Resources
    
* [Including javascript](http://www.w3schools.com/tags/att_script_src.asp)    
* [More on EJS](http://www.embeddedjs.com/)
* [Using template engines with Express](http://expressjs.com/en/guide/using-template-engines.html)
    
    
## Step 5 - Adding React and Babel Loader for transpiling React, ES6 and JSX syntax to Javascript

1. From the command line, install React and React DOM into your DEV dependencies

    ```
    npm install react react-dom --save-dev
    ```
    
1. Add the following to the index.js file in the src/client

    ```javascript
    import React from 'react';
    import ReactDOM from 'react-dom';
    
    ReactDOM.render(
        <h1>Hello, world!</h1>,
        document.getElementById('content')
    );
    ```
    
1. From the command line, install Babel and the babel-loader

    ```
    npm install babel-loader babel-core --save-dev
    ```
1. Add the babel-loader to your Webpack configuration.
    * Add the following to the webpack.config.js file:
    
        ```javascript
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader'
                }
            ]
        }
        ```
1. Add the React and ES2015 presets for the Babel loader
    * From the command line, install the react preset
    
        ```
        npm install babel-preset-react babel-preset-es2015 --save-dev
        ```
    * Add the options/presets section to the webpack.config.js file:
    
        ```javascript
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'react']
                    }
                }
            ]
        }
        ```
    * The query configuration passes the 2 presets to the Babel loader
    
1. From the command line, create the bundle

    ```npm run bundle```    
    
1. Test from the command line
    * ```npm run local```
    * Should see "Server listening on port 3000!" on the command line
    
1. Test that server can serve the bundled application
    * Open Chrome browser
    * Type "localhost:3000/" in the address bar
    * You should see "Hello, World!" on the page

1. Remove the src/client/index.html file, you are no longer using it.

### Resources
    
* [Installing React](https://facebook.github.io/react/docs/installation.html)  
* [Babel setup](https://babeljs.io/docs/setup/#installation)
* [Configuring Webpack loaders](https://webpack.github.io/docs/using-loaders.html)
* [React preset](http://babeljs.io/docs/plugins/preset-react/#basic-setup-with-the-cli-)
* [ES2015 preset](http://babeljs.io/docs/plugins/preset-es2015/#basic-setup-with-the-cli-)


## Step 6 - Adding and Debugging a React Form

1. Creating your simple root App in React
    * Add a file named App.js to src/client with the following:
    
        ```javascript
        import React from 'react';
        
        class App extends React.Component {
            render(){
                return (
                    <h1>Hello World from App!</h1>
                );
            }
        };
     
        export default App;
        ```
    * Update the index.js file
    
        ```javascript
        // add this line
        import App from './App';
  
        // replace this line
        <h1>Hello, world!</h1>,
        // with this line (don't forget to include the comma!)
        <App />,
        ```
    
1. Test your changes
    * From the command line
    
        ```
        npm run bundle
        npm run local        
        ```    
    * Open Chrome to "localhost:3000/"
        * You should see "Hello, World from App!" on the page

1. Add a simple form to your App (to demonstrate debugging now and to demonstrate that hotloading keeps its state when refreshed!)
    * Update the App.js file and replace the contents with the following:
    
        ```javascript
        import React from 'react';
        
        class App extends React.Component {
            constructor(props) {
                super(props);
                this.state = {
                    firstName: '',
                    lastName: ''
                };
        
                this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
                this.handleLastNameChange = this.handleLastNameChange.bind(this);
            }
        
            handleFirstNameChange(event){
                this.setState({firstName: event.target.value});
            }
        
            handleLastNameChange(event){
                this.setState({lastName: event.target.value});
            }
        
            render(){
                return (
                    <form>
                        <label>
                            First Name:
                            <input type="text" value={this.state.firstName} onChange={this.handleFirstNameChange} />
                        </label>
                        <label>
                            Last Name:
                            <input type="text" value={this.state.lastName} onChange={this.handleLastNameChange} />
                        </label>
                    </form>
                );
            }
        };
        
        export default App;
        ```
1. Test your changes
    * From the command line
    
        ```
        npm run bundle
        npm run local        
        ```    
    * Open Chrome to "localhost:3000/"
        * You should see fields for First Name and Last Name on the page

1. Look at the bundled source code
    * In Chrome browser, hit Option+Command+i (on Mac) or F12 (on PC) to open up the Developer Tools pane
    * Click on the Source tab
    * You should see a tree containing Top > localhost:3000 > bundle.js
    * Click on the bundle.js, look at the code and search for 'handleFirstNameChange' (Command+F or Control+F)
        * This is your class after transpiling and bundling
        
1. Ask Webpack to include source maps
    * Edit webpack.config.js and add the following section:
    
        ```javascript
        devtool: "source-map",
        ```
    * Reload your changes
    
        ```
        npm run bundle
        npm run local        
        ```  
1. Look at the actual source code
    * From Developer Tools, click on the Source tab
    * Now the Top element should have a new child "webpack://"
    * Expand "webpack://", expand the "." folder, expand the "src/client" folder, and click on the App.js file
        * You should see your original App.js class file.  Source maps helps the browser display your original class files

1. Try debugging
    * In the App.js file, click the line number next to the handleFirstNameChange function (should see a blue bookmark)
    * Place your cursor inside the First Name input and type a character
        * Chrome should stop at your breakpoint.  You can hover over the event.target.value to see the character you typed.
        * Click the bookmark to toggle it on/off.  Turn it off for now.
        * Check out resources for more info

### Resources

* [React - Components and Props](https://facebook.github.io/react/docs/components-and-props.html)
* [React - Forms](https://facebook.github.io/react/docs/forms.html)
* [Webpack Devtool](https://webpack.js.org/configuration/devtool/)
* [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/)
* [React Chrome Developer Tools](https://facebook.github.io/react/blog/2014/01/02/react-chrome-developer-tools.html)
 

## Step 7 - Adding Hotloading

WARNING!  This topic gets rather involved and may require alot of coffee and reading if you really want to understand it, but delivers awesome results!

1. Install Webpack Hot Middleware and Webpack Dev Middleware
    * From command line
    
        ```
        npm install webpack-hot-middleware webpack-dev-middleware --save-dev
        ```
    * Edit webpack.config.js file
        * Add the following imports:
        
            ```javascript
            const path = require('path');
            const webpack = require('webpack');
            ```
        * Add the following plugin to the plugins array:
        
            ```javascript
            plugins: [
               new webpack.HotModuleReplacementPlugin(),
            ]
            ```
        * Add 'webpack-hot-middleware/client' into the entry array before index.js.
        
            ```javascript
            entry: [
                'webpack-hot-middleware/client',
                './src/client/index.js'
            ],
            ```
        * webpack-dev-middleware requires output.path to be an absolute path or '/', so we tweak the output section, replace:
        
            ```javascript
            path: './dist',
            ```
        * with
        
            ```javascript
            path: path.resolve(__dirname, 'dist'),
            ```
    * Edit server.js file
        * Add webpack-dev-middleware the usual way, then add webpack-hot-middleware to the Express server
        
            ```javascript
            var webpack = require('webpack');
            var webpackConfig = require('../../webpack.config');
            var compiler = webpack(webpackConfig);
            
            const webpackDevMiddleware = require('webpack-dev-middleware');           
            app.use(webpackDevMiddleware(compiler, {
                noInfo: true,
                publicPath: '/',
                stats: {
                  colors: true
                },
                historyApiFallback: true
            }));
  
            const webpackHotMiddleware = require('webpack-hot-middleware');
            app.use(webpackHotMiddleware(compiler));
            ```
        
1. Install React Hot Loader (NOTE: we don't want the latest release, we want the 3.0 beta 2 version, so we must be explicit!)
    * Add the following to devDependencies section of package.json: 
    
        ```javascript
        "react-hot-loader": "^3.0.0-beta.2",
        ```
    * From the command line
    
        ```
        npm install
        ```
    * Edit webpack.config.js file and add one more entry ('react-hot-loader/patch') as the FIRST item in the entry array
    
        ```javascript
        entry: [
            'react-hot-loader/patch',
            'webpack-hot-middleware/client',
            './src/client/index.js'
        ],
        ```
    * Edit the index.js file
        * Add the import for AppContainer
        
            ```javascript
            import { AppContainer } from 'react-hot-loader';
            ```
        * Replace this
        
            ```javascript
            ReactDOM.render(
                <App/>,
                document.getElementById('content')
            );
            ```
        * With this
        
            ```javascript
            renderWithHotReload(App);
            
            module.hot.accept('./App', () => {
                const NextApp = require('./App').default;
                renderWithHotReload(NextApp);
            });
            
            function renderWithHotReload(Component) {
                ReactDOM.render(
                    <AppContainer>
                        <Component/>
                    </AppContainer>,
                    document.getElementById('content')
                );
            };
            ```
 
1. Test Hotloading on the Browser.
    * Reload your changes
    
        ```
        npm run bundle
        npm run local        
        ```
    * You should see
        * Server listening on port 3000!
        * webpack built [some hex number] in [xxx] ms
    * Open Chrome to "localhost:3000/"
        * You should see fields for First Name and Last Name on the page
    * Type your first and last names into the fields
    * NOW go into App.js and replace the following:
    
        ```javascript
        First Name:
        ```
    * with
    
        ```javascript
        My First Name:
        ```
    * Go back to the brower AND DO NOT REFRESH
        * You should see the first name label change to "My First Name:" (sometimes this can take up to 5 seconds to refresh)
        * However the values of the names are get wiped out!  Turns out the ability to do hotloading while saving the DOM state is rather tricky.  I've read several articles on how to do it, but never really go anything to work.  If you figure it out, please feel free to submit a PR!
    
## Resources Used for Code Snippets / Configuration

* [Webpack Hot Middleware](https://github.com/glenjamin/webpack-hot-middleware) (NOTE: not all plugins from instructions were used)
* [React Hot Boilerplate (most recent commit from 3.0 beta demo)](https://github.com/gaearon/react-hot-boilerplate/tree/9609a8e567b940ff341176638fb1169f70efd461)

## Other Related Resources

* [Hot Reloading in React - Article by Dan Abramov](https://medium.com/@dan_abramov/hot-reloading-in-react-1140438583bf#.di3l5wnr4)
* [Dan Abramov's talk on Hot Reloading with Time Travel](https://www.youtube.com/watch?v=xsSnOQynTHs)
* [React Hot Loader on GitHub](https://github.com/gaearon/react-hot-loader)
* [React Hot Loader v3.0 on GitHub](https://github.com/gaearon/react-hot-loader/tree/d360e3a24914db0c123ca03192bfdade48453751)
* [React Hot Boilerplate on GitHub](https://github.com/gaearon/react-hot-boilerplate)
* [Webpack Hot Module Replacement (HMR)](https://webpack.github.io/docs/hot-module-replacement.html)
* [Webpack Dev Server](https://webpack.github.io/docs/webpack-dev-server.html)
* [Webpack Dev Middleware](https://webpack.github.io/docs/webpack-dev-middleware.html)
    

## Step 8 - Adding React-Redux

If some of the structure we create here feels a bit opinionated, don't worry.  You can structure this however you want.  I'm only doing this to try to make the concepts clearer. 

1. Install Redux, React-Redux, Babel "Stage 0" Preset ("stage-0" gives you spread object syntax and a few other things)
    * From the command line:
    
        ```
        npm install redux react-redux babel-preset-stage-0 --save-dev
        ```

1. Configure Babel to use stage-0 (via Webpack)
    * Edit the webpack.config.js file to add "stage-0" to the options
    
        ```javascript
        options: {
            presets: ['es2015', 'react', 'stage-0']
        }
        ```

1. Create the Redux store
    * Create a new file called store.js under the client folder and add the following code:
    
        ```javascript
        import { createStore } from 'redux';
        const store = createStore();
        export default store;
        ```
1. Connect the Redux store to the app
    * Edit the index.js file:
        * Add the following imports:
        
            ```javascript
            import { Provider } from 'react-redux';
            import store from './store';
            ```
        * Wrap the root component with the Redux store Provider
        
            ```javascript
            <AppContainer>
                <Provider store={store}>
                    <Component/>
                </Provider>
            </AppContainer>,
            ```
1. Create a User Reducer to handle mutable state for the first and last names
    * Create a new folder called "reducers" under client
    * In that new folder, create a new file called userReducer.js and add the following code:
    
        ```javascript
        export const userReducer = ( state = {}, action) => {
            let newState = {...state};
        
            if(action.type === 'user/SET_FIRST_NAME') {
                newState.firstName = action.payload.firstName;
            }
        
            if(action.type === 'user/SET_LAST_NAME') {
                newState.firstName = action.payload.firstName;
            }
        
            return newState;
        };
        ```
    * Edit the store.js file to add the reducer to the Redux store.  The "combineReducers" middleware combines your separate reducers before creating the Redux store.  Replace the previous code with the following:
    
        ```javascript
        import { createStore, combineReducers } from 'redux';
        import { userReducer } from './reducers/userReducer';
        
        const reducers = {
            user: userReducer,
        };
        
        const store = createStore(combineReducers(reducers));
        
        export default store;
        ```
1. Create actions to update the store
    * Create a new folder, called "actions" under client
    * In that new folder, create a new file called userActions.js and add the following code:
    
        ```javascript
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
        ```
        * Make sure the types match those of the userReducer!!!
        
1. Update the React App.js component to read from Redux state instead the component's local state:
    * Delete the constructor() function
    * Add a function called mapStateToProps with the following:
    
        ```javascript
        const mapStateToProps = (state) => {
            // makes redux state available to components via this.props.xxx
            return {
                  firstName: state.user.firstName,
                  lastName: state.user.lastName
            };
        };
        ```
    * Update render() function to use properties supplied by Redux instead of component's state
        * Replace
        
            ```javascript
            this.state.firstName
            this.state.lastName
            ```
        * With
        
            ```javascript
            this.props.firstName
            this.props.lastName
            ```
            
1. Update the React App.js component to store changes into Redux state instead of component's local state:
    * Add the import for user actions
    
        ```javascript
        import * as userActions from './actions/userActions';
        ```
        
    * Add a function called mapDispatchToProps with the following:
    
        ```javascript
        const mapDispatchToProps = () => {
            // makes actions available to components vis this.props.xxx
            return {
                  setFirstName : userActions.setFirstName,
                  setLastName : userActions.setLastName,
            };
        };
        ```
    * Change your handlers to store changes using Redux actions:
    
        ```javascript
        handleFirstNameChange(event){
            this.props.setFirstName(event.target.value);
        }
    
        handleLastNameChange(event){
            this.props.setLastName(event.target.value);
        }
        ```

1. Update the React App.js component to connect with the Redux store.  This allows the component to receive notifications (via mapStateToProps being called) when the Redux state changes.
    * Add the import for the Redux connect function
    
        ```javascript
        import {connect} from 'react-redux';
        ```
    * Connect the App component to the Redux store, replace this:
    
        ```javascript
        export default App;
        ```
    * With this:
    
        ```javascript
        export default connect(mapStateToProps, mapDispatchToProps)(App);
        ```

1. Test in the Browser
    * If your app is still running in the terminal, you should be able to just switch to your browser and confirm that your app still works.
    * However, sometimes if you have to install new libs or if you make major structual changes to you code, you may have to reload your changes
    
        ```
        npm run bundle
        npm run local        
        ```
    * You should see
        * Server listening on port 3000!
        * webpack built [some hex number] in [xxx] ms
    * Open Chrome to "localhost:3000/"
        * You should see the latest fields for First Name and Last Name on the page

## Resources

* [Redux - Usage with React](http://redux.js.org/docs/basics/UsageWithReact.html)
* [Redux - Structuring Reducers](http://redux.js.org/docs/recipes/StructuringReducers.html)
* [Redux on GitHub](https://github.com/reactjs/redux)
* [React Redux on GitHub](https://github.com/reactjs/react-redux)
* [Redux Webpack ES6 Boilerplate on GitHub](https://github.com/nicksp/redux-webpack-es6-boilerplate)
* [Babel Preset Stage 0](https://babeljs.io/docs/plugins/preset-stage-0/)

## Step 9 - Adding React Routing

1. Install React-Router
    * From the command line,
    
       ```
       npm install react-router-dom --save-dev
       ```
1. From the src/client folder, add a new file called "routes.js" and add the following:

    ```javascript
    import React from 'react';
    import {BrowserRouter} from 'react-router-dom'
    import App from './App';
    
    const Routes = () => {
        return (
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        );
    };
    
    export default Routes;
    ```
1. Adapt the rendering code to use React Router as the root component instead of App.  Make the following changes to the index.js file:
    * Replace
    
        ```javascript
        import App from './App';
        ```
    * with
    
        ```javascript
        import Routes from './routes';
        ```
    * Replace
    
        ```javascript
        renderWithHotReload(App);
        
        module.hot.accept('./App', () => {
            const NextApp = require('./App').default;
            renderWithHotReload(NextApp);
        });
        ```
    * with
    
        ```javascript
        renderWithHotReload(Routes);
        
        module.hot.accept('./routes', () => {
            const NextApp = require('./routes').default;
            renderWithHotReload(NextApp);
        });
        ```
1. Test in the Browser
    * If your app is still running in the terminal, you should be able to just switch to your browser and confirm that your app still works.
    * However, sometimes if you have to install new libs or if you make major structual changes to you code, you may have to reload your changes
    
        ```
        npm run bundle
        npm run local        
        ```
    * You should see
        * Server listening on port 3000!
        * webpack built [some hex number] in [xxx] ms
    * Open Chrome to "localhost:3000"
        * You should see the latest fields for First Name and Last Name on the page       
        * To demonstrate the routing, lets refactor the components a bit and add a few more routes.
         
1. Create a User Profile component
    * From the src/client folder, create a folder called "components"
    * Copy the App.js file into the src/client components folder
    * Rename the copy to "userProfile.js"
    * Edit UserProfile.js and rename App to UserProfile (should be 2 places)

1. Create a Home component
    * From src/client/components folder, create a file called "Home.js" and add the following:
    
        ```javascript
        import React from 'react';
        import {connect} from 'react-redux';
        
        class Home extends React.Component {
        
            render() {
                return (
                    <div>
                        Hello! You are home.
                    </div>
                );
            }
        }
        
        export default connect()(Home);
        ```
1. Add the new routes to App component
    * Add Home.js as the root route ("/")
        * Add an import for Home.js
        * Add a new Route for path="/" that points to the Home component
    * Add UserProfile.js as a new route mapped to "/profile"
        * Add an import for UserProfile.js
        * Add a new Route for path="/profile" that points to UserProfile
    * Once this is done, your code for App.js should look like the following:     
        ```javascript
        import React from 'react';
        import {connect} from 'react-redux';
        import {Route, withRouter} from 'react-router-dom'
        import Home from './components/Home';
        import UserProfile from './components/UserProfile';
        
        class App extends React.Component {
            render() {
                return (
                    <div>
                        <Route exact path="/" component={Home}/>
                        <Route path="/profile" component={UserProfile}/>
                    </div>
                );
            }
        }
        
        export default withRouter(connect()(App));
        ```
1. Test in the Browser
    * (We are skipping the bundling and running steps from this point on.)
    * Open Chrome to "localhost:3000"
        * You should see "Hello! You are home.
    * Enter "localhost:3000/profile" in the browser's URL
        * You should see the form for First Name and Last Name

### Resources

* [React-Router docs](https://github.com/ReactTraining/react-router/tree/master/docs)

## Step 10 - Separating Local from Production Code
We are going to separate our "local" code (with features like hot reloading and automatically opening the browser on startup), from our "non-local" code (that doesn't have those bells and whistles but is more optimized for production.)
The naming convention for the environments is honestly a bit confusing.    
* The "development" environment really means local development only.  This excludes non-prod and production environments.
* The "production" environment really means anything non-local. This includes non-prod and production environments.

You can name your environment variables anyway you want, but be aware that some libraries (like Express) are looking for the NODE_ENV variable to be given a "production" value so they can optimize things.

1. Split index.js into local and non-local versions
    * From the src/client folder, copy "index.js" to a new file called "index.local.js"
    * Edit index.js (the non-local version) and remove the hot loading stuff:
        * Remove the import for AppContainer
        * Rename the renderWithHotReload function to renderApp
        * Remove the entire module.hot.accept hook
        * Remove the AppContainer element from the ReactDOM.render method (don't forget to add a comma to the end of the closing Provider element.)
        * After these changes, the code should look like the following:
        
            ```javascript
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
            ```
1. Split webpack.config.js into local and non-local versions
    * From the root folder, copy "webpack.config.js" to a new file called "webpack.local.config.js"
    * Edit the webpack.local.config.js
        * Rename the last file in the "entry" array from:
        
            ```javascript
            './src/client/index.js'
            ```
        * to
        
            ```javascript
            './src/client/index.local.js'
            ```
    * Edit the webpack.config.js (the non-local version) and make the following changes:
        * Remove the import for webpack
        * Remove the 'react-hot-loader/patch' and 'webpack-hot-middleware/client' lines from the "entry" field and change it from an array to a string
        * Remove the "plugins" field
        * After these changes, the code should look like the following:
        
            ```javascript
            const path = require('path');
            
            module.exports = {
                devtool: "source-map",
                entry: './src/client/index.js',
                output: {
                    path: path.resolve(__dirname, 'dist'),
                    filename: 'bundle.js'
                },
                module: {
                    rules: [
                        {
                            test: /\.(js|jsx)$/,
                            exclude: /node_modules/,
                            loader: 'babel-loader',
                            options: {
                                presets: ['es2015', 'react', 'stage-0']
                            }
                        }
                    ]
                }
            };
            ```
1. Configure scripts section of package.json for local and non-local targets
    * Add environment variable to "local" script (remember "development" means local development ONLY).  We are also adding a call to bundle, since we typically want to bundle before we start locally:
    
        ```javascript
        "local": "NODE_ENV=development node ./src/server/server.js",
        ```
    * Add a "server" script (for non-local environments) to run the bundle and start in production mode (remember this means non-local):
    
        ```javascript
        "server": "NODE_ENV=production node ./src/server/server.js",
        ```
    * Add a "start" script - some containers look for this as their default startup script:
    
        ```javascript
        "start": "npm run server",
        ```
    * After these changes, the "script" section should look like the following:
    
        ```javascript
        "scripts": {
            "bundle": "webpack",
            "local": "NODE_ENV=development node ./src/server/server.js",
            "server": "NODE_ENV=production node ./src/server/server.js",
            "start": "npm run server",
            "test": "echo \"Error: no test specified\" && exit 1"
          },
        ```
1. Add logic to server.js to account for the 2 environments.  Specifically we will wrap the hot reloading code in a conditional checking for "development" mode:

    ```javascript
    var express = require('express');
    var app = express();
    
    if(process.env.NODE_ENV !== 'production'){
        console.log('Starting Development Environment...');
        
        var webpack = require('webpack');
        var webpackConfig = require('../../webpack.local.config');
        var compiler = webpack(webpackConfig);
    
        const webpackDevMiddleware = require('webpack-dev-middleware');
        app.use(webpackDevMiddleware(compiler, {
            noInfo: true,
            publicPath: '/',
            stats: {
                colors: true
            },
            historyApiFallback: true
        }));
    
        const webpackHotMiddleware = require('webpack-hot-middleware');
        app.use(webpackHotMiddleware(compiler));
    } else {
        console.log('Starting Production Environment...');
    }
    
    
    app.use(express.static('./dist'));
    
    app.set('view engine', 'ejs');
    app.set('views', 'src/server'); // tell Express our templates are in a different folder than the default
    
    app.get('*', function(req, res) {
        res.render('index');
    });
    
    app.listen(3000, function () {
        console.log('Server listening on port 3000!')
    });
    ```
1. **NOTE:** in the above code that we now have pointed webpack to the local config file.
When run in "development" mode, the bundling is actually kicked off in the code instead of the command line.
This was something I glazed over for a while now.
Ever since we added the hot loading code, we didn't need to explicitly bundle in the command line (ie. npm run bundle) anymore because it was being bundled in the server.js file on startup.
Now that we have this code logically partitioned off as a development-ONLY step, running a bundle through the command line will be needed for "production" startups:

    ```javascript
    // from above code
    var webpackConfig = require('../../webpack.local.config');
    ```
1. BONUS:  Add automatic browser opening to save a step during restarts.  (I know, I should have introduced this sooner.)
    * Install Opener from the command line:
    
        ```javascript
        npm install opener --save-dev
        ```
    * Replace the Express startup callback function:
    
        ```javascript
        app.listen(process.env.PORT || 3000, () => {
            console.log('Server listening on port 3000!');
        });
        ```
    * With this:
    
        ```javascript
        app.listen(process.env.PORT || 3000, () => {
            if(process.env.NODE_ENV === 'development') {
                require('opener')('http://localhost:3000');
            }
        });
        ```
1. Test Local startup
    * From the command line, restart your app
    
        ```javascript
        (type: Cntrl + C)
        npm run local
        ```
        * You should see the app restarting and the browser should automatically open to "localhost:3000"
        * You should see "Hello! You are home."  Now, lets look at the bundled source code
            * In Chrome browser, hit Option+Command+i (on Mac) or F12 (on PC) to open up the Developer Tools pane
            * Click on the Source tab
            * Now drill down from the "Top" element to "webpack://" > "." > "src/client"
                * You should see the index.local.js file in the folder.  Click on it and verify it has the correct contents.
                * This is your confirmation that the client-side is correctly running in development mode. 
        * Now go back to the command line
            * You won't see the same output that you did for bundling step.  That is because the bundling is taking place in the javascript code and not on the command line.
            * However you should see "Starting Development Environment..." being logged from the console.
            * This is your confirmation that the server-side is correctly running in development mode.
1. Test Non-Local startup
    * From the command line, restart your app.
    
        ```javascript
        (type: Cntrl + C)
        npm run bundle
        npm run server
        ```
        * You should see the app rebundling and restarting
        * You will have to manually open the browser and enter "localhost:3000".
        * You should see "Hello! You are home." Now, lets look at the bundled source code
            * In Chrome browser, hit Option+Command+i (on Mac) or F12 (on PC) to open up the Developer Tools pane
            * Click on the Source tab
            * Now drill down from the "Top" element to "webpack://" > "." > "src/client"
                * You should see the index.js file in the folder.  Click on it and verify it has the correct contents.
                * This is your confirmation that the client-side is correctly running in production mode. 
        * Now go back to the command line
            * You should see the bundling output since we are bundling on the command line
            * However you should see "Starting Production Environment..." being logged from the console.
            * This is your confirmation that the server-side is correctly running in production mode.
1. Testing is a bit tricky because there are alot of moving parts.  If you run into any trouble, verify that your code matches the checked-in code for this tag. You can also look for the following:
    * Check that webpack.config.js points to index.js and webpack.local.config.js points to index.local.js
    * Check that server.js is configuring webpack with "webpack.local.config"

1. Once you've confirmed that you have the correct code being built, then you should probably remove the source map generation for your production code
    * Remove the following line in webpack.config.js:
    
        ```javascript
        devtool: "source-map",
        ```

### Resources

* [React App.Set - talks about NODE_ENV](http://expressjs.com/en/api.html#app.set)
* [Opener](https://github.com/domenic/opener)

## Step 11 - Incorporating Material UI
There are many Material Design frameworks to choose from (look at Resources).  Here we add Material UI to the project.

1. From the command line, install Material UI
    * ```npm install material-ui --save```

1. Material UI usees the react-tap-event-plugin to listen for touch / tap / clickevents. This dependency is temporary and will go away once the official React version is released. Until then, be sure to inject this plugin at the start of your app.
    * Install the react-tap-event-plugin (at the time of this writing you should use v.2.0.1 for React ^15.4.0.)
    
        ```npm install react-tap-event-plugin@2.0.1 --save```
        
    * Edit index.js and index.local.js to inject the plugin.

        ```javascript
        import injectTapEventPlugin from 'react-tap-event-plugin';
        
        // Put this in the first line of code after imports
        injectTapEventPlugin();
        ```
1. Beginning with v0.15.0, Material-UI components require a theme to be provided. The quickest way to get up and running is by using the MuiThemeProvider to inject the theme into your application context.
    * Edit App.js and add an import for the MuiThemeProvider:
    
        ```javascript
        import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
        ```
        
    * Wrap the outermost div with the MuiThemeProvider
    
        ```javascript
        class App extends React.Component {
            render() {
                return (
                    <MuiThemeProvider>
                        <div>
                            <Route exact path="/" component={Home}/>
                            <Route path="/profile" component={UserProfile}/>
                        </div>
                    </MuiThemeProvider>
                );
            }
        }
        
        export default withRouter(connect()(App));
        ```
        
1. Replace HTML elements with Material UI components in the UserProfile.js file
    * Edit UserProfile.js and add the following import
    
        ```javascript
        import TextField from 'material-ui/TextField';
        ```
        
    * Replace the render function with the following:
    
        ```javascript
        render(){
            return (
                <div>
                    <TextField id='first-name' hintText="Enter First Name" value={this.props.firstName} onChange={this.handleFirstNameChange}/>
                    <TextField id='last-name' hintText="Enter Last Name" value={this.props.lastName} onChange={this.handleLastNameChange}/>
                </div>
            );
        }
        ```

1. Test in the Browser
    * From a terminal run:  ```npm run local```
    * Chrome will open to "localhost:3000/"
    * Edit the URL to "localhost:3000/profile"
        * You should see the form for First Name and Last Name but with the Material UI's underlined styles and text hints.
        * Try typing into the fields to see the text hints disappear
### Resources

* [Material Design by Google](https://material.io/guidelines/material-design/introduction.html)
* [Best Material Design Frameworks](http://tutorialzine.com/2016/03/the-15-best-material-design-frameworks-and-libraries/)
* [Material UI](http://www.material-ui.com/#/)

## Step 12 - Adding a Base URL
Most apps don't run from "localhost:3000/", they have the app name as the base part of the URL.  We are going to use "/my-cool-app" as the base name.

1. Add a router that is mounted at the application's base URL.  Make the following edits in server.js:
    * Add the following near the imports:
    ```javascript
    const router = express.Router();
    const appBaseUrl =  '/my-cool-app';
    ```

    * Have the new router serve the static content and render the index.js file by replacing the following code:
    ```javascript
    app.use(express.static('./dist'));
    app.get('*', function(req, res) {
        res.render('index');
    });
    ```
    
    * With this code:
    ```javascript
    router.use(express.static('./dist'));
    router.get('*', function(req, res) {
        res.render('index');
    });
    ```
    
    * Add the following code to mount the router at the base URL:
    ```javascript
    app.use(appBaseUrl, router);
    ```
    
1. Add a relative base path to the bundle.js referenced in the index.ejs template file.

    * Edit index.ejs to replace:
    ```javascript
    <script type="text/javascript" src="/bundle.js"></script>
    ```

    * with this:
    ```javascript
    <script type="text/javascript" src="<%=appBaseUrl%>/bundle.js"></script>
    ```
    
    * You will also need to pass the appBaseUrl variable into the template.  To do this, edit server.js again and replace:
    
    ```javascript
    router.use(express.static('./dist'));
    router.get('*', function(req, res) {
        res.render('index');
    });
    ```
    
    * With this:
    ```javascript
    router.use(express.static('./dist'));
    router.get('*', function(req, res) {
        res.render('index', {
            appBaseUrl
        });
    });
    ```

1. Tell Webpack to use our base name as part of the the public URL when referenced in a browser.

    * Edit both webpack.config.js and webpack.local.config.js and add a publicPath with "/my-cool-app" as the value:
    
    ```javascript
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: "/my-cool-app",    // <-- add this!
        filename: 'bundle.js'
    },
    ```

    * Edit server.js to configure the webpackDevMiddleware the same way.  Replace this:
    
    ```javascript
    publicPath: '/',
    ```
    
    * With this:
    
    ```javascript
    publicPath: webpackConfig.output.publicPath,
    ```

1. Tell React Router about the base URL.

    * Edit routes.js and replace this:
    
    ```javascript
    <BrowserRouter>
    ```

    * With this:
    
    ```javascript
    <BrowserRouter basename='/my-cool-app'>
    ```
    
1. Finally, so the app automatically opens correctly in the browser, up the URL for the opener library.
    
    * Edit server.js and replace this:
    ```javascript
    if(process.env.NODE_ENV === 'development') {
        require('opener')('http://localhost:3000');
    }
    ```
    
    * With this:
    ```javascript
    if(process.env.NODE_ENV === 'development') {
        require('opener')('http://localhost:3000' + appBaseUrl);
    }
    ```
1. Trying out a nested route is a good way to make sure that all parts are playing well together.

    * Edit the App.js file and replace this:
    ```javascript
    <Route path="/profile" component={UserProfile}/>
    ```

    * With this:
    ```javascript
    <Route path="/nested/profile" component={UserProfile}/>
    ```

1. Test in the Browser
    * From a terminal run:  ```npm run local```
    * Chrome will open to "localhost:3000/my-cool-app"
    * Edit the URL to "localhost:3000/my-cool-app/nested/profile"
        * You should see the form for First Name and Last Name.  Try changing the text hints again (UserProfile.js) and view the changes in the browser without refreshing to make sure that hotloading is still working.
        * If there are any issues, make sure the bundle.js is loading properly (the index.ejs template should be replaced with a ton of compacted javascript)
    
### Resources

* [RFC-2396](http://www.ietf.org/rfc/rfc2396.txt)
    * See 5. - Relative URI References
    * See C.1.  Normal Examples
* [Express API](http://expressjs.com/en/4x/api.html)
* [Webpack Configuration - publicpath](https://webpack.js.org/configuration/output/#output-publicpath)
* [React Router 4 - basename](https://reacttraining.com/react-router/web/api/BrowserRouter/basename-string)

## Moving Forward
There are other things that need to be done in this project before it is production ready.
These will not be covered here for several reasons.
How some of this stuff is done depends on the environment you will be deploying to.
Also, there are already plenty or resources that cover these topics.
* Replace hard-coded strings with environment variables.
* Standardized error handling
* Incorporating styles (like Bootstrap or Material UI)
* Unit Testing with Jest
* Docker Containers
* Etc...

**Troubleshooting**

1. If you are using a non-standard SSH key (ie. something other than id_rsa) and are having trouble with pushing from IDEA, make sure IntelliJ is using the Native SSH agent.
    * ```Preferences > Version Control > Git > SSH Executable:  Native```
