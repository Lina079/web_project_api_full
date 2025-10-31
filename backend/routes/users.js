const router = require('express').Router();

const {
  getUsers,
  getUserById,
  getCurrentUser,
  updateProfile,
  updateAvatar,
   } = require('../controllers/users');

const {
  userIdParamValidator,
  updateProfileValidator,
  updateAvatarValidator,
} = require('../middlewares/validators');

//Gets
router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', userIdParamValidator, getUserById);


//Patches
router.patch('/me', updateProfileValidator, updateProfile);
router.patch('/me/avatar', updateAvatarValidator, updateAvatar);


module.exports = router;
