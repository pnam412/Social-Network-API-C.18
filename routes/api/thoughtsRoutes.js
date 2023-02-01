const router = require('express').Router();
const {
  getThoughts,
  getSingleThoughts,
  createThoughts,
  updateThoughts,
  deleteThoughts,
  addReaction,
  removeReaction,
} = require('../../controllers/thoughtsController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThoughts);

// /api/thoughts/:ThoughtId
router
  .route('/:thoughtsId')
  .get(getSingleThoughts)
  .put(updateThoughts)
  .delete(deleteThoughts);

// /api/Thoughts/:ThoughtId/reaction
router.route('/:thoughtsId/reaction').post(addReaction);

// /api/Thoughts/:thoughtsId/reaction/:reactionId
router.route('/:thoughtsId/reaction/:reactionId').delete(removeReaction);

module.exports = router;