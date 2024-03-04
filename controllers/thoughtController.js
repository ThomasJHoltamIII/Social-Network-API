const { Thought, User } = require('../models');

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err)
    }
  },
  // create a new thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'Thought created, but found no user with that ID' });
      }

      res.json('Created the thought 🎉');
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // delete a thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndRemove(({ _id: req.params.thoughtId}));

      if (!thought) {
        return res.status(404).json({ message: "No thought found"})
      };

      if (!thought) {
        return res
          .status(404)
          .json({ message: 'No thought found.' });
      }

      res.json('Thought deleted');
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // Update a thought
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(thought);
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
      const newReaction = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $addToSet: { reactions: reaction } },
        { new: true }
      );
  
      if (!newReaction) {
        return res.status(404).json({ message: 'No reactions with this id!' });
      }
  
      res.json(newReaction);
    } catch (err) {
      res.status(500).json(err);
    }
  } , 
  // Remove Reaction
  async removeReaction(req, res) {
    try {
      const updatedThought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $pull: { reactions: { _id: req.params.reactionId } } },
        { new: true }
      );
  
      if (!updatedThought) {
        return res.status(404).json({ message: 'No reactions with this id!' });
      }
  
      res.json(updatedThought);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};
