const fs = require("fs/promises");

exports.readEndPoints = () => {
  return fs.readFile("./endpoints.json", 'utf-8')
  .then((endPointsJson) => {
    const endPointsParsed = JSON.parse(endPointsJson)
    return endPointsParsed
  })
};
