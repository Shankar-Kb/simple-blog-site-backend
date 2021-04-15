const User = require("../models/User");
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };

  // incorrect email
  if (err.message === 'incorrect email') {
    errors.email = 'That email is not registered';
  }

  // incorrect password
  if (err.message === 'incorrect password') {
    errors.password = 'That password is incorrect';
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: maxAge });
};


module.exports.signup_post = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const user = await User.create({ name, email, password, role });
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, sameSite: 'Lax', maxAge: maxAge * 1000 });
    res.status(201).json({ userEmail: user.email });
  }
  catch(err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
 
}

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, sameSite: 'Lax', maxAge: maxAge * 1000 });
    res.status(200).json({ userEmail: user.email, userId: user._id, userName: user.name, userRole: user.role});
  } 
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }

}

module.exports.logout_get = (req, res) => {
  //res.cookie('jwt', '', { maxAge: 1 });
  //res.status(200).json({ message: "You are logged out!"});
  res.status(202).clearCookie('jwt').send("You are logged out!");
}

module.exports.users_all = (req, res) => {
  User.find({ role: 'basic' }, { email: 1, name: 1, _id: 1}).sort({ email: 1 })
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      console.log(err);
    });
}

module.exports.user_edit = (req, res) => {
  const id = req.params.id;
  const body = {
    name: req.body.name,
    email: req.body.email
  }
  User.findOneAndUpdate( {_id: id}, body)
    .then(result => {
      res.json({ message: `User is updated. ID - ${result}` });
    })
    .catch(err => {
      console.log(err);
    });
}

module.exports.user_delete = (req, res) => {
  const id = req.params.id;
  User.findByIdAndDelete(id)
    .then(result => {
      res.json({ message: `User is deleted. ID - ${result}` });
    })
    .catch(err => {
      console.log(err);
    });
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
  }
})

const mailData = {
  from: process.env.EMAIL,
  subject: "Reset your password"
}

const mailMessage = (url) => {
  return (
      `<p>Please click the clink below to reset and change your password.<br />
        If the request was not made by you, kindle delete this mail.<br />
          <a href='${url}' target='_blank'>${url}</a><br />
       </p>`
  );
}

module.exports.check_email = (req, res) => {

  User.findOne({ email: req.body.email }, { email: 1 })
    .then(result => {
      
      if(result){
        
        const token = createToken(result._id);
        const clientFinalUrl = `${process.env.CLIENT_URL}/reset-password/${token}`;
        mailData.to = result.email;
        mailData.html = mailMessage(clientFinalUrl);
        transporter.sendMail(mailData)
            .then(result => {
              res.json({message: "A password reset mail has been sent to your registered email address"});
            })
            .catch(error => console.log(error));
      }
      else{
        res.json({error: "The email does not exist"});
      }
    })
    .catch(err => {
      console.log(err);
    });
}