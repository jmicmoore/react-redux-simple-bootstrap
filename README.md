# react-redux-simple-bootstrap
Minimal React bootstrap with Redux and hot loading.
This walkthrough starts completely from scratch and is geared toward beginners.  Each release incrementally builds on the previous.  Each section has resources for further reading/research.
PLEASE NOTE:  There will be all sorts of things you wouldn't do in production code (like hardcoding paths, etc), especially in the early releases of this.

## Scope
This walkthrough does NOT teach you React, Redux or any of the other technologies.  It is simply a bootstrapping walkthrough.  If you want to understand deeper, read the articles in Resources.

## Acknowlegments

I'm an old dog who is learning new tricks.  I've only been in the web space 2 for years now (been writing Swing apps and servers most of the my life.)
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


**Troubleshooting**

1. If you are using a non-standard SSH key (ie. something other than id_rsa) and are having trouble with pushing from IDEA, make sure IntelliJ is using the Native SSH agent.
    * ```Preferences > Version Control > Git > SSH Executable:  Native```
