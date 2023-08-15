exports.customErrorHandler = (err, request, response, next) => {
    if (err.status && err.msg){
        console.log('in if statement in error controller')
        response.status(err.status).send({msg: err.msg})
    }
    else next(err)
}