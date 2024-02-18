# API Docs

Simple API for Todo lists with basic auth

## Requirements

- NodeJs (version >= 16)
- Docker (only if you want to run DB in docker)

## Run

### 1. Install dependencies

- `$ yarn` or `$ npm i`

### 2. Create .env

- Create `.env` file
- Copy variables from `.env.example`
- Fill variables

### 3. Create database

- Start database `$ docker-compose up -d`
- Create tables `$ yarn migrate dev` or `$ npx migrate dev`
- Generate prisma-client `$ yarn prisma generate` or `$ npx prisma generate`

### 4. Start API
