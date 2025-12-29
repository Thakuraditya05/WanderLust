const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");//
const ExpressError=require("../utils/ExpressError.js");//
const {ListingSchema, reviewSchema}=require("../schema.js"); // 2nd step for serverside validation //
const Review=require("../models/review.js");//to require review model taki rating wagaira le sake 
const Listing=require("../models/listing.js");//

const { create } = require("../models/review.js");

const {validateReview, isLoggedIn,isReviewAuthor} = require("../middleware.js");

// 
// ...
const reviewControllers=require("../controllers/reviews.js")
 


//module "c:/Users/thaku/OneDrive/Desktop/WEB-DEVELOPMENT/MAJORPROJECT/utils/ExpressError"  double dot lagane se ye hota hai bhai 

// const validateReview=(req,res,next)=>{
//     let {error}=reviewSchema.validate(req.body);//if there any typpe of error then it will get stored in the error object(33,13) a&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& reviewSchema ke through validate karenge req.body ko if there any error to msg throw karenge nahi to chale jayenge matched route ke pass
//     if(error){//if there exists any error 
//         errMsgs=error.details.map((el)=>el.message).join(",");//error ek object hai uske under kayi saari key values pair honge to sbpr ek ek baar traverse sbko comma separated jo denge and string form kr dnge orr fir usko return kr denge 
//         throw new ExpressError(400,errMsgs);//then throw the error will we catched by the line(168,4)
//     }else{
//         next();//call the next non error handling middleware
//     }
// }

// // POST route for show comment and providing "FORM" 
// // Point number two hmm alag se reviews wagaira nahi dekhenge keval or keval individual listing ke saath hi uske reviews dekh rahen honge issliye uske liye index Route wagira faltu ke route jarurat nahi hogi jo relevent ho ge wahi keval use karenge 
//  hrr routes ka common part nikalna padta hhai "/listings/:id/reviews"  ok its all done 
router.post("/",
    isLoggedIn,
    validateReview,
    wrapAsync(reviewControllers.createReview));

// // DELETE REVIEWS route 
router.delete("/:reviewId",
    isLoggedIn,
    isReviewAuthor,
    wrapAsync(reviewControllers.destroyReview));

module.exports=router;


// 
// 