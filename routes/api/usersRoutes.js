const router = require('express').Router();
const {
  getUsers,
  getSingleUsers,
  createUsers,
  updateUsers,
  deleteUsers,
} = require('../../controllers/usersController.js');

// /api/Users
router.route('/').get(getUsers).post(createUsers);

// /api/Users/:UserId
router
  .route('/:userId')
  .get(getSingleUsers)
  .put(updateUsers)
  .delete(deleteUsers);

module.exports = router;