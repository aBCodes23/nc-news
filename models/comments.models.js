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

exports.checkCommentExists = (comment_id) => {
  console.log('in check comment exists')
  return db
  .query('SELECT * FROM comments WHERE comment_id = $1', [comment_id])
  .then(({rows}) => {
    if (!rows.length){
      return Promise.reject({
        status:404,
        msg:'Not Found: Comment does not exist'
      })
    }
  })
}

exports.deleteCommentdb = (comment_id) => {
  console.log('in delete comment')
return db
.query("DELETE FROM comments WHERE comment_id = $1", [comment_id])
.then(({rows})=>{
  return rows
})
}
