const express = require("express");
const app = express();
const { getTopics } = require("../controllers/topics.controllers");
const { getEndPoints } = require("../controllers/endpoint.controllers");
const {getArticles} = require('../controllers/articles.controllers')
const {customErrorHandler} = require('../controllers/errors.controllers')


app.get("/api/topics", getTopics);

app.get("/api", getEndPoints);

app.get("/api/articles/:article_id", getArticles);

app.use(customErrorHandler)

app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).send({msg: 'Bad Request'})
})

module.exports = app;
