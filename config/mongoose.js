const mongoose = require('mongoose');
const url = 'mongodb://127.0.0.1/issuetrackerDev';

//mongoose.connect('url)

mongoose.connect(url);

const db=mongoose.connection

db.on('error',console.error.bind(console,"Error connecting to mongoDB"));

db.once('open', ()=>{
    console.log('connected to datatbase :: MongoDB')
});

module.exports=db; 