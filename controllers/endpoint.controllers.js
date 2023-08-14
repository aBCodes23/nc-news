const {readEndPoints} = require("../models/endpoints.models");

exports.getEndPoints = (request, response) => {
  readEndPoints().then((endpoints) => {
    response.status(200).send({ endpoints });
  });
};
