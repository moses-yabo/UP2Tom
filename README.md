# Getting to the server [Backend] and Running The Server

This Server is Built [exress js](https://github.com/expressjs).

## Available Scripts

In the project root directory, you can run:
### `cd server`
Run Nodemon:
### `npm run server:start`

Runs the server in the development mode.\
Open [http://localhost:5000](http://localhost:5000) to view it in your browser.

The server is running on the background using [Nodemon]..



### Open a new Terminal Tab & Navigate client
Open new Terminal do not cancel the server leave it running and add a new Terminal 
 ## Available Scripts

CD from the root directory
### `cd client`  

Run the Web App
 ### ` npm run start`  

Launches the client  in the Browser watch mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


****** TECHNOLOGY USED *****

## Server And Databases
Express.js: a web framework for Node.js that provides tools for handling routing, middleware, and other common tasks. We chose Express.js because it's widely used and has a large ecosystem of plugins and middleware.

TypeScript: a superset of JavaScript that adds optional static typing and other features to the language. We chose TypeScript because it can help catch type-related errors before they cause problems at runtime and can make code easier to understand and maintain.

MongoDB: a NoSQL database that stores data in JSON-like documents. We chose MongoDB because it's flexible and scalable, which makes it a good fit for web applications. We use the Mongoose package to interact with MongoDB in Node.js.

Atlas: a cloud-based database service offered by MongoDB that makes it easy to create, manage, and scale MongoDB databases. We use the free tier of Atlas, which is hosted on Amazon Web Services (AWS), to host our database.

We also use a number of other packages and tools to help with development, testing, and deployment. For more information, see the package.json file in the root directory of the project.


## Web App / Client

The client of this web app is built using React, a JavaScript library for building user interfaces. React provides a set of tools for building reusable components, managing state, and handling events, which makes it easier and faster to build a user interface that's responsive and interactive.

The visual style of the client is defined using CSS. CSS is a language used to describe the visual style of a web page, including colors, fonts, layout, and other visual properties. We use CSS to make the client look professional and consistent.

React components can be styled using CSS by defining a className attribute in the component's JSX code. This className attribute maps to the class attribute in HTML, and allows us to apply CSS styles to the component.

