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


**Troubleshooting**

1. If you are using a non-standard SSH key (ie. something other than id_rsa) and are having trouble with pushing from IDEA, make sure IntelliJ is using the Native SSH agent.
    * ```Preferences > Version Control > Git > SSH Executable:  Native```
