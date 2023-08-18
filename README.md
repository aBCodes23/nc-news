# Northcoders News API

## Project Summary

This project builds an API for the purpose of accessing application data programmatically. The intention here is to mimic the building of the real world backend service for a news website, which then provides this information to the front end architecture.

The hosted version is available on: https://abcodesnorthcodersncnewsapp.onrender.com/.

## Database Set Up



## Set Up

### 1

Begin by creating a clone of the git:

```git clone https://github.com/aBCodes23/nc-news ```

### 2

Install the required dependencies:

```npm i```

### 3

Both testing and development databases use PSQL, and uses node-postgres to interact. A separate .env file must be created for each:

Create a file called 'env.database' and add the line:

```PGDATABASE = nc_news```

Create a file called 'env.test' and add the line:

```PGDATABASE = nc_new_test```

### 4

Run the seed database script:

```npm setup-dbs```
### 5

Jest tests are available in app.test.js:

```npm run test app.test.js```

## Requirements
The minimum version of Node.js required is 6.9.0.
The minimum version of Postgres required is 8.0.