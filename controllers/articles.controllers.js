const {readArticle, readArticles} = require("../models/articles.models");

exports.getArticle = (request, response, next) => {
  const { article_id } = request.params;
  readArticle(article_id).then((article) => {
    response.status(200).send({ article });
  })
  .catch(next);
};

exports.getArticles = (request, response, next) => {
  readArticles().then((articles) => {
    response.status(200).send({ articles });
  })
  .catch(next);
};
