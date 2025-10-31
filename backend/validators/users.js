const { celebrate, Joi, Segments } = require('celebrate');

const updateProfileValidator = celebrate({
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

const updateAvatarValidator = celebrate({
  [Segments.BODY]: Joi.object({
    avatar: Joi.string()
    .uri({
      scheme: ['http', 'https'] })
    .required(),
  }),
});

module.exports = {
  updateProfileValidator,
  updateAvatarValidator,
};
