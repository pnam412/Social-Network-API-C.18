const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');

// Schema to create Post model
const reactionSchema = new Schema(
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
    reaction: [Reaction],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `getTags` that gets the amount of tags associated with an application
reactionSchema
  .virtual('getReaction')
  // Getter
  .get(function () {
    return this.reaction.length;
  });

// Initialize our Application model
const Reaction = model('reaction', reactionSchema);

module.exports = Reaction;
