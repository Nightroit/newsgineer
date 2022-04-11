const express = require("express");
const router = express.Router();
const keys = require("../../config/keys");
const Posts = require("../../models/Posts");
const User = require("../../models/User");
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

router.get('/', (req, res) => {

   Posts.find({}).then(data => {
    res.status(200).json(data)
   })
  })

  router.post('/', (req, res) => {
    Posts.find({category: req.body.category}).then(data => {
      res.status(200).json(data); 
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
    upVotes: 0, 
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