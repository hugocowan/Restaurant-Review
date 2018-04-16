//This is the controller for reviews.

const Review = require('../models/review');
const Restaurant = require('../models/restaurant');

function reviewsIndex(req, res){
  Review
    .find()
    .populate('user')
    .populate('restaurant')
    .exec()
    .then(object=>{
      res.render('pages/reviews', {object});
    });
}

function reviewsShow(req, res){
  Review
    .findById(req.params.id)
    // .populate('photos') //this takes the array of photo ids and turns each one into a document.
    .populate('user')
    // .populate('restaurant')
    .exec()
    .then(function (object){
      console.log('object: ',object);
      res.render('pages/show-review', {object});
    });
}

function reviewsNew(req, res){
  Restaurant
    .find()
    .exec()
    .then(object=>{
      res.render('pages/new-review', {object ,err: null});
    });
}

function reviewsCreate(req, res){
  req.body.user = req.currentUser;
  // console.log(req.body);
  Review
    .create(req.body)//This is creating a database entry containing the form info(req.body).
    .then(()=> res.redirect('/reviews'))
    .catch(err=>{
      if(err.name === 'ValidationError'){
        return res.badRequest('/reviews/new', err.toString());
      }
    });
}

function reviewsEdit(req, res){
  Review
    .findById(req.params.id)
    // .populate('photos') //this takes the array of photo ids and turns each one into a document.
    .exec()
    .then(object => res.render('pages/edit-review', {object}));
}

function reviewsUpdate(req, res){
  Review
    .findById(req.params.id)
    .exec()
    .then(object => {
      object= Object.assign(object, req.body);
      return object.save();
    })
    .then(object => res.redirect(`/reviews/${object._id}`));
}

function reviewsDelete(req, res){
  Review
    .findById(req.params.id)
    .exec()
    .then(object=>object.remove())
    .then(()=>res.redirect('/reviews'));
}

module.exports = {
  index: reviewsIndex,
  show: reviewsShow,
  delete: reviewsDelete,
  new: reviewsNew,
  create: reviewsCreate,
  edit: reviewsEdit,
  update: reviewsUpdate
};
