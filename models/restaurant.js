const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  title: String,
  rating: {type: Number, min: 1, max: 5, default: 3},
  comments: {type: String},
  restaurant: {type: mongoose.Schema.ObjectId, ref: 'Restaurant'},
  user: {type: mongoose.Schema.ObjectId, ref: 'User'}
});

const restaurantSchema = new mongoose.Schema({
  url: String,
  name: {type: String, required: true},
  location: String,
  phone: String,
  email: String,
  website: String,
  food: [{type: String}],
  // photos: [{type: mongoose.Schema.ObjectId, ref: 'Photo'}],
  user: {type: mongoose.Schema.ObjectId, ref: 'User'},
  reviews: [reviewSchema]
});

restaurantSchema
  .virtual('avgRating')//stores a temporary value in RAM that calls the function.
  .get(function getAvgRating() {
    if(this.reviews.length === 0) return false;
    const total = this.reviews.reduce((sum, reviews) => {
      return sum + reviews.rating;
    }, 0);
    const avg = total / this.reviews.length;
    return Math.round(avg*2)/2;
  });

restaurantSchema.methods.getStarIcons = function() {
  console.log('here');
  let stars = '';
  for(let i = 0; i<Math.floor(this.avgRating); i++) {
    stars += '<i class="fa fa-star"></i> ';
  }
  if(this.avgRating % 1 > 0) stars += '<i class="fa fa-star-half"></i>';
  return stars;
};

module.exports = mongoose.model('Restaurant', restaurantSchema);
