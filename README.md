# API Docs

Simple API for Todo lists with basic auth

## Requirements

- NodeJs (version >= 16)
- Docker (only if you want to run DB in docker)

## Run

### 1. Install dependencies

`$ yarn` or `$ npm i`

### 2. Create .env

1. Create `.env` file

2. Copy variables from `.env.example`

3. Fill variables

### 3. Create database

1. `$ docker-compose up -d` starts database in docker _(skip if you are not using docker)_

2. `$ yarn migrate dev` or `$ npx migrate dev` creates tables

3. `$ yarn prisma generate` or `$ npx prisma generate` generates prisma-client

### 4. Start API

a) Dev mode: `$ yarn start:dev` or `$ npm run start:dev`

b) Prod mode

1. `$ yarn build` or `$ npm run build` builds app
2. `$ yarn start:prod` or `$ npm run start:prod` starts api
