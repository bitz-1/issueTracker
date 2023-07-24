const express = require('express');
const db = require('mongoose');
const app = express();
const port = 3000 || process.env.PORT; 
const expressLayouts = require('express-ejs-layouts');


//const path = require('path');

app.use(express.urlencoded());
app.use(express.static('./assets'));
app.use(expressLayouts);

// styles and scripts extract from sub pages into layouts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// set up the view engine

app.set('view engine','ejs');
app.set('views','./views');

//middlewareAPI




// use express router 
app.use('/', require('./routes'));
app.listen( port , function(err){
    if (err){
        console.log(`ERROR IN RUNNING THE SERVER : ${err}`);
    } 
    console.log(`SERVER IS RUNNING ON PORT : ${port}`);
})
