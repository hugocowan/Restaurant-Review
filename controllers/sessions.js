const User = require('../models/user');

function newRoute(req, res) {
  res.render('auth/login', {name: 'Hugo'});//This attaches to local - local.name = 'Rane', so it can be accessed in .ejs files.
}

function createRoute(req, res) {
  User
    .findOne({email: req.body.email})
    .then((user)=>{
      // console.log(user);
      if(!user || !user.validatePassword(req.body.password)){
        res.status(401).render('auth/login', {message: 'Wrong credentials'});
      }
      req.session.userId = user.id;//Save user's specific id in session.userId.
      // console.log(req.session);
      res.redirect('/');
    });
}

function deleteRoute(req, res){
  return req.session.regenerate(()=> res.redirect('/'));
}

module.exports = {
  new: newRoute,
  create: createRoute,
  delete: deleteRoute
};
