const express = require("express");
// const { route } = require("../classroom/routes/user");
// const router = express.Router();
const router =express.Router({mergeParams:true})
const Listing=require("../models/listing.js");//
const wrapAsync=require("../utils/wrapAsync.js");//
// const ExpressError=require("../utils/ExpressError.js");//
// const {ListingSchema, reviewSchema}=require("../schema.js"); // 2nd step for serverside validation //
// const { create } = require("../models/review.js");

//module "c:/Users/thaku/OneDrive/Desktop/WEB-DEVELOPMENT/MAJORPROJECT/utils/ExpressError"  double dot lagane se ye hota hai bhai 

// lets require miidleware file
const {isLoggedIn,isOwner,validateListing}=require("../middleware");
// ...
const listingControllers=require("../controllers/listings.js")

// 
const multer = require("multer");
const {storage}=require("../cloudConfig.js");// upload ke ek line upper require karenge 
 // const upload = multer({dest:"uploads/"});    
const upload = multer({ storage });




//3rd step to validate server side 
// const validateListing=(req,res,next)=>{
//     let {error}=ListingSchema.validate(req.body);//if there any typpe of error then it will get stored in the error object(33,13) 
//     if(error){//if there exists any error 
//         console.log(error);
//         console.log("after error");
//         console.log(error.details);

//         let errMsg=error.details.map((el)=> el.message).join(",");//error ek object hai uske under kayi saari key values pair honge to sbpr ek ek baar traverse sbko comma separated jo denge and string form kr dnge orr fir usko return kr denge 
//         throw new ExpressError(400,errMsg);//then throw the error will we catched by the line(168,4)
//     }else{
//         next();//call the next non error handling middleware
//     }
// }




//index route 
// router.get("/", wrapAsync(listingControllers.index));

      



// //new route  
// router.get("/new",isLoggedIn, wrapAsync(listingControllers.renderNewForm));


// POST route for show comment and providing "FORM" 
// Point number two hmm alag se reviews wagaira nahi dekhenge keval or keval individual listing ke saath hi uske reviews dekh rahen honge issliye uske liye index Route wagira faltu ke route jarurat nahi hogi jo relevent ho ge wahi keval use karenge 
// router.post("/:id/reviews",
//     validateReview,
//     wrapAsync(
//         async (req, res) => {
//             let listing = await Listing.findById(req.params.id);// Listing collectins se findById method ka use kkrke jo bhi id aayi hogi request.params object me se  uske corresponding listing document  nikal ke lani hai aur usko listing(80,13) me store kr ddo ab aha se jis listing ke liye review add kiya gaya tha wo listing(object) mil gayi 
//             let newReview = new Review(req.body.review);// form side se bahut sara data aayega request body  ke  form me (req.body) review object ke form me (review object jb form bana tha or submit kiya to to uske values ko wahi pe object ke form me stores kr liye (show.ejs (45,98)))   usse req.body  se  extract kr ke  ( rating and comment)  usko new new object(newReviews) ke form me store kr do 
//             //   object    new opreture  class_name(object)--------->to create object like a defined class by the concept of opps  
//             listing.reviews.push(newReview); //listings object ke under jiska schema(==class) listing.js me defined hai uske pass ek  key hai reviews naam ki uske under  neReviews object store kr do  

//             await newReview.save();//newReview object ko bhi save kr do dbs ke under
//             await listing.save();// updated listing ko fir se save kr do 

//             // console.log("new reviews saved");
//             // res.send("new review saved");
//             res.redirect(`/listings/${listing._id}`);
//         }
//     ));

//show route
// router.get("/:id",wrapAsync(listingControllers.showListings));


// DELETE REVIEWS route 
// router.delete("/:id/reviews/:reviewId",
//     wrapAsync(
//         async (req, res) => {
//             let { id, reviewId } = req.params;
//             await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });// listing collectins se findByid method se matched id wale object ko find krna hai and usme se "reviews" key ke under (jo ki object hai ) "reviewId" jo bhi id isse match ho rah hai usko delete kr ke update kr do 
//             await Review.findByIdAndDelete(reviewId);//to delete match id's object
//             res.redirect(`/listings/${id}`);
//         }));


// create route
// router.post("/",isLoggedIn,validateListing,wrapAsync(listingControllers.createListing));



// update route (update data in data base for individual lsisting) ok 
// router.put("/:id",isLoggedIn,isOwner,validateListing,wrapAsync(listingControllers.updateListing));  


//delete route ok 
// router.delete("/:id",isLoggedIn, wrapAsync(listingControllers.distroyListing));


////////////////////////////////////////
router.route("/")
        .get(wrapAsync(listingControllers.index))
        .post(isLoggedIn,upload.single('listing[image]'),validateListing,wrapAsync(listingControllers.createListing));
        // .post(upload.single('listing[image]'),
        //     (req,res)=>{
        //     // res.send(req.body);//>>>>{}
        //     res.send(req.file);//---->"fieldname":"listing[image]","originalname":"12-Surya-namaskar-mantra.jpg","encoding":"7bit","mimetype":"image/jpeg","destination":"uploads/","filename":"3bf615b5bea214e494b8b74ab308a076","path":"uploads\\3bf615b5bea214e494b8b74ab308a076","size":114159}
        // });


////new route  
router.get("/new",isLoggedIn, wrapAsync(listingControllers.renderNewForm));


//.......
router.route("/:id")
    .delete(isLoggedIn,isOwner, wrapAsync(listingControllers.distroyListing))
    .put(isLoggedIn,isOwner,upload.single('listing[image]'),validateListing,wrapAsync(listingControllers.updateListing))
    .get(wrapAsync(listingControllers.showListings));


//edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingControllers.renderEditForm));

module.exports=router;

