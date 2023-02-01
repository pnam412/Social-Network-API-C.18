const { User, Thought } = require('../models');

module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // Get a usersController
  getSingleUsers(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((usersController) =>
        !usersController
          ? res.status(404).json({ message: 'No usersController with that ID' })
          : res.json(usersController)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a usersController
  createUsers(req, res) {
    User.create(req.body)
      .then((usersController) => res.json(usersController))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a usersController
  deleteUsers(req, res) {
    User.findOneAndDelete({ _id: req.params.usersId })
      .then((usersController) =>
        !usersController
          ? res.status(404).json({ message: 'No usersController with that ID' })
          : Thoughts.deleteMany({ _id: { $in: usersController.thoughts } })
      )
      .then(() => res.json({ message: 'Users and thoughts deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a usersController
  updateUsers(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((usersController) =>
        !usersController
          ? res.status(404).json({ message: 'No usersController with this id!' })
          : res.json(usersController)
      )
      .catch((err) => res.status(500).json(err));
  },
};