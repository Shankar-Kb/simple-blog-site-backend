const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const app = express();

// middleware
//app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURL = process.env.DB_URL;
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(process.env.PORT || 3001))
  .catch((err) => console.log(err));

app.get('/set-cookies', (req, res)=>{
    res.cookie("loggedIn", true);
    res.send("You got the cookie!")
})

// routes
app.use(userRoutes);
app.use(blogRoutes);