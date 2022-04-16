const express = require("express");
var mongoose = require('mongoose');
const router = express.Router();
const keys = require("../../config/keys");
const Posts = require("../../models/Posts");
const User = require("../../models/User");
const moment = require('moment');

function domain(num) {
  switch(num) {
    case "1": return "Aeronautical";
    case "2": return "Agriculture";
    case "3": return "Biomedical"; 
    case "4": return "Civil"; 
    case "5": return "Electrical"; 
    case "6": return "Electronics"; 
    case "7": return "Environmental" ;
    case "8": return "Computer"; 
    case "9": return "Other"; 
  }
}

function convertDate(inputFormat) {
  function pad(s) { return (s < 10) ? '0' + s : s; }
  var d = new Date(inputFormat)
  return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('-')
}


  router.post('/like', (req, res) => {

    let username = req.body.username; 
    let id = req.body.postId; 
    Posts.findById(mongoose.Types.ObjectId(id), function(err, data) {

      let rel = data.upVotes.find(e => e == username)
      if(rel == undefined) {
          data.upVotes.push(req.body.username)
          data.upVotesLen++; 
        }
          data.save(); 
    })
    res.status(200)
  })
  
  router.post("/profile", (req, res) => {
    let username = req.body.username;

    User.findOne({name: username}).populate('posts').then(async (data) => { 
      res.status(200).json(data); 
    })
  })

  router.post("/deletePost", (req, res) => {
    let postId = req.body.postId;
    Posts.findById(mongoose.Types.ObjectId(postId)).remove().then(data => {
      res.status(200).json({msg: "Post deleted successfully!"})
    }).catch(err => {
      res.json({msg: "err", err}); 
    })
  })

router.post('/post', (req, res) => {

  const newPost = new Posts({
    name: req.user.name, 
    email: req.user.email, 
    post: {
      date: new Date(),
      content: req.body.content
    },
    upVotes: [], 
    upVotesLen: 0,
    createdAt: new Date(),
    category: domain(req.body.content.domain) 
  })

  newPost.save().then((data) => {
    User.findOne({email: data.email}).then((userdata) => {
      userdata.posts.push(data._id)
      userdata.save(); 
    })
  }).catch(err => {
    console.log(err); 
  })

})


  module.exports = router;