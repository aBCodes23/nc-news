const {
  readArticleComments,
  addComment,
} = require("../models/comments.models");
const { checkArticleExists } = require("../models/articles.models");

exports.getArticleComments = (request, response, next) => {
  const { article_id } = request.params;
  const promises = [checkArticleExists(article_id), readArticleComments(article_id)];

  Promise.all(promises)
    .then((resolvedPromises) => {
      const comments = resolvedPromises[1];
      response.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postComment = (request, response, next) => {
  const { article_id } = request.params;
  const  newComment  = request.body;
  const promises = [checkArticleExists(article_id),addComment(article_id, newComment)];

  Promise.all(promises)
    .then((resolvedPromises) => {
      const comment = resolvedPromises[1];
      response.status(201).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};
