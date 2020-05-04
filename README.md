# micro-frontends-divers
This is a demo to load vanilla HTML, React, Vue, Angular and Svelte frameworks/libraries in 1 single page (using Podium).

## How to start  
This application combines popular front-end libraries and frameworks in 1 page.  

You can start the application by cloning the repository and run following commands:  
npm run installAll  
npm run startAll  

(You will need NPM, Yarn, vue-cli (vue-cli-service), angular-cli (ng) to run this demo.)
After everything is installed and fired up, start your favourite browser and go to http://localhost:7000 

The command above will only work on Mac/Linux, so on Windows you'll have to go in each folder and start the process manually using the command: npm run podiumstart  

## Server side micro front-ends  
This demo using Podium to handle the server side composition of the frameworks.  
More info at https://podium-lib.io/  

## How does this demo work
Each framework or library has a podium.js file in its root folder.  
This is the podium configuration to start the podlets.  

You can use that file as a base for other podlets (of the same library or framework).  

When you run "npm run startAll", each library/framework is build and the podlet is started.  
At the end of the command, the base application is started.  
