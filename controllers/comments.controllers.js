const {
  readArticleComments,
  addComment,
  checkCommentExists,
  deleteCommentdb,
} = require("../models/comments.models");
const { checkArticleExists } = require("../models/articles.models");
const { checkUserExists } = require("../models/users.models");

exports.getArticleComments = (request, response, next) => {
  const { article_id } = request.params;
  const promises = [
    checkArticleExists(article_id),
    readArticleComments(article_id),
  ];

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
  const newComment = request.body;
  const { username } = newComment;
  const promises = [
    checkUserExists(username),
    checkArticleExists(article_id),
    addComment(article_id, newComment),
  ];

  Promise.all(promises)
    .then((resolvedPromises) => {
      const comment = resolvedPromises[2];
      response.status(201).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteComment = (request, response, next) => {
  const { comment_id } = request.params;

  const promises = [
    checkCommentExists(comment_id),
    deleteCommentdb(comment_id),
  ];

  Promise.all(promises)
    .then(() => {
      response.status(204).send();
    })
    .catch((err) => {
      next(err);
    });
};
