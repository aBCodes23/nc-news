const express = require("express");
const app = express();
const { getTopics } = require("../controllers/topics.controllers");
const { getEndPoints } = require("../controllers/endpoint.controllers");
const {
  getArticle,
  getArticles,
} = require("../controllers/articles.controllers");
const { customErrorHandler } = require("../controllers/errors.controllers");
const { getArticleComments } = require("../controllers/comments.controllers");

app.get("/api/topics", getTopics);

app.get("/api", getEndPoints);

app.get("/api/articles/:article_id", getArticle);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id/comments", getArticleComments);

app.use(customErrorHandler);

app.use((err, req, res, next) => {
  console.log(err, "err in 500");
  res.status(500).send({ msg: "Bad Request" });
});

module.exports = app;
