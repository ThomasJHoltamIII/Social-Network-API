const { Post, User } = require('../models');

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v')
        .populate('posts');

      if (!user) {
        return res.status(404).json({ message: 'User not found'})
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a User
  async updateUser(req, res) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.userId }, 
        req.body, 
        { new: true, runValidators: true })
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found'})
      }
  
      res.json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a User
  async deleteUser(req, res) {
    try {
      const user = await User.findByIdAndDelete({ _id: req.params.userId})

      if ( !user ) {
        return res.status(404).json({ message: 'User not found'})
      }

      await Post.deleteMany({ _id: { $in: user.posts }})
      res.json({message: "User and Posts deleted"})
    } catch (err) {
      res.status(500).json(err)
    }
  },
  // Add a friend
  async addFriend(req, res) {
    try {
      const { userId, friendId } = req.params;
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: 'User not found'})
  
      if (!user.friends.includes(friendId)) {
        user.friends.push(friendId);
        await user.save();
        res.json({ meassage: 'New Friend Added 🥳'});
      } else {
        res.status(404).send('Friend already added');
      }
    } catch (err) {
      res.status(500).send(err);
    }
  },
  // Remove a friend
  async removeFriend(req, res) {
    try {
      const { userId, friendId } = req.params;
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: 'User not found'})
  
      const index = user.friends.indexOf(friendId);
      if (index > -1) {
        user.friends.splice(index, 1);
        await user.save();
        res.json({ meassage: 'Friend Removed 🙀'});
      } else {
        res.status(404).send('Friend not found');
      }
    } catch (err) {
      res.status(500).send(err);
    }
  }
};
