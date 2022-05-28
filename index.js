const express = require('express');
const port = 8000;


const app = express();


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