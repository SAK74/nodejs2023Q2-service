# Home Library Service

## Description

- ### Create a _REST_ Home Library Service with NestJS.
- ### Create database in Postgresql with ORM Prisma acces.
- ### Dockerization DB and app.

<br/>

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker Engene (**Docker Desctop** recommended!)](https://docs.docker.com/engine/install/)

## Downloading

```
git clone https://github.com/SAK74/nodejs2023Q2-service.git
```

## Installing NPM modules (_is required to testing use only_)

```
npm install
```

## Prepare

- create `.env` file in root directory with specifuing PORT (_you can use `.env.example` as example_)
- add neccessary variables to `.env` (like as `.env.example`)
- :exclamation: run **`Docker Desctop`**

## Running application in Docker container

In **current dirrectory** run

```
docker compose up
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/docs/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```
