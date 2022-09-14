const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/Enuke_Assignment');

const db = mongoose.connection;

db.on('error', console.error.bind(console,'Error: connecting to Db'));

db.once('open', function(){
    console.log('Successfully Connected to DB');
});



module.exports = db;