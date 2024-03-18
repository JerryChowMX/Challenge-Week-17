const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes'); // Import the routes from the routes directory
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/socialNetworkDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Log when connected to MongoDB
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

// Use the routes
app.use('/api', routes);

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
