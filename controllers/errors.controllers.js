exports.customErrorHandler = (err, request, response, next) => {
    if(err.code === '22P02'){
        response.status(400).send({msg: 'Bad Request: path is invalid'})
    }
    if (err.status && err.msg){
        response.status(err.status).send({msg: err.msg})
    }
    else next(err)
}