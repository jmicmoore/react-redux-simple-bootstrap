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

1. Create server and client folders
    * ```mkdir client```
    * ```mkdir server```

**Troubleshooting**

1. If having trouble with pushing from IDEA, make sure you are using the Native SSH agent.
    * ```Preferences > Version Control > Git > SSH Executable:  Native```
