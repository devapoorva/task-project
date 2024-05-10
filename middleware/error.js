class ErrorHandler extends Error {
    constructor(statusCode, message, data=null) {
      super(message);
      this.statusCode = statusCode;
      this.message = message;
      this.data = data;
    }
}

const handleError = (err,req,res,next) => {
    const { statusCode, message,data } = err;
    return res.status(statusCode || 500).json({
      success: false,
      error: message || 'Internal Server Error',
      data: data
    });
};

export {ErrorHandler, handleError};