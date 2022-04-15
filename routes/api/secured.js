const express = require("express");
var mongoose = require('mongoose');
const router = express.Router();
const keys = require("../../config/keys");
const Posts = require("../../models/Posts");
const User = require("../../models/User");
const moment = require('moment')

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

router.post('/', (req, res) => {

  let currentDate = new Date(); 
  let now = new Date();
  now.setDate(now.getDate()-7); 
  let oldDate = now; 

   Posts.find({
      "createdAt": {
          $gte: oldDate,
          $lt: currentDate,
      }
    }).sort({_id: -1}).skip(req.body.skip).limit(14).then(data => {
        res.status(200).json(data)
    })
  })

  router.post('/like', (req, res) => {

    let username = req.body.username; 
    let id = req.body.postId; 
    Posts.findById(mongoose.Types.ObjectId(id), function(err, data) {

      let rel = data.upVotes.find(e => e == username)
      if(rel == undefined) data.upVotes.push(req.body.username)
      data.save(); 
    })
    res.status(200)
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
    createdAt: new Date(),
    category: domain(req.body.content.domain) 
  })

  newPost.save().then((data) => {
    
    User.findOne({email: data.email}).then((data) => {
      data.posts.push(data._id)
      data.save(); 
    })
  }).catch(err => {
    console.log(err); 
  })

})


  module.exports = router;