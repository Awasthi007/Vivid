const express = require('express');
const env = require('./config/environment');
const logger = require('morgan')
const path = require('path');


// for creating and altering -- dealing with the cookies

const cookieParser = require('cookie-parser');
const port = 8000;
const expressLayouts = require('express-ejs-layouts');

const app = express();
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');

const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMiddleware = require('./config/middleware');

// setup the chat server to be used with socket.io
// setup the chat server to be used with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listening on port 5000');


if(env.name == 'development'){
    app.use(sassMiddleware({
        src: path.join(__dirname, env.asset_path, 'scss'),
        dest: path.join(__dirname, env.asset_path, 'css'),
        debug: true,
        outputStyle: 'extended',
        prefix: '/css'
    }));
}
    
    



// body parser for dealing with input data
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

app.use(cookieParser());

// make the upload path available path to browser
app.use('/uploads', express.static(path.join(__dirname + '/uploads')));

// using logger to keep all the logs that are console logs into single file
app.use(logger(env.morgan.mode, env.morgan.options));
// instruct to use express layouts
app.use(expressLayouts);


// extract style and scripts from subpages
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


app.use(express.static('assets'));


// setting the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'Vivid',
    // todo:- change the secret before deployment
    secret: env.session_cookie_key,
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

app.use(flash());
app.use(customMiddleware.setflash);



// telling use express router
app.use('/', require('./routes/index'));


app.listen(port, function(error){
    if(error){
        console.log(`Error : ${error}`);
        return;
    }
    console.log(`server is up and running on port ${port}`);  // used backticks used for the string interpolation
});