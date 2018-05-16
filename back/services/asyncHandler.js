const asyncHandler = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(e => {
       res.status(500);
       res.end();
       next()
     });
  };
module.exports = asyncHandler;