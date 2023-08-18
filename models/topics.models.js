const db = require("../db/connection");

exports.readTopics = () => {
  return db.query("SELECT * FROM topics").then(({ rows }) => {
    return rows;
  });
};

exports.checkTopicExists = (topic) => {
  return db
    .query(`SELECT * FROM topics WHERE slug = $1`, [topic])
    .then(({ rows }) => {
      if (!rows.length) {
        return Promise.reject({
          status: 400,
          msg: "Bad Request: Invalid filter query",
        });
      }
    });
};
