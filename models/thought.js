const { Schema, model } = require('mongoose');
const reaction = require('./reaction');

// Schema to create Post model
const ThoughtSchema = new Schema(
  {
    published: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    buildSuccess: {
      type: Boolean,
      default: true,
    },
    description: {
      type: String,
      minLength: 15,
      maxLength: 500,
    },
    reaction: [reaction],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `getReaction` that gets the amount of tags associated with an application
ThoughtSchema
  .virtual('getResponses')
  // Getter
  .get(function () {
    return this.reaction.length;
  });

// Initialize our Application model
const Thought = model('thought', ThoughtSchema);

module.exports = Thought;
