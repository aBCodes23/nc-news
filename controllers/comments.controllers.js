const { readArticleComments } = require("../models/comments.models");
const { checkArticleExists } = require("../models/articles.models");

exports.getArticleComments = (request, response, next) => {
  const { article_id } = request.params;
  const promises = [readArticleComments(article_id)];

  if (article_id) {
    promises.push(checkArticleExists(article_id));
  }

  Promise.all(promises)
    .then((resolvedPromises) => {
      const comments = resolvedPromises[0];
      response.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};
