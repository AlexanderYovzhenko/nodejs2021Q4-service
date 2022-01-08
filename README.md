# RS School REST service(docker-basics)

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/GoldenManBel/nodejs2021Q4-service.git
```

## Switch branch

```
git checkout logging-errorHandling
```

## Installing NPM modules

```
npm install
```

## Running application in docker

```
docker-compose up --build
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Description
To check the logging level in the .env file there is a LEVEL_LOG variable with a value from 0 to 4, where 0(errors) is the highest priority and 4(all logs) is the least.  
To check for uncaughtException and unhandledRejection events, insert into file app.ts: throw Error ('Oops!') and Promise.reject (Error ('Oops!')) after initializing Fastify and calling errorsHandler().  

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm test
```

To run only one of all test suites (users, boards or tasks)

```
npm test <suite name>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization (users, boards or tasks)

```
npm run test:auth <suite name>
```

## Development

If you're using VSCode, you can get a better developer experience from integration with [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions.

### Auto-fix and format

```
npm run lint
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
