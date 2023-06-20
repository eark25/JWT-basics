const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');
const { promisify } = require('util');

exports.protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError('No token provided');
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const { id, username } = decoded;

    req.user = { id, username };

    next();
  } catch (error) {
    throw new UnauthenticatedError(
      `${error.message}: You are not authorized to access this route`
    );
  }
};
