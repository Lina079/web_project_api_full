const { celebrate, Joi, Segments } = require('celebrate');

const url = Joi.string().uri({
  scheme: ['http', 'https'],
});

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

module.exports = {
  signupValidator,
  signinValidator,
};
