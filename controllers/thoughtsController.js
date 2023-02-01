const { ObjectId } = require('mongoose').Types;
const { thoughts, Users } = require('../models');

// Aggregate function to get the number of thoughts overall
const usersCount = async () =>
  thoughts.aggregate()
    .count('thoughtsCount')
    .then((numberOfThoughts) => numberOfThoughts);

// Aggregate function for getting the overall thoughts
const users = async (thoughtsId) =>
  thoughts.aggregate([
    // only include the given thought by using $match
    { $match: { _id: ObjectId(thoughtsId) } },
    {
      $unwind: '$users',
    },
    {
      $group: {
        _id: ObjectId(thoughtsId),
        overallUsers: { $avg: '$users.thoughts' },
      },
    },
  ]);

module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    thoughts.find()
      .then(async (thoughts) => {
        const thoughtsObj = {
          thoughts,
          usersCount: await usersCount(),
        };
        return res.json(thoughtsObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get a single thought
  getSingleThoughts(req, res) {
    Thoughts.findOne({ _id: req.params.thoughtsId })
      .select('-__v')
      .then(async (thoughts) =>
        !thoughts
          ? res.status(404).json({ message: 'No thoughts with that ID' })
          : res.json({
              thoughts,
              users: await users(req.params.thoughtsId),
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new thoughts
  createThoughts(req, res) {
    Thoughts.create(req.body)
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // Delete a thoughts and remove them from the course
  deleteThoughts(req, res) {
    Thoughts.findOneAndRemove({ _id: req.params.thoughtsId })
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: 'No such thoughts exists' })
          : Users.findOneAndUpdate(
              { thoughts: req.params.thoughtsId },
              { $pull: { thoughts: req.params.thoughtsId } },
              { new: true }
            )
      )
      .then((users) =>
        !users
          ? res.status(404).json({
              message: 'Thoughts deleted, but no users found',
            })
          : res.json({ message: 'Thoughts successfully deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Add a users to a thoughts
  addUsers(req, res) {
    console.log('You are adding users');
    console.log(req.body);
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtsId },
      { $addToSet: { users: req.body } },
      { runValidators: true, new: true }
    )
      .then((thoughts) =>
        !thoughts
          ? res
              .status(404)
              .json({ message: 'No thoughts found with that ID :(' })
          : res.json(thoughts)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Remove assignment from thoughts
  removeUsers(req, res) {
    thoughts.findOneAndUpdate(
      { _id: req.params.thoughtsId },
      { $pull: { users: { usersId: req.params.usersId } } },
      { runValidators: true, new: true }
    )
      .then((thoughts) =>
        !thoughts
          ? res
              .status(404)
              .json({ message: 'No thought found with that ID :(' })
          : res.json(thoughts)
      )
      .catch((err) => res.status(500).json(err));
  },
};