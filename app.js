const express = require('express');
const app = express();
const static = express.static(__dirname + '/public');

const configRoutes = require('./routes');
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');

const cookieParser = require('cookie-parser');
const session = require('express-session');
const uuid = require('uuid/v4')

const handlebarsInstance = exphbs.create({
  defaultLayout: 'main',
  extname: '.hbs',
  // Specify helpers which are only registered on this instance.
  helpers: {
    asJSON: (obj, spacing) => {
      if (typeof spacing === 'number') return new Handlebars.SafeString(JSON.stringify(obj, null, spacing));

      return new Handlebars.SafeString(JSON.stringify(obj));
    }
  }
});

const rewriteUnsupportedBrowserMethods = (req, res, next) => {
  // If the user posts to the server with a property called _method, rewrite the request's method
  // To be that method; so if they post _method=PUT you can now allow browsers to POST to a route that gets
  // rewritten in this middleware to a PUT route
  if (req.body && req.body._method) {
    req.method = req.body._method;
    delete req.body._method;
  }

  // let the next middleware run:
  next();
};

app.use(session({
  name: "AuthCookie",
  secret: "some secret string!",
  resave: false,
  saveUninitialized: true,
  genid: function(req) {
    // console.log("Generating genid inside session middleware:", req.sessionID);
    return uuid();
  }
}));

app.use(cookieParser());

app.use('/public', static);
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(rewriteUnsupportedBrowserMethods);

app.engine('hbs', handlebarsInstance.engine);
//app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

// Deny access to /private path if no cookie
app.use('/private', function(req, res, next) {

  if (req.session.auth) {
    next();
  } else {
    console.log("Someone is trying to get access to /private! We're stopping them!");
    res.sendStatus(403);
  };

});

// Track and log every request made
app.use(function(req, res, next) {
  // console.log("1st middleware log requests, req.cookies =", req.cookies)

  let userAuth = "";

  if (req.session.auth) {
    userAuth = "Authenticated User";
  } else {
    userAuth = "Non-Authenticated User";
  }
  console.log(`[${new Date().toUTCString()}]: ${req.method} ${req.originalUrl} (${userAuth})`);
  next();
});

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000\n');
});