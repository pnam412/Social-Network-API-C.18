const router = require('express').Router();
const {
  getThoughts,
  getSingleThoughts,
  createThoughts,
  deleteThoughts,
//   addReaction,
//   removeReaction,
} = require('../../controllers/thoughtsController');

// /api/Thoughts
router.route('/').get(getThoughts).post(createThoughts);

// /api/Thoughts/:ThoughtId
router.route('/:thoughtId').get(getSingleThoughts).delete(deleteThoughts);

// /api/Thoughts/:ThoughtId/reactions
// router.route('/:thoughtId/reactions').post(addReaction);

// // /api/Thoughts/:ThoughtId/reactions/:reactionId
// router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;