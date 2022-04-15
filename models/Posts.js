const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Post = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  time : { 
    type : Date, 
    default: Date.now 
  }, 
  post: {
    type: Object,
    required: true
  }, 
  upVotes: {
    type: Array, 
    required: true
  }, 
  upVotesLen: {
    type: Number, 
    require: true
  },
  category: {
    type: String
  },
  createdAt: {
    type: Date, 
    required: true
  }
}, {retainKeyOrder: true});
module.exports = User = mongoose.model("posts", Post);