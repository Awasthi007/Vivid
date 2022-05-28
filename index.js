const express = require('express');
const port = 8000;


const app = express();


// telling use express router
app.use('/', require('./routes/index'));

app.listen(port, function(error){
    if(error){
        console.log(`Error : ${error}`);
        return;
    }
    console.log(`server is up and running on port ${port}`);  // used backticks used for the string interpolation
});