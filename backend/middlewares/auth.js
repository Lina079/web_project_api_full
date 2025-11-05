const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // 🔓 Rutas públicas que NO requieren autenticación
  const publicPaths = ['/api/signin', '/api/signup'];

  if (publicPaths.includes(req.path)) {
    return next();
  }

  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Autorización requerida' });
  }

  // 🔧 Limpieza total del token (elimina espacios, saltos, etc.)
  const token = authorization.replace('Bearer ', '').trim();

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET.trim());
    req.user = payload;
    return next();
  } catch (e) {
    console.error('[AUTH ERROR]', e.message);
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
};

