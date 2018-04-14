const User = require('../models/user');

function indexRoute(req, res) {
  User
    .find()
    .exec()
    .then((users) => res.render('pages/home', { users }));
}

function privateRoute(req,res){
  res.render('private');
}

module.exports = {
  index: indexRoute,
  private: privateRoute
};
