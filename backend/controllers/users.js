const bcrypt = require('bcryptjs');
const SALT_ROUNDS = 10;
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const notFound = (msg = 'Usuario no encontrado') => {
  const err = new Error(msg);
  err.statusCode = 404;
  return err;
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(() => {
      const err = new Error('Usuario no encontrado');
      err.statusCode = 404;
      throw err;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'ID de usuario no válido' });
      }
      return next(err);
    });
};

module.exports.createUser = async (req, res, next) => {
  try {
    const {
      name, about, avatar, email, password,
    } = req.body;

    if (!email || !password) {
      return res.status(400).send({ message: 'Email y contraseña son requeridos' });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    });

    const data = user.toObject();
    delete data.password;

    return res.status(201).send(data);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).send({ message: 'El email ya está en uso' });
    }
    if (err.name === 'ValidationError') {
      return res.status(400).send({ message: 'Datos de usuario no válidos' });
    }
    return next(err);
  }
    };

//PATH: /users/me

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      const err = new Error('Usuario no encontrado');
      err.statusCode = 404;
      throw err;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Datos de usuario no válidos' });
      }
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'ID de usuario no válido' });
      }
      return next(err);
    });
};

//PATH: /users/me/avatar

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      const err = new Error('Usuario no encontrado');
      err.statusCode = 404;
      throw err;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Datos de usuario no válidos' });
      }
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'ID de usuario no válido' });
      }
      return next(err);
    });
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ message: 'Email y contraseña son requeridos' });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).send({ message: 'Email o contraseña incorrectos' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ message: 'Email o contraseña incorrectos' });
    }

    const token = jwt.sign(
      { _id: user._id },
      process.env.JWT_SECRET || 'dev-secret',
      { expiresIn: '7d' },
    );

    return res.send({ token });
  } catch (err) {
    return next(err);
  }
};





