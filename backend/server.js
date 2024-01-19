
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 3001;
app.use(cors());

mongoose.connect('mongodb+srv://shibs1773:QZNbr2mLPB4FFWca@cluster0.s9crav7.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }) .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: String,
});

const leaderboardSchema = new mongoose.Schema({
  student: String,
  score: Number,
});
  
const User = mongoose.model('User', userSchema);
const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);

app.use(bodyParser.json());
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Check if the username already exists
      const existingUser = await User.findOne({ username });
  
      if (existingUser) {
        return res.status(400).json({ error: 'Username already taken.' });
      }
  
      // Hash the password before storing it
    //   const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user
      const newUser = new User({ username, password: password });
      await newUser.save();
  
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Check if the user exists
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(401).json({ error: 'Invalid username or password.' });
      }
  
      // Compare the provided password with the stored hashed password
      
  
      if (password!=user.password) {
        return res.status(401).json({ error: 'Invalid username or password.' });
      }
  
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
// Endpoint to get the leaderboard
app.get('/api/leaderboard', async (req, res) => {
  try {
    const leaderboard = await Leaderboard.find().sort({ score: -1 });
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to update the leaderboard
app.post('/api/leaderboard', async (req, res) => {
    const { student, score } = req.body;
  
    try {
      // Find the existing entry for the student
      const existingEntry = await Leaderboard.findOne({ student });
  
      if (existingEntry) {
        // Update the score if the student already exists in the leaderboard
        existingEntry.score = score;
        await existingEntry.save();
      } else {
        // Create a new entry if the student doesn't exist
        const newEntry = new Leaderboard({ student, score });
        await newEntry.save();
      }
  
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
