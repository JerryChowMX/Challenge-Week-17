const { Thought, User } = require('../models');

// Get all thoughts
exports.getAllThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find({});
    res.json(thoughts);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Get a single thought by ID
exports.getThoughtById = async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.id);
    if (!thought) {
      return res.status(404).json({ message: 'No thought found with this id!' });
    }
    res.json(thought);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Create a new thought (and push the thought's _id to the associated user's thoughts array)
exports.createThought = async (req, res) => {
  try {
    const thought = await Thought.create(req.body);
    await User.findByIdAndUpdate(
      req.body.userId,
      { $push: { thoughts: thought._id } },
      { new: true }
    );
    res.json(thought);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Update a thought by ID
exports.updateThought = async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!thought) {
      return res.status(404).json({ message: 'No thought found with this id!' });
    }
    res.json(thought);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Delete a thought by ID
exports.deleteThought = async (req, res) => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.id);
    if (!thought) {
      return res.status(404).json({ message: 'No thought found with this id!' });
    }
    // Also remove the thought from the user's `thoughts` array
    await User.findByIdAndUpdate(
      thought.userId,
      { $pull: { thoughts: req.params.id } },
      { new: true }
    );
    res.json({ message: 'Thought successfully deleted!' });
  } catch (err) {
    res.status(500).send(err);
  }
};

// Add a reaction to a thought
exports.addReaction = async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $push: { reactions: req.body } },
      { new: true, runValidators: true }
    );
    if (!thought) {
      return res.status(404).json({ message: 'No thought found with this id!' });
    }
    res.json(thought);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Remove a reaction from a thought
exports.removeReaction = async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    );
    if (!thought) {
      return res.status(404).json({ message: 'No thought found with this id or no reaction found with this id!' });
    }
    res.json(thought);
  } catch (err) {
    res.status(400).send(err);
  }
};
