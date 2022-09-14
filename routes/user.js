const express = require('express');
const router = express.Router();
const userController = require('../controller/users_controller');
const passport = require('passport');

router.post('/create-session',passport.authenticate('local', {failureRedirect : '/'}), userController.createSession)

router.post('/update/:id', passport.checkAuthentication,userController.update);


module.exports = router;












// app.post('/user/create-session', function(req,res){
//     console.log(req.body.email);
//     console.log(req.body.password);

//     return res.render('profile');

// });

// app.get('/', function(req,res){
//     return res.render('home',{
//         title: 'Assignment || Home'
//     });
// });