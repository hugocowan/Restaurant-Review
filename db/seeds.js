const mongoose  = require('mongoose');
mongoose.Promise = require('bluebird');


const { databaseURI } = require('../config/environment');
mongoose.connect(databaseURI);

const Restaurant = require('../models/restaurant');

Restaurant.collection.drop();


Restaurant.create({
  url: 'https://media-cdn.tripadvisor.com/media/photo-s/02/63/11/43/the-norman-knight.jpg',
  name: 'The Norman Knight',
  location: 'Ascott Road, Whichford, Nr Shipston-on-Stour, CV36 5PE, United Kingdom',
  phone: '01608 684 621',
  email: 'info@thenormanknight.co.uk',
  website: 'http://www.thenormanknight.co.uk/',
  food: ['Bar', ' British', ' Pub', ' Vegetarian Friendly', ' Gluten Free Options'],
  reviews: [{
    title: 'Worst restaurant EVER',
    rating: 2,
    comments: 'TERRIBLE FOOD AND WORSE SERVICE. THE PORK CHOPS WERE NICE THOUGH.'
  }]
})

  .catch(err => console.log(err))
  .finally(()=> mongoose.connection.close());
