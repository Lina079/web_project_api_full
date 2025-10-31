const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 2,
        maxlength: 30,
        default: 'Jaques Cousteau',
    },
    about: {
        type: String,
        minlength: 2,
        maxlength: 200,
        default: 'Explorador',
    },
    avatar: {
        type: String,
        default: 'https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg',
        validate: {
            validator: (v) => validator.isURL(v, { require_protocol: true }),
            message: 'El avatar debe ser una URL válida (http/https).',
          },
        },
        email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (v) => validator.isEmail(v),
            message: 'Email no válido',
        },
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
  },
    { versionKey: false }
);

module.exports = mongoose.model('user', userSchema);


