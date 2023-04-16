const { Schema, model } = require('mongoose');

const reactionSchema = new Schema(
  {
    reactionId: {
     type: Schema.Types.ObjectId,
     default: () => new Types.ObjectId(),
    },
    reactionBody: {
     type: String,
     required: true,
     maxlength: 280
    },
    username: {
     type: String,
     required: true,
    },
    createdAt: {
     type: Date,
     default: Date.now,
    },
 },
 {
     toJSON: {
         virtuals: true,
     },
     id: false,
 }
);
// Schema to create Post model
const thoughtSchema = new Schema(
  {
    houghtTextt:{
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    }, 
    createdAt: {
      type: Date,
      default: Date.now,
    },
    f: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);




thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  });

// Initialize our Application model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
