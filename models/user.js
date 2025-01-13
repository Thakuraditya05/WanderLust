const { string } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({// ab apna user scehem define krne ki baat aati hai to user scema define krte hai 
    email: {
        type:String,
        required:true,//yani honi hi honi chahiye nahi to error aayega storing ke samaye 
    },
    // name:String,// we cann add both of these feilds but there is plugins exists wich automatially stores ussername 
    // password:      //we cann add both of these feilds but there is plugins exists wich automatially stores ussername and hashed password

//You're free to define your User how you like. Passport-Local Mongoose will add a username, "hash" and "salt" field to store the username, the hashed password and the salt value.
// jb database ke liye actual schema create hoga to usme automatically usersname and password store hoo jayega 

});
  userSchema.plugin(passportLocalMongoose);// yahi hai wo plugin jisse automatically username password fiedl create kr dega hasging bhi and salting bhi
//passportLocalMongoose---> ye hamre liye kuch method bhi hai jinhe ye add kr dega "Additionally, Passport-Local Mongoose adds some methods to your Schema. See the API Documentation section for more details."
//Instance methods (user object usinng model(class))--->"Static methods inbuilt provide krta hai, authenticate(password, [cb])---> ue authentication ke liye help krta hai  " 
module.exports = mongoose.model('User', userSchema);


