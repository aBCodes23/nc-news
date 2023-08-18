const db = require("../db/connection");


exports.checkArticleExists = (article_id) => {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1", [article_id])
    .then(({ rows }) => {
      if (!rows.length) {
        return Promise.reject({
          status: 404,
          msg: "Not Found: Article does not exist",
        });
      }
    });
};

exports.readArticle = (article_id) => {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1", [article_id])
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.readArticles = (topic, sort_by = "created_at", order = "DESC") => {
  const orderByGreenList = ["DESC", "ASC"];
  const sortByGreenList = [
    "created_at",
    "article_id",
    "title",
    "topic",
    "author",
    "body",
    "votes",
    "comment_count"
  ];

  if (!orderByGreenList.includes(order)) {
    return Promise.reject({
      status: 400,
      msg: "Bad Request: Invalid order query",
    });
  }
  if (!sortByGreenList.includes(sort_by)) {
    return Promise.reject({
      status: 400,
      msg: "Bad Request: Invalid sort query",
    });
  }

  let sqlQuerystring =
    "SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, CAST(COUNT(comment_id) AS INT) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id";

  if (topic) {
    sqlQuerystring += ` WHERE topic = $1`;
    sqlQuerystring += ` GROUP BY articles.article_id ORDER BY ${sort_by} ${order}`;
    return db.query(sqlQuerystring, [topic]).then(({ rows }) => {
      return rows;
    })
  } else
    sqlQuerystring += ` GROUP BY articles.article_id ORDER BY ${sort_by} ${order}`;

  return db.query(sqlQuerystring).then(({ rows }) => {
    return rows;
  })
};

exports.updateArticleVotes = (article_id, voteInc) => {
  return db
    .query(
      "UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *",
      [voteInc, article_id]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};
