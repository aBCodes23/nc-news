const db = require("../db/connection");

exports.readArticles = (article_id) => {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1", [article_id])
    .then(({ rows }) => {
        if (!rows.length) {
            return Promise.reject({status:404, msg:'Bad Request: Article does not exist'})
        }
      return rows[0];
    });
};