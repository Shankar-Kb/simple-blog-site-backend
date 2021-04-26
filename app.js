const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');
const commentRoutes = require('./routes/commentRoutes');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const app = express();

// middleware
//app.use(express.static('public'));
app.use(express.json());
//app.use(cors({credentials: true, origin:"http://localhost:3000"}));
//app.use(cors({credentials: true, origin:"https://simple-blog-site-frontend.netlify.app"}));
const allowedDomains = ['https://simple-blog-site-frontend.netlify.app', 'http://localhost:3000'];
app.use(cors({
  credentials: true,
  origin: function (origin, callback) {
    // bypass the requests with no origin (like curl requests, mobile apps, etc )
    if (!origin) return callback(null, true);
 
    if (allowedDomains.indexOf(origin) === -1) {
      var msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURL = process.env.DB_URL;
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true, useFindAndModify: false })
  .then((result) => app.listen(process.env.PORT || 3001))
  .catch((err) => console.log(err));

// routes
app.use(userRoutes);
app.use(blogRoutes);
app.use(commentRoutes);