const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json('У вас нет доступа');
  }

  const [type, token] = authorization.split(' ');

  if (type !== 'Bearer') {
    return res.status(401).json('У вас неверный тип токена');
  }

  try {
    req.user = jwt.verify(token, process.env.SECRET_JWT_KEY);

    next();
  } catch (e) {
    return res.status(401).json(e);
  }
};
