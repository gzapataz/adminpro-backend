const jwt = require('jsonwebtoken');

const validateJwt = (req, res, next) => {
  const token = req.header('x-token');
  if (!token) {
    return res.status(401).json({
      "ok": false,
      "msg": "Unauthorized"
    });
  }
  try {
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);
    req.uid = uid;

  } catch (error) {
    return res.status(401).json({
      "ok": false,
      "msg": "Token not valid"
    });
  }
  next();
}

module.exports = {
  validateJwt,
}