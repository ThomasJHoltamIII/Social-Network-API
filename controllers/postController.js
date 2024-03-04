const { Post, User } = require('../models');

module.exports = {
  async getPosts(req, res) {
    try {
      const posts = await Post.find();
      res.json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSinglePost(req, res) {
    try {
      const post = await Post.findOne({ _id: req.params.postId });

      if (!post) {
        return res.status(404).json({ message: 'No post with that ID' });
      }

      res.json(post);
    } catch (err) {
      res.status(500).json(err)
    }
  },
  // create a new post
  async createPost(req, res) {
    try {
      const post = await Post.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { posts: post._id } },
        { new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'Post created, but found no user with that ID' });
      }

      res.json('Created the post 🎉');
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // delete a post
  async deletePost(req, res) {
    try {
      const post = await Post.findOneAndRemove(({ _id: req.params.postId}));

      if (!post) {
        return res.status(404).json({ message: "No post found"})
      };

      if (!post) {
        return res
          .status(404)
          .json({ message: 'No post found.' });
      }

      res.json('Post deleted');
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // Update a post
  async updatePost(req, res) {
    try {
      const post = await Post.findOneAndUpdate(
        { _id: req.params.postId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!post) {
        return res.status(404).json({ message: 'No post with this id!' });
      }

      res.json(post);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // Add Reaction
  async addReaction(req, res) {
    try {
      const reaction = {
        reactionBody: req.body.reactionBody,
        username: req.body.username
      };
      const newReaction = await Post.findByIdAndUpdate(
        req.params.postId,
        { $addToSet: { reactions: reaction } },
        { new: true }
      );
  
      if (!newReaction) {
        return res.status(404).json({ message: 'No post with this id!' });
      }
  
      res.json(newReaction);
    } catch (err) {
      res.status(500).json(err);
    }
  } , 
  // Remove Reaction
  async removeReaction(req, res) {
    try {
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.postId,
        { $pull: { reactions: { _id: req.params.reactionId } } },
        { new: true }
      );
  
      if (!updatedPost) {
        return res.status(404).json({ message: 'No post found with this id!' });
      }
  
      res.json(updatedPost);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};
