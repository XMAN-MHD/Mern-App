
// function to handle errors in the server
const errorHandlingMiddleware = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode);
    res.json({message: err.message});
}

// export the function
module.exports = { errorHandlingMiddleware } 