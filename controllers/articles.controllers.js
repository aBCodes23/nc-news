const {
  checkArticleExists,
  readArticle,
  readArticles,
  updateArticleVotes,
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
      next(err);
    });
};

exports.getArticles = (request, response, next) => {
  const { article_id } = request.params;
  const { topic } = request.query;
  console.log(request.query, 'request query')
  console.log(topic, 'topic in cont')
  const { sort_by } = request.query;
  console.log(sort_by, 'sort by in cont')
  const { order } = request.query;
  console.log(order, 'order in cont')
  const promises = [readArticles(topic, sort_by, order)];

  if (article_id) {
    promises.push(checkArticleExists(article_id));
  }

  Promise.all(promises)
    .then((resolvedPromises) => {
      const articles = resolvedPromises[0];
      response.status(200).send({ articles });
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchArticle = (request, response, next) => {
  const { article_id } = request.params;
  const articleUpdate = request.body;
  const promises = [checkArticleExists(article_id)];

  if (articleUpdate["inc_vote"]) {
    promises.push(updateArticleVotes(article_id, articleUpdate["inc_vote"]));
  }

  Promise.all(promises)
    .then((resolvedPromises) => {
      const article = resolvedPromises[1];
      response.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};
