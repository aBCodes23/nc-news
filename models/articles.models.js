const db = require("../db/connection");

exports.readArticle = (article_id) => {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1", [article_id])
    .then(({ rows }) => {
        if (!rows.length) {
            return Promise.reject({status:404, msg:'Bad Request: Article does not exist'})
        }
      return rows[0];
    });
};

exports.readArticles = () => {
  return db
    .query("SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.article_id) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id GROUP BY articles.article_id ORDER BY created_at DESC")
    .then(({ rows }) => {
      return rows;
    });
};
