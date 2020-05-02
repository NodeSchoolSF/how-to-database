# How to database

An intro to SQL databases for building web apps.

**The workshop notes are in [workshop/README.md](./workshop/README.md).**


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

## The code

```
router.js         - Where API endpoints are defined. Most of the interesting logic is here.
app.js            - Standard Express app setup
db/knexfile.js    - Knex database configuration
db/migrations/    - Folder containing database migrations (e.g. CREATE TABLE statements)
db/seeds/         - Folder containing seed data
```
