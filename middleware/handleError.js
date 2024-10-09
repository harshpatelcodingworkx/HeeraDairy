class AppError extends Error{
    constructor(statusCode, message){
        super();

        this.status = statusCode;
        this.message = message;
    }
}


const errorhandler = (err, req, res, next)=>{
    const message = err.message || "Something went wrong!!";
    const statusCode = err.status || 500;

    res.status(statusCode).json({
        status:statusCode,
        message:message,
        ...(process.env.NODE_ENV === 'development' && {stack : err.stack})
    });
}


module.exports = {
    errorhandler,
    AppError
}