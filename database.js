const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('simon');
const userCollection = db.collection('user');
const scoreCollection = db.collection('score');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
    await client.connect();
    await db.command({ ping: 1 });
  })().catch((ex) => {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  });

  function getUser(username) {
    return userCollection.findOne({ userName: username });
  }
  
  function getUserByToken(token) {
    return userCollection.findOne({ token: token });
  }
  
  async function createUser(username, password) {
    // Hash the password before we insert it into the database
    const passwordHash = await bcrypt.hash(password, 10);
  
    const user = {
      userName: username,
      password: passwordHash,
      token: uuid.v4(),
    };
    await userCollection.insertOne(user);
  
    return user;
  }
  
  function addScore(score) {
    scoreCollection.insertOne(score);
  }
  
  function getHighScores() {
    const query = { score: { $gt: 0, $lt: 300 } };
    const options = {
      sort: { score: -1 },
    };
    const cursor = scoreCollection.find(query, options);
    return cursor.toArray();
  }
  