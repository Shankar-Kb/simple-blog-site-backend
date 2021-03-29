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
app.use(cors({credentials: true, origin:"http://localhost:3000"}));
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