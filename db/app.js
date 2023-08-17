const express = require("express");
const app = express();
const { getTopics } = require("../controllers/topics.controllers");
const { getEndPoints } = require("../controllers/endpoint.controllers");
const {
  getArticle,
  getArticles,
  patchArticle
} = require("../controllers/articles.controllers");
const { getArticleComments, postComment } = require("../controllers/comments.controllers");
const { customErrorHandler } = require("../controllers/errors.controllers");

app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api", getEndPoints);

app.get("/api/articles/:article_id", getArticle);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id/comments", getArticleComments);

app.post('/api/articles/:article_id/comments', postComment)

app.patch('/api/articles/:article_id', patchArticle)

app.use(customErrorHandler);

app.use((err, req, res, next) => {
  console.log(err, 'err in 500')
  res.status(500).send({ msg: "Bad Request" });
});

module.exports = app;
