const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomName, getRandomThought } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  await Thought.deleteMany({});
  await User.deleteMany({});

  const users = [];
  const thoughts = []; 

  for (let i = 0; i < 20; i++) {
    const userName = getRandomName();
    const email = userName +'@gmail.com';
    const thought = getRandomThought(1); 


    thoughts.push(
      {
        thoughtText: thought, 
        username:  userName
      } 

    )
    users.push({
      userName,
      email,
      thoughts: [i],
    });
  }

  await User.collection.insertMany(users);
  await Thought.collection.insertMany(thoughts);

  // loop through the saved applications, for each application we need to generate a application response and insert the application responses
  console.table(users);
  console.table(thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
