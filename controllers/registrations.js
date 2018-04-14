const User = require('../models/user');

function newRoute(req, res) {
  res.render('auth/register');
}

function createRoute(req, res){
  // console.log('this is req:', req);
  User
    .create(req.body)//This line saves the username, email and password that has been passed through as req, and .
    .then(()=>{
      res.redirect('/');
    })
    .catch((err)=>{
      if(err.name === 'ValidationError'){
        return res.status(400).render('auth/register', {message: err.toString()});
      }
    });
}

module.exports = {
  new: newRoute,
  create: createRoute
};
