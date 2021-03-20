const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  body: {
    type: String,
    required: true
  },
  blogId: {
    type: String,
    required: true
  },
  authorName: {
    type: String,
    required: true
  }

}, { timestamps: true });

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;