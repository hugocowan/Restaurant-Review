const mongoose  = require('mongoose');
mongoose.Promise = require('bluebird');


const { databaseURI } = require('../config/environment');
mongoose.connect(databaseURI);

const Restaurant = require('../models/restaurant');

Restaurant.collection.drop();


Restaurant.create({
  url: 'https://static.panoramio.com.storage.googleapis.com/photos/large/52185779.jpg',
  name: 'The Norman Knight',
  location: 'Ascott Road, Whichford, Nr Shipston-on-Stour, CV36 5PE, United Kingdom',
  phone: '01608 684 621',
  website: 'http://www.thenormanknight.co.uk/',
  food: ['Bar', ' British', ' Pub', ' Vegetarian Friendly', ' Gluten Free Options'],
  reviews: [{
    title: 'Worst restaurant EVER',
    rating: 2,
    comments: 'terrible food and worse service. The pork chops were nice though.',
    user: '5ad239fe5ecaf68ba50055ff'
  }]
})
  .then(Restaurant.create({
    url: 'https://www.mappihour.com/wp-content/uploads/2016/10/12670068_767866513344119_8485606011531778745_n.jpg',
    name: 'Barrio Shoreditch',
    location: '141-143 Shoreditch High Street | E1 6JE, London E1 6JE, England',
    phone: '+44 20 7749 3940',
    website: 'http://www.barriobars.com/shoreditch',
    food: ['Bar', ' Latin'],
    reviews: [{
      title: 'Pretty drinks, pretty lights, 10/10.',
      rating: 5,
      comments: 'Had a great time with my friends.',
      user: '5ad73409d6b194ba73a720f2'
    }]
  }))
  .then(Restaurant.create({
    url: 'https://www.theworlds50best.com/filestore/jpg/THECLOVECLUB_WORLD_2017_INTERIOR.jpg',
    name: 'The Clove Club',
    location: 'Shoreditch Town Hall 380 Old Street | 380 Old Street, London EC1V 9LT, England',
    phone: '+44 20 7729 6496',
    website: 'http://www.barriobars.com/shoreditch',
    food: ['European', ' British', ' Vegetarian Friendly', ' Vegan Options', ' Gluten Free Options'],
    reviews: [{
      title: 'High class dining with delicious food. A bit drafty.',
      rating: 2,
      comments: 'Their courses were excellent. Many different dishes were served to us and cooked to perfection. And small enough to be enjoyed! Unfortunately, when we complained of a draft near our table, nothing was done. I shall never return.',
      user: '5ad7348a8273f4ba804998f4'
    },{
      title: 'The best meal I\'ve ever had',
      rating: 5,
      comments: 'Truly excellent presentation, delivery and service. My husband walked out .',
      user: '5ad734c1157f01ba8f70afbb'
    }]
  }))
  .then(Restaurant.create({
    url: 'https://londontheinside.com/wp-content/uploads/2016/03/CTC-LOTI.jpg',
    name: 'The Cocktail Trading Company',
    location: ' 68 Bethnal Green Road, London W1F 7HU, England',
    phone: '+44 20 7427 6097',
    website: 'http://www.thecocktailtradingco.co.uk/',
    food: ['Bar', ' Latin'],
    reviews: [{
      title: 'A great place for a drink.',
      rating: 5,
      comments: 'The food is good too!',
      user: '5ad734e6cb92c7ba94fef187'
    }]
  }))
  .then(Restaurant.create({
    url: 'https://i.pinimg.com/originals/e6/ec/93/e6ec93cdc53f82533ac2cf2b41501998.jpg',
    name: 'Squat \'N\' Gobble II',
    location: '1428 Haight St, San Francisco, CA 94117-2911',
    phone: '+1 415-864-8484',
    website: 'http://squatandgobble.com/',
    food: ['Bar', ' Grill'],
    reviews: [{
      title: 'Finest dining experience of my career.',
      rating: 2,
      comments: 'I have been reviewing restaurants for 76 years, and not once have I had such a meal. Truly, truly incredible. Heaven has come to Earth as a bar and grill restaurant.',
      user: '5ad239fe5ecaf68ba50055ff'
    }],
    user: '5ad239fe5ecaf68ba50055ff'
  }))

  .catch(err => console.log(err))
  .finally(()=> mongoose.connection.close());
