const router = require('express').Router();

const {
    getThoughts,
    getThoughtByID,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thought-controller');

router
    .route('/')
    .get(getThoughts)
    .post(createThought);

router
    .route('/:id')
    .get(getThoughtByID)
    .put(updateThought)
    .delete(deleteThought);

router
    .route('/:thoughtId/reactions')
    .post(createReaction);

router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);

module.exports = router;