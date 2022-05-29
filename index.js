const express = require('express');

// for creating and altering -- dealing with the cookies

const cookieParser = require('cookie-parser');
const port = 8000;
const expressLayouts = require('express-ejs-layouts');

const app = express();
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));

// body parser for dealing with input data
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

app.use(cookieParser());



// instruct to use express layouts
app.use(expressLayouts);


// extract style and scripts from subpages
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


app.use(express.static('./assets'));


// setting the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'Vivid',
    // todo:- change the secret before deployment
    secret: 'shashank',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000*60*100)
    },
    store : MongoStore.create({
        mongoUrl: 'mongodb://localhost/vivid_development',
        autoRemove: 'disabled'
}, function(err){
    console.log(err || 'connect-mongodb setup');
})
}));


app.use(passport.initialize());  // app to use passport
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// telling use express router
app.use('/', require('./routes/index'));


app.listen(port, function(error){
    if(error){
        console.log(`Error : ${error}`);
        return;
    }
    console.log(`server is up and running on port ${port}`);  // used backticks used for the string interpolation
});