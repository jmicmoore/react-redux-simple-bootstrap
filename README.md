# react-redux-simple-bootstrap
Minimal React bootstrap with Redux and hot loading

Follow tags to create from scratch

**Prerequisites**

1. Install NodeJS and NPM

**Tag "v1.0.1" - Hello World from the server-side**

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


**Tag "v1.0.2" - Serving a static file with Express**

1. From the command line, add Express
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
        
1. Right now there is no bundling or hot reloading, so all changes require a restart of the server.  We'll fix that next.


    
**Troubleshooting**

1. If you are using a non-standard SSH key (ie. something other than id_rsa) and are having trouble with pushing from IDEA, make sure IntelliJ is using the Native SSH agent.
    * ```Preferences > Version Control > Git > SSH Executable:  Native```
