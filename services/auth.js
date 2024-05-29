const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;

const createTokenForUser = (user) => {
  const payload = {
    _id: user._id,
    email: user.email,
    profileImageURL: user.profileImageURL,
    role: user.role,
  };

  const token = jwt.sign(payload, secret, {
    expiresIn: "1d",
  });

  return token;
};

const validateToken = (token) => {
  const payload = jwt.verify(token, secret);
  return payload;
};

module.exports = { createTokenForUser, validateToken };
