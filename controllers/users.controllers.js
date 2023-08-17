const { readUsers } = require("../models/users.models");

exports.getUsers = (request, response) => {
  readUsers().then((users) => {
    response.status(200).send({ users });
  });
};
