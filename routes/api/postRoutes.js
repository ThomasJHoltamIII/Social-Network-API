const router = require('express').Router();
const {
  getSinglePost,
  getPosts,
  createPost,
  deletePost,
  updatePost,
  addReaction,
} = require('../../controllers/postController');

router.route('/').get(getPosts).post(createPost);

router.route('/:postId').get(getSinglePost).delete(deletePost).post(updatePost).put(addReaction);

module.exports = router;
