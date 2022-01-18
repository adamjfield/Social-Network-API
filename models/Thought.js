const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema();

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: [1, 'thought must be at least 1 character in length!'],
      maxlength: [280, 'thought cannot be more than 280 characters in length'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
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
  }
);

ThoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;
