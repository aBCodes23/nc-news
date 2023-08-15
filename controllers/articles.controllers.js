const {readArticles} = require("../models/articles.models");

exports.getArticles = (request, response, next) => {
  const { article_id } = request.params;
  readArticles(article_id).then((article) => {
    response.status(200).send({ article });
  })
  .catch(next);
};
