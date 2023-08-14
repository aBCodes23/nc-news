# Northcoders News API

An .env file must be created for both the test and development databases.

To ensure the right database is being accessed, declare an environment variable as below:

const ENV = process.env.NODE_ENV || "[non-test databse]";

Use dotenv to load the right database name (PGDATABASE) into the process.env object as below:

require("dotenv").config({ path: `${__dirname}/../.env.${ENV}` })
