const express = require('express');

// for creating and altering -- dealing with the cookies

const cookieParser = require('cookie-parser');
const port = 8000;
const expressLayouts = require('express-ejs-layouts');

const app = express();
const db = require('./config/mongoose');

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
// telling use express router
app.use('/', require('./routes/index'));

// setting the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, function(error){
    if(error){
        console.log(`Error : ${error}`);
        return;
    }
    console.log(`server is up and running on port ${port}`);  // used backticks used for the string interpolation
});