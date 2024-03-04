const router = require('express').Router();
const {
  getSinglePost,
  getPosts,
  createPost,
  deletePost,
  updatePost,
  addReaction,
  removeReaction,
} = require('../../controllers/postController');

router.route('/').get(getPosts).post(createPost);

router.route('/:postId').get(getSinglePost).delete(deletePost).put(updatePost);

router.route('/reaction/:postId').post(addReaction).delete(removeReaction);

module.exports = router;
