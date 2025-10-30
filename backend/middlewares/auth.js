const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Autorización requerida'});
    }

    const token = authorization.replace('Bearer ', '').trim();

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret');
      req.user = payload;
      return next();
    } catch (e) {
      return res.status(401).json({ message: 'Token inválido o expirado' });
    }
};
