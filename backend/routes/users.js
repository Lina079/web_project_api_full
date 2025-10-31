const router = require('express').Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
  getCurrentUser,
   } = require('../controllers/users');

const {
  userIdParamValidator,
  updateProfileValidator,
  updateAvatarValidator,
} = require('../middlewares/validators');


router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', userIdParamValidator, getUserById);
router.post('/', createUser);
router.patch('/me', updateProfileValidator, updateProfile);
router.patch('/me/avatar', updateAvatarValidator, updateAvatar);


module.exports = router;
