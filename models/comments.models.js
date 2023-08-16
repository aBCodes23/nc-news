const db = require("../db/connection");
const format = require('pg-format')

exports.readArticleComments = (article_id) => {
  return db
    .query(
      "SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC",
      [article_id]
    )
    .then(({ rows }) => {
      return rows;
    });
};

exports.addComment = (article_id, newComment) => {
  const {body, username} = newComment
  const queryStr = format(`INSERT INTO comments (body, author, article_id) VALUES %L RETURNING *`, [[body, username, article_id]])
return db
.query(queryStr)
.then(({rows}) => {
  return rows[0]
})
}
