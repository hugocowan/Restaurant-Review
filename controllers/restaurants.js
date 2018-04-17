//This is the controller for restaurants and reviews.

const Restaurant = require('../models/restaurant');

function restaurantsIndex(req, res){
  Restaurant
    .find()
    .populate('user reviews.user')//This populates the user key in both the main object and under the key reviews.
    .exec()
    .then(object=>{
      res.render('pages/restaurants', {object});
    });
}

function restaurantsShow(req, res){
  Restaurant
    .findById(req.params.id)//This takes the value specified in the section of the given url :id.
    // .populate('photos') //this takes the array of photo ids and turns each one into a document.
    .populate('user reviews.user')
    .exec()
    .then(restaurant => {
      // console.log('restaurant ',restaurant);
      res.render('pages/show', {restaurant});
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
      // console.log('restaurant/Review---->',restaurant.reviews);
      return restaurant.save();
    })
    .then(restaurant => res.redirect(`/restaurants/${restaurant.id}`))
    .catch((err)=>{
      console.log('HERE err: ', err);
      if(err.name === 'ValidationError'){
        return res.badRequest('/restaurants', err.toString());
      }
    });
}

function reviewsEdit(req, res){
  Restaurant
    .findById(req.params.id)
    .populate('reviews')
    .exec()
    .then(object =>{
      res.locals.review = req.params.reviewId;
      res.render('pages/edit-review', {object});
    });
}

function reviewsUpdate(req, res){
  Restaurant
    .findById(req.params.id)
    .exec()
    .then(restaurant => {
      // console.log('HERE ONE', restaurant);
      Object.assign(restaurant.reviews.id(req.params.reviewId), req.body);
      restaurant.save();
      // console.log(restaurant, review);
      res.redirect(`/restaurants/${restaurant._id}`);
    });
}

function reviewsDelete(req, res){
  Restaurant
    .findById(req.params.id)
    .exec()
    .then(object=>{
      const review = object.reviews.id(req.params.reviewId);
      // console.log('Here\'s the object: ',object);
      review.remove();//This deletes all reviews. I want it to delete just one.
      return object.save();
    })
    .then((object)=>res.redirect(`/restaurants/${object._id}`));
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
