// check username and password in POST login request
// if exist create new JWT
// send it back to front-end

// setup authentication so only the request with matched JWT can access the dashboard/data

const jwt = require('jsonwebtoken');
const { BadRequestError } = require('../errors');
const { promisify } = require('util');

exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new BadRequestError('Please provide email and password');
  }
  // normally provided by DB
  const id = new Date().getDate();
  // try to keep payload small, better UX
  const token = jwt.sign(
    {
      id,
      username,
    },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );

  res.status(200).json({
    status: 'success',
    msg: 'user created',
    token,
  });
};

exports.dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);

  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};
