const router = require('express').Router();

const statics = require('../controllers/statics');
const restaurants = require('../controllers/restaurants');
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');

//To make sure user is logged in before more routing happens
function secureRoute(req, res, next){
  if(!req.session.userId){
    return req.session.regenerate(() =>{
      req.flash('danger', 'You must be logged in');
      res.redirect('/');
    });
  }

  return next();
}

router.get('/', (req, res)=>{
  res.redirect('/restaurants');
});

//private
router.route('/private')
  .get(secureRoute, statics.private);//static.private calls the privateRoute function in the controller static.js.
//end private


//restaurants
router.route('/restaurants')
  .get(restaurants.index)
  .post(restaurants.create);

router.route('/restaurants/new')
  .get(secureRoute, restaurants.new);

router.route('/restaurants/:id')
  .get(restaurants.show)
  .delete(secureRoute, restaurants.delete)
  .put(restaurants.update);

router.route('/restaurants/:id/edit')
  .get(secureRoute, restaurants.edit)
  .delete(secureRoute, restaurants.delete);
//end resource restaurants


//reviews
router.post('/restaurants/:id/reviews', secureRoute, restaurants.reviewsCreate);

router.route('/restaurants/:id/reviews/:reviewId')
  .delete(secureRoute, restaurants.reviewsDelete)
  .put(secureRoute, restaurants.reviewsUpdate);

router.get('/restaurants/:id/reviews/:reviewId/edit', secureRoute, restaurants.reviewsEdit);
//end resource reviews


//authentication
router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.route('/logout')
  .get(sessions.delete);
//end authentication

router.route('/*').get((req, res)=>{
  //To redirect false urls to the homepage:
  req.flash('danger', 'THE URL REQUESTED DOESN\'T EXIST');
  res.redirect('/');

  //Alternatively, to show a 404 error:
  // res.render('statics/404');
});

module.exports = router;
