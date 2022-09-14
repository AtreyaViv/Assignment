const User = require('../models/User');
const fs = require('fs');
const path = require('path');

module.exports.createSession = async function(req,res){
    let user = await User.findById(req.user);
    console.log(user);
    return res.render('profile', {
        locals : {
         profile_user : user
        }
    });
}
 
module.exports.update = async function(req, res){
    try {
        let user = await User.findByIdAndUpdate(req.params.id);
        User.uploadedAvatar(req,res, function(err){
           if(err){
              console.log('****Multer error***', err);
           }
           console.log(req.file);

           user.name = req.body.name;
           user.email = req.body.email;

           if(req.file){

            if(user.avatar){
               fs.unlinkSync(path.join(__dirname,'..',user.avatar));
            }
            //this is saving the path of uploaded file into the avatar field in user
            user.avatar = User.avatarPath + '/' + req.file.filename;
         }

         user.save();
         return res.render('profile', {
            locals : {
             profile_user : user
            }
        });
      });
   }catch (error) {
      return res.redirect('back');
}
}