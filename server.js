const express             = require('express');
const app                 = express();
const bodyParser          = require('body-parser'); //Gives access to the parameters req and res. Can now be used in functions..?
const methodOverride      = require('method-override');
const morgan              = require('morgan');
const expressLayouts      = require('express-ejs-layouts');
const mongoose            = require('mongoose');
const flash               = require('express-flash');//Flash saves errors to the locals object, the same object the controller uses to pass arguments to .ejs files.
const session             = require('express-session'); //Required by flash. Links the client and the server. Makes a file on the user with encrypted properties, decrypted by the key 'secret'. It's a cookie.
const User                = require('./models/user');
const {port, databaseURI} = require('./config/environment');
const customResponses     = require('./lib/customResponses');
mongoose.Promise = require('bluebird');

// The above is the same as doing:
// const port = require('./config/environment').port;
// const databaseURI = require('./config/environment').databaseURI;
const routes              = require('./config/routes');


mongoose.connect(databaseURI);

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

//Adding middleware to the app. It feeds req and res to the functions within these middlewares.
app.use(express.static(`${__dirname}/public`));
app.use(morgan('dev'));
app.use(expressLayouts);
app.use(bodyParser.urlencoded({extended: true}));
//for internet explorer compatibility.
app.use(methodOverride(req=>{
  if(req.body && typeof req.body === 'object' && '_method' in req.body){
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use(session({
  secret: process.env.SESSION_SECRET || 'hugs',
  resave: false,
  saveUninitialized: false
}));

app.use(flash());//middleware that allows something to be run once then wiped from memory
app.use(customResponses);

//To make a cookie for the user.
app.use((req, res, next) =>{
  if(!req.session.userId) return next();

  User
    .findById(req.session.userId)
    .then((user) =>{
      req.session.userId = user._id;
      res.locals.user = user;
      req.currentUser = user;
      res.locals.isLoggedIn = true;
      next();
    });


});

app.use(routes);

//If an extension that is not known by express is used, express will not be able to set err.status, so it will be false.
//This makes sure that if err.status or err.message is false, it will show a safe error response.
app.use((err, req, res, next)=>{
  console.log('FATAL ERROR');
  if(err){
    err.status = err.status || 500;
    err.message = err.message || 'Internal Server Error';
    res.status(err.status);
    //transferring the error log to be used in the view:
    res.locals.err = err;
    //render looks in the folder views by default.
    return res.render(`statics/${err.status}`);
  }
  next();
});

app.listen(port, () => console.log(`Running on port${port}`));
