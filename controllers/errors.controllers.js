exports.customErrorHandler = (err, request, response, next) => {
  if (err.code === "22P02") {
    const error = err.message;
    errorArray = error.split('"');
    response
      .status(400)
      .send({ msg: `Bad Request: "${errorArray[1]}" is invalid` });
  } else if (err.code === "23502") {
    response.status(400).send({ msg: "Bad Request: Comment incomplete" });
  } else if (err.code === "23503") {
    response.status(400).send({ msg: "Bad Request: User does not exist" });
  } else if (err.status && err.msg) {
    response.status(err.status).send({ msg: err.msg });
  } else next(err);
};
