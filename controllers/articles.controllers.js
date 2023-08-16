const {
  checkArticleExists,
  readArticle,
  readArticles,
} = require("../models/articles.models");

exports.getArticle = (request, response, next) => {
  const { article_id } = request.params;
  const promises = [readArticle(article_id)];

  if (article_id) {
    promises.push(checkArticleExists(article_id));
  }

  Promise.all(promises)
    .then((resolvedPromises) => {
      const article = resolvedPromises[0];
      response.status(200).send({ article });
    })
    .catch((err) => {
      next(err)
    });
};

exports.getArticles = (request, response, next) => {
  const { article_id } = request.params;
  const promises = [readArticles(article_id)];

  if (article_id) {
    promises.push(checkArticleExists(article_id));
  }

  Promise.all(promises)
    .then((resolvedPromises) => {
      const articles = resolvedPromises[0];
      response.status(200).send({ articles });
    })
    .catch((err) => {
      next(err)
    });
};
