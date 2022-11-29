module.exports = (err) => {
    const error = {
      success: false,
      status: err.status || 500,
      message: err.message,
      stack: err.stack
    };
    if (error.message.includes('duplicate key error') || 
      error.message.includes('Wrong')) error.status = 400;

    if (err.message.includes('You are not authorized')) {
      error.status = 401;
    }
    if (err.message.includes('You are not allowed')){
      error.status = 403;
    }
    if (err.message.includes('is not found')) {
      error.status = 404;
    }
    return error;
  };