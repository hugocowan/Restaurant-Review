//This is the controller for restaurants and reviews.

const Restaurant = require('../models/restaurant');

function restaurantsIndex(req, res){
  Restaurant
    .find()
    .populate('user reviews.user')
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
    .populate('review')
    .exec()
    .then(function (object){
      // console.log('object: ',object);
      res.render('pages/show', {object});
    });
}

function restaurantsNew(req, res){
  res.render('pages/new', {err: null});
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

function reviewsCreate(req, res){
  req.body.user = req.currentUser;
  // console.log(req.body);
  Restaurant
    .findById(req.params.id)
    .exec()
    .then((restaurant)=> {
      restaurant.reviews.push(req.body);
      console.log('restaurant/Review---->',restaurant.reviews);
      return restaurant.save();
    })
    .then(restaurant => res.redirect(`/restaurants/${restaurant.id}`))
    .catch(err => console.log(err));
}

function reviewsEdit(req, res){
  Restaurant
    .findById(req.params.id)
    // .populate('photos') //this takes the array of photo ids and turns each one into a document.
    .exec()
    .then(object => res.render('pages/edit-review', {object}));
}

function reviewsUpdate(req, res){
  Restaurant
    .findById(req.params.id)
    .exec()
    .then(object => {
      object= Object.assign(object, req.body);
      return object.save();
    })
    .then(object => res.redirect(`/reviews/${object._id}`));
}

function reviewsDelete(req, res){
  Restaurant
    .findById(req.params.id)
    .exec()
    .then(object=>object.remove())
    .then(()=>res.redirect('/reviews'));
}

module.exports = {
  index: restaurantsIndex,
  show: restaurantsShow,
  delete: restaurantsDelete,
  new: restaurantsNew,
  create: restaurantsCreate,
  edit: restaurantsEdit,
  update: restaurantsUpdate,
  reviewsDelete: reviewsDelete,
  reviewsCreate: reviewsCreate,
  reviewsEdit: reviewsEdit,
  reviewsUpdate: reviewsUpdate
};
