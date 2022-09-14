const express = require('express');
const port = 1500;
const app = express();
const path = require('path');
const body_parser = require('body-parser');
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
const { Cookie } = require('express-session');

app.use(body_parser.urlencoded({extended : false}));
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));

app.use(session({
    name:'Enuke_Assignment',
    secret:'vbjdkcjksl',
    saveUninitialized:false,
    resave:false,
    cookie : {
        maxAge : (1000*60*1000)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost/Enuke_Assignment',
        autoRemove : 'disabled'
      },
      function(err){
        console.log(err||'setup is ok');
        }   
    )
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use('/', require('./routes/index'));



app.listen(port, function(err){
    if(err){
        console.log('Error while starting the server',err);
    }
    console.log("server is running on:", port);
});

