const jwt = require('jsonwebtoken');

module.exports = (req, _, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
  if (!token) {
    throw Error('You are not authorized');
  };
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded._id;
    req.userEmail = decoded.email
    return next();
  } catch (err) {
    throw Error('You are not authorized');
  };
};
