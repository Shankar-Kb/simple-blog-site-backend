const Blog = require('../models/blog');

const blogs_all = (req, res) => {
  Blog.find().sort({ createdAt: -1 })
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      console.log(err);
    });
}

const blogs_user_get = (req, res) => {
  const id = req.params.id;
  Blog.find({authorId: id}).sort({ createdAt: 1 })
  .then(result => {
    res.json(result);
  })
  .catch(err => {
    console.log(err);
  });
}

const blog_details = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(404).json({message: "Blog not found"});
    });
}


const blog_create_post = (req, res) => {
  const blog = new Blog(req.body);
  blog.save()
    .then(result => {
      res.json(`Blog is created. ID - ${result}`);
    })
    .catch(err => {
      console.log(err);
    });
}

const blog_delete = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then(result => {
      res.json({ message: `Blog is deleted. ID - ${result}` });
    })
    .catch(err => {
      console.log(err);
    });
}

module.exports = {
  blogs_all,
  blogs_user_get,
  blog_details, 
  blog_create_post, 
  blog_delete
}