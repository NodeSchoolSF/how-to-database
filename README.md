# How to database

An intro to SQL databases for building web apps.

**Start by following the workshop notes in [workshop/README.md](./workshop/README.md).** It'll guide you through relational database concepts (creating tables, inserting data, querying, one-to-many and many-to-many relationships, JOINs) and then explain how to integrate a SQL database into your Node app (migrations, query builders, and API routes).

## The Node app

This repo also contains a Node/Express app with PostgreSQL set up. Here's what the files do:

```
router.js         - Where API endpoints are defined. Most of the interesting logic is here.
app.js            - Standard Express app setup
package.json      - Contains scripts to build/run app and manage DB migrations
db/knexfile.js    - Knex database configuration
db/migrations/    - Folder containing database migrations (e.g. CREATE TABLE statements)
db/seeds/         - Folder containing seed data
```

## Setup

Install docker: https://www.docker.com/products/docker-desktop

```
yarn install
yarn run build
```

Start the docker app in a terminal window. This will run the Postgres database and the Node app at localhost:3001.

```
yarn start
```

In a separate terminal window, set up the database:

```
yarn run db:setup
```

## Database

To get a psql shell, first make sure `yarn start` is running in a separate terminal. Then:

```
yarn run db:shell
```

To generate a new migration with Knex, run:

```
yarn run db:migrate:make YOUR_MIGRATION_NAME
```

To execute your migrations, first make sure `yarn start` is running in a separate terminal. Then:

```
yarn run db:migrate
```
