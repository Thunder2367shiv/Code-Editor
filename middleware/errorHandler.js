// middlewares/errorHandler.js
export const errorHandler = (err, req, res, next) => {
  console.error(`❌ Error: ${err.message}`);

  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    success: false,
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  }); 
};
