const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.status(401).json({message:"The token is invalid"});
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.status(404).json({message:"The token does not exist"});
  }
};

const requireRole = (role) => {
  return (req, res, next) => {
    if (req.body.role !== role) {
      res.status(401)
      return res.send('Not allowed')
    }

    next()
  }
}

// check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decodedToken) => {
      if (err) {
        res.status(401).json({message:"The token is invalid"})
      } else {
        let user = await User.findById(decodedToken.id);
        res.json({ userEmail: user.email, userId: user._id, userName: user.name, userRole: user.role, message:"You are relogged in"});
        next();
      }
    });
  } else {
    res.status(404).json({error:"The token does not exist"});
  }
};


module.exports = { requireAuth, requireRole, checkUser };