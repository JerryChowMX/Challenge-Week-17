const { Schema, model, Types } = require('mongoose');
const dateFns = require('date-fns');

// Reaction Schema as a subdocument
const ReactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAtVal) => dateFns.format(createdAtVal, 'PPPppp'),
  },
},
  {
    toJSON: {
      getters: true,
    },
    id: false,
  });

// Thought Schema
const ThoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAtVal) => dateFns.format(createdAtVal, 'PPPppp'),
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [ReactionSchema],
},
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
    timestamps: true, 
  });

// Virtual for reactionCount
ThoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;
