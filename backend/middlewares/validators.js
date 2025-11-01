const { celebrate, Joi, Segments} = require('celebrate');


// Validación de URL
const url = Joi.string().uri({
  scheme: ['http', 'https'],
});

//=== Validadores ===//

//Registro

const signupValidator = celebrate({
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    name: Joi.string().min(2).max(30).optional(),
    about: Joi.string().min(2).max(200).optional(),
    avatar: url.optional(),
  }),
});

const signinValidator = celebrate({
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
});

const userIdParamValidator = celebrate({
  [Segments.PARAMS]: Joi.object({
    userId: Joi.string().hex().length(24).required(),
  }),
});

// Perfil de usuario
const updateProfileValidator = celebrate({
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(200).required(),
  }),
});

const updateAvatarValidator = celebrate({
  [Segments.BODY]: Joi.object({
    avatar: url.required(),
  }),
});

// Tarjetas
const createCardValidator = celebrate({
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).max(30).required(),
    link: url.required(),
  }),
});

const cardIdParamValidator = celebrate({
  [Segments.PARAMS]: Joi.object({
    cardId: Joi.string().hex().length(24).required(),
  }),
});

module.exports = {
  signupValidator,
  signinValidator,
  userIdParamValidator,
  updateProfileValidator,
  updateAvatarValidator,
  createCardValidator,
  cardIdParamValidator,
};
