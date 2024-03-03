const connection = require('../config/connection');
const { Post, User } = require('../models');
const { getRandomPost, genRandomIndex, getRandomName } = require('./data');

console.time('seeding');

connection.once('open', async () => {
  await connection.db.dropCollection('posts').catch(err => console.log('No posts collection to drop.'));
  await connection.db.dropCollection('users').catch(err => console.log('No users collection to drop.'));

  // Create and insert users
  const users = [];
  for (let i = 0; i < 10; i++) {
    const username = getRandomName();
    const email = `${username}@example.com`;
    users.push({ username, email });
  }
  const insertedUsers = await User.collection.insertMany(users);
  const userRefs = users.map(user => user.username);
  // Create and insert posts, associating them with user IDs
  const posts = [];
  const userIds = Object.values(insertedUsers.insertedIds);
  for (let i = 0; i < 10; i++) {
    // Emojis added for reactions
    const allReactions = ['😀', '🤪', '🤗', '🙀', '😍', '🥳'];
    // Randomizes reaction amount
    const reactionCount = Math.floor(Math.random() * 5) + 2; 
    const reactions = [];
    for (let j = 0; j < reactionCount; j++) {
      reactions.push(allReactions[genRandomIndex(allReactions)]);
    }
    const text = getRandomPost(50);
    // Associate each post with the user
    const userRef = userRefs[i] 
    posts.push({ thoughtText: text, reactions, username: userRef });
  }

  await Post.collection.insertMany(posts);

  // Update user documents to include posts
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    await User.findByIdAndUpdate(userIds[i], { $push: { posts: post._id } });
  }

  console.timeEnd('seeding');
  process.exit(0);
});
