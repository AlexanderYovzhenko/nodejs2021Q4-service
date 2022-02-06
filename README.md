<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>

## Description

RS School REST service(NestJs)

<p>
  <h2 align="center">Documentation for endpoints</h2>
  <h3>Doc <a href="http://localhost:4000/doc" target="blank">localhost:4000/doc</a> - detailed documentation</h3>
  <h3>Home <a href="http://localhost:4000/" target="blank">localhost:4000</a> - home page, check if the server is running</h3>

  <ul>
    <li><h3><u>localhost:4000/login</u> - authorization</h3> 
      <ul>
        <li><font color="4040ff">POST</font> <u>login</u> - get token</li> 
      </ul>
    </li>
    <li><h3><u>localhost:4000/users</u> - requires authorization(header: authorization Bearer token)</h3> 
      <ul>
        <li><font color="4040ff">POST</font> <u>users</u> - add user</li> 
        <li><font color="green">GET</font> <u>users</u> - get all users</li>
        <li><font color="green">GET</font> <u>users/:id</u> - get user by id</li>
        <li><font color="yellow">PUT</font> <u>users/:id</u> - update user by id</li>
        <li><font color="red">DELETE</font> <u>users/:id</u> - delete user by id</li>
      </ul>
    </li>
    <li><h3><u>localhost:4000/boards</u> - requires authorization(header: authorization Bearer token)</h3> 
      <ul>
        <li><font color="4040ff">POST</font> <u>boards</u> - add board</li> 
        <li><font color="green">GET</font> <u>boards</u> - get all boards</li>
        <li><font color="green">GET</font> <u>boards/:id</u> - get board by id</li>
        <li><font color="yellow">PUT</font> <u>boards/:id</u> - update board by id</li>
        <li><font color="red">DELETE</font> <u>boards/:id</u> - delete board by id</li>
      </ul>
    </li>
    <li><h3><u>localhost:4000/boards/:boardId/tasks</u> - requires authorization(header: authorization Bearer token)</h3> 
      <ul>
        <li><font color="4040ff">POST</font> <u>tasks</u> - add task</li> 
        <li><font color="green">GET</font> <u>tasks</u> - get all tasks</li>
        <li><font color="green">GET</font> <u>tasks/:id</u> - get task by id</li>
        <li><font color="yellow">PUT</font> <u>tasks/:id</u> - update task by id</li>
        <li><font color="red">DELETE</font> <u>tasks/:id</u> - delete task by id</li>
      </ul>
    </li>
    <!-- <li><h3><u>localhost:4000/boards/:boardId/columns</u> - requires authorization(header: authorization Bearer token)</h3> 
      <ul>
        <li><font color="4040ff">POST</font> <u>columns</u> - add column</li> 
        <li><font color="green">GET</font> <u>columns</u> - get all columns</li>
        <li><font color="green">GET</font> <u>columns/:id</u> - get column by id</li>
        <li><font color="yellow">PUT</font> <u>columns/:id</u> - update column by id</li>
        <li><font color="red">DELETE</font> <u>columns/:id</u> - delete column by id</li>
      </ul>
    </li> -->
    <li><h3><u>localhost:4000/file</u></h3> 
      <ul>
        <li><font color="4040ff">POST</font> <u>file</u> - add file(requires authorization(header: authorization Bearer token))</li> 
        <li><font color="green">GET</font> <u>file/:fileName</u> - get file by name</li>
      </ul>
    </li>
</ul>
</p>


## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```bash
git clone https://github.com/GoldenManBel/nodejs2021Q4-service.git
```

## Switch branch

```bash
git checkout nestJS
```

## Installing NPM modules

```bash
npm install
```

## Running application in docker

```bash
docker compose up --build
```

```bash
# e2e tests
npm run test:auth

```
or

```bash
docker exec -i -t app sh
```
```bash
# e2e tests
npm run test:auth
```

## Running application local and bd in docker

```bash
docker build -t postgres database. 
```
```bash
docker run -dp 5432:5432 --rm -e POSTGRES_HOST_AUTH_METHOD=trust postgres
```
```bash
# watch mode
npm run start:dev 
```
```bash
# e2e tests
npm run test:auth
```

## Auto-fix and format

```bash
npm run lint
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging

<p align="center">
  <h2 align="center">Performance tests</h2>
</p>

### There are also files in the artillery folder with additional information

## Express 
  ![express report test](https://github.com/GoldenManBel/nodejs2021Q4-service/blob/nestJS/artillery/express.jpg?raw=true)

## Fastify 
  ![fastify report test](https://github.com/GoldenManBel/nodejs2021Q4-service/blob/nestJS/artillery/fastify.jpg?raw=true)
