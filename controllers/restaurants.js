//This is the controller for restaurants.

const Restaurant = require('../models/restaurant');

function restaurantsIndex(req, res){
  Restaurant
    .find()
    .populate('user')
    .exec()
    .then(object=>{
      res.render('pages/restaurants', {object});
    });
}

function restaurantsShow(req, res){
  Restaurant
    .findById(req.params.id)
    // .populate('photos') //this takes the array of photo ids and turns each one into a document.
    .populate('user')
    .exec()
    .then(function (object){
      // console.log('object: ',object);
      res.render('pages/show-restaurant', {object});
    });
}

function restaurantsNew(req, res){
  res.render('pages/new-restaurant', {err: null});
}

function restaurantsCreate(req, res){
  req.body.user = req.currentUser;
  // console.log(req.body);
  Restaurant
    .create(req.body)//This is creating a database entry containing the form info(req.body).
    .then(()=> res.redirect('/restaurants'))
    .catch(err=>{
      if(err.name === 'ValidationError'){
        return res.badRequest('/restaurants/new', err.toString());
      }
    });
}

function restaurantsEdit(req, res){
  Restaurant
    .findById(req.params.id)
    // .populate('photos') //this takes the array of photo ids and turns each one into a document.
    .exec()
    .then(object => res.render('pages/edit-restaurant', {object}));
}

function restaurantsUpdate(req, res){
  Restaurant
    .findById(req.params.id)
    .exec()
    .then(object => {
      object= Object.assign(object, req.body);
      return object.save();
    })
    .then(object => res.redirect(`/restaurants/${object._id}`));
}

function restaurantsDelete(req, res){
  Restaurant
    .findById(req.params.id)
    .exec()
    .then(object=>object.remove())
    .then(()=>res.redirect('/restaurants'));
}

module.exports = {
  index: restaurantsIndex,
  show: restaurantsShow,
  delete: restaurantsDelete,
  new: restaurantsNew,
  create: restaurantsCreate,
  edit: restaurantsEdit,
  update: restaurantsUpdate
};
