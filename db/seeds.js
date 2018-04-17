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
    comments: 'TERRIBLE FOOD AND WORSE SERVICE. THE PORK CHOPS WERE NICE THOUGH.',
    user: '5ad239fe5ecaf68ba50055ff'
  }]
});
Restaurant.create({
  url: 'https://i.pinimg.com/originals/e6/ec/93/e6ec93cdc53f82533ac2cf2b41501998.jpg',
  name: 'Squat \'N\' Gobble II',
  location: '1428 Haight St, San Francisco, CA 94117-2911',
  phone: '+1 415-864-8484',
  email: '',
  website: 'http://squatandgobble.com/',
  food: ['Bar', ' Grill'],
  reviews: [{
    title: 'Finest dining experience of my career.',
    rating: 2,
    comments: 'I have been reviewing restaurants for 76 years, and not once have I had such a meal. Truly, truly incredible. Heaven has come to Earth as a bar and grill restaurant.',
    user: '5ad239fe5ecaf68ba50055ff'
  }],
  user: '5ad239fe5ecaf68ba50055ff'
})

  .catch(err => console.log(err))
  .finally(()=> mongoose.connection.close());
