const Listing=require("./models/listing.js");//
 const express = require("express");
 const Review=require("./models/review.js");

 // const { route } = require("../classroom/routes/user");
 // const router = express.Router();
  
 

 const ExpressError=require("./utils/ExpressError.js");//
 const {ListingSchema, reviewSchema}=require("./schema.js"); // 2nd step for serverside validation //

 


module.exports.isLoggedIn=(req,res,next)=>{
    // console.log(req);// isske under bahut sari info stored hai jaise(session se releted, )    keva issi ki help se ye posssible hai ki agar jis page pe login ya sign up de rahe hai then sign up and login dene ke ussi page pe rediirect ho na ki "/listings"
    // console.log(req.path,"...",req.originalUrl);//---->/new , ..."   /listings/new ---> ye wala wahi url hai jaha login and signup dene ke baad rahena chahte hai 
    if(!req.isAuthenticated()){//--> checks given bnda authenticated or not
        // authenticated nahi hoga tabhim redirect karenge "/login pe " or jaise hi login dega 
        req.session.redirectUrl=req.originalUrl;// isse wo ye hoga ki req.session.redirectUrl ke under "req.originalUrl" info saved ho jayegi 
        req.flash("error","you must be logged in to create listings");//
        return res.redirect("/login");

    
    }
    next();//--> agar user authenticated hai to next ko call kr do
}



//  reqest .locals ke under store kara deta hai kyo locas hrr jagah accessable hote hai 
module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){//--> checks if req.session.redirectUrl ke under kuch save hua hai ki nahi 
       res.locals.redirectUrl= req.session.redirectUrl;
    }
    next();//-->to next ko call kr do
}
//saveRedirectUrl ko call krne ki jarurat padegi 
// "/login" ke under passport jaise hi authenthicate kr raha hai use just pahle uska jo url(req.originalUrl) hai wo save karana padega 
// jaise hi login krwa rahe hai waise hi "/login" route pe waise hi  "saveRedirectUrl" ki help se req.session.redirectUrl me value store ho jayegi 

module.exports.isOwner=async (req,res,next)=>{
        let {id}=req.params;
        let listing=await Listing.findById(id);
        if(!listing.owner.equals(res.locals.currUser._id)){
            req.flash("error","  you are not the owner of listing ");//adding flash to the list;
           return  res.redirect(`/listings/${id}`);
        }

        next();//-->to next ko call kr do
}
module.exports.validateListing=(req,res,next)=>{
    let {error}=ListingSchema.validate(req.body);//if there any typpe of error then it will get stored in the error object(33,13) 
    if(error){//if there exists any error 
        // console.log(error);
        // console.log("after error");
        // console.log(error.details);

        let errMsg=error.details.map((el)=> el.message).join(",");//error ek object hai uske under kayi saari key values pair honge to sbpr ek ek baar traverse sbko comma separated jo denge and string form kr dnge orr fir usko return kr denge 
        throw new ExpressError(400,errMsg);//then throw the error will we catched by the line(168,4)
    }else{
        next();//call the next non error handling middleware
    }
};

module.exports.validateReview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);//if there any typpe of error then it will get stored in the error object(33,13) a&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& reviewSchema ke through validate karenge req.body ko if there any error to msg throw karenge nahi to chale jayenge matched route ke pass
    if(error){//if there exists any error 
        errMsgs=error.details.map((el)=>el.message).join(",");//error ek object hai uske under kayi saari key values pair honge to sbpr ek ek baar traverse sbko comma separated jo denge and string form kr dnge orr fir usko return kr denge 
        throw new ExpressError(400,errMsgs);//then throw the error will we catched by the line(168,4)
    }else{
        next();//call the next non error handling middleware
    }
};

module.exports.isReviewAuthor=async (req,res,next)=>{
    let {id,reviewId}=req.params;
    let review=await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error"," you did not create  this review so u can't delete  ");//adding flash to the list;
       return  res.redirect(`/listings/${id}`);
    }

    next();//-->to next ko call kr do
}

