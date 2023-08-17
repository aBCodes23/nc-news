exports.customErrorHandler = (err, request, response, next) => {
  if (err.code === "22P02") {
    const error = err.message
    errorArray = error.split('"')
    response.status(400).send({ msg: `Bad Request: "${errorArray[1]}" is invalid` });
  }
  if (err.code === "23502") {
    response.status(400).send({ msg: "Bad Request: Comment incomplete" });
  }
  if (err.status && err.msg) {
    response.status(err.status).send({ msg: err.msg });
  } else next(err);
};
