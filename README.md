# react-redux-simple-bootstrap
Minimal React bootstrap with Redux and hot loading.
This walkthrough is geared toward beginners.

Follow tags to create from scratch.

## Prerequisites

1. Install NodeJS and NPM

## Assumptions

1. Using Chrome browser

### Resources

* [Install and work thru a few NodeJS Tutorials](https://github.com/workshopper/learnyounode)

## Hello World from the server-side (tag v1.0.1)

1. Clone from GIT repo

1. Go into new folder
    * ```cd react-redux-simple-bootstrap```
    
1. Create src and bin folders
    * ```mkdir src```
    * ```mkdir bin```
    
1. Go into src folder

1. Create minimal server file
    * create new file "server.js"
    * Add the following:  "console.log("Hello World!");" and save
    
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

## Serving a static file with Express (tag v1.0.2)

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
    * Change the local command to ```"local": "node ./src/server/server.js"```

1. Test from the command line
    * ```npm run local```
    * Should see "Server listening on port 3000!" on the command line
    
1. Test that server can serve static HTML content
    * Open browser and type "localhost:3000/index.html"
    * You should see "Hello World!" in the browser
    
1. Change the "Hello World!" header in index.html to read "Hello World from Express!" and refresh your browser.
    * Notice that the header didn't change.
    * From command line, restart the server
        * type Control + C to kill it
        * ```npm run local```
        * Now refresh the header again, and you'll see the new message.
        
1. Right now there is no bundling or hot reloading, so all changes require a restart of the server.  We'll work on that next.

### Resources

* [Express example](http://expressjs.com/en/starter/hello-world.html)
* [Serving static files](http://expressjs.com/en/starter/static-files.html)

## Using Webpack to Create a Modular JavaScript Project (tag v1.0.3)

1. From the command line, install Webpack and save to Dev dependencies
    * ```npm install webpack --save-dev```
    * webpack is added to the "devDependencies" section of package.json
    
1. Create your bundle with Webpack manually
    * In the src/client folder, create a file called index.js and add the following:
        ```javascript
           console.log("Hello World from the Client!");
        ```
    * The from the command line, run
        ```webpack ./src/client/index.js ./bin/bundle.js```
    
1. Test from the command line
    * ```node bin/bundle.js```
    * You should see "Hello World from the Client!" on the command line.
    
1. Now, we'll add more permanent configuration.  Create the webpack.config.js file in the root folder and add the following:

    ```javascript
     module.exports = {
         entry: './src/client/index.js',
         output: {
             path: './bin',
             filename: 'bundle.js'
         }
     };
    ```
1. Bundle the project
    * ```webpack```
    
1. Test from the command line
    * ```node bin/bundle.js```
    * You should see "Hello World from the Client!" on the command line.
    

### Resources

* [Webpack intro](http://webpack.github.io/docs/usage.html)
* [Great article on bundling](https://medium.freecodecamp.com/javascript-modules-part-2-module-bundling-5020383cf306#.451pdkj1h)

## Adding an EJS Template to Contain the Bundled Project (tag v1.0.4)
    
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
    * Add the following code to src/server/server.js
        ```javascript
        app.set('view engine', 'ejs');
        ```
    * By default Express looks for a "views" folder at the project root for where the template files are located.  Since our index.ejs file is not at the default folder location, we need to let Express know that.
        ```javascript
        app.set('views', 'src/server');
        ```

1. Tell Express to serve static files out of the bin directory from now on.
    ```javascript
    app.use(express.static('./bin'));
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
    
    
## Adding React and Babel Loader for transpiling React, ES6 and JSX syntax to Javascript (tag v1.0.5)

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
            loaders: [
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
    * Add the query/presets section to the webpack.config.js file:
        ```javascript
        module: {
            loaders: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    query: {
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


## Adding and Debugging a React Form (tag v1.0.6)

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
        * Check out resources for more info

### Resources

[React - Components and Props](https://facebook.github.io/react/docs/components-and-props.html)
[React - Forms](https://facebook.github.io/react/docs/forms.html)
[Webpack Devtool](https://webpack.js.org/configuration/devtool/)
[Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/)
[React Chrome Developer Tools](https://facebook.github.io/react/blog/2014/01/02/react-chrome-developer-tools.html)
 
## Add a Jenkins deploy to AWS    
    
**Troubleshooting**

1. If you are using a non-standard SSH key (ie. something other than id_rsa) and are having trouble with pushing from IDEA, make sure IntelliJ is using the Native SSH agent.
    * ```Preferences > Version Control > Git > SSH Executable:  Native```
