const { readTopics } = require("../models/topics.models");

exports.getTopics = (request, response) => {
  readTopics().then((topics) => {
    response.status(200).send({ topics });
  });
};
