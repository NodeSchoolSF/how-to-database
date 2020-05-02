# How to database

An intro to SQL databases for building web apps.



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

To get a psql shell while `yarn run start` is running:

```
yarn run db:shell
```
