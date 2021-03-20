const Comment = require('../models/Comment');

const comments_blog_get = (req, res) => {
  const id = req.params.id;
  Comment.find({blogId: id}).sort({ createdAt: -1 })
  .then(result => {
    res.json(result);
  })
  .catch(err => {
    console.log(err);
  });
}

const comment_create_post = (req, res) => {
  const comment = new Comment(req.body);
  comment.save()
    .then(result => {
      res.json(`Comment is created. ID - ${result}`);
    })
    .catch(err => {
      console.log(err);
    });
}

const comment_delete = (req, res) => {
  const id = req.params.id;
  Comment.findByIdAndDelete(id)
    .then(result => {
      res.json({ message: `Comment is deleted. ID - ${result}` });
    })
    .catch(err => {
      console.log(err);
    });
}

module.exports = {
  comments_blog_get,
  comment_create_post, 
  comment_delete
}