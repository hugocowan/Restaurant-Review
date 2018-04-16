const mongoose  = require('mongoose');
mongoose.Promise = require('bluebird');


const { databaseURI } = require('../config/environment');
mongoose.connect(databaseURI);

const Restaurant = require('../models/restaurant');
const Review = require('../models/review');

Restaurant.collection.drop();
Review.collection.drop();


Restaurant.create({
  name: 'The Norman Knight',
  location: 'Ascott Road, Whichford, Nr Shipston-on-Stour, CV36 5PE, United Kingdom',
  phone: '01608 684 621',
  email: 'info@thenormanknight.co.uk',
  website: 'http://www.thenormanknight.co.uk/',
  food: ['Bar', ' British', ' Pub', ' Vegetarian Friendly', ' Gluten Free Options']
  // photos: photos.map(photo => photo._id)
})
  .then((restaurant)=>{
    return Review.create({
      title: 'Worst restaurant EVER',
      rating: 2,
      comments: 'TERRIBLE FOOD AND WORSE SERVICE. THE PORK CHOPS WERE NICE THOUGH.',
      restaurant: restaurant
    });
  })

  .catch(err => console.log(err))
  .finally(()=> mongoose.connection.close());
