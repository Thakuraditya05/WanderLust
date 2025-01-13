
const Listing=require("../models/listing.js");//

const Review=require("../models/review.js");//to require review model taki rating wagaira le sake 

module.exports.createReview=async (req,res)=>{
    let listing = await Listing.findById(req.params.id);// Listing collectins se findById method ka use kkrke jo bhi id aayi hogi request.params object me se  uske corresponding listing document  nikal ke lani hai aur usko listing(80,13) me store kr ddo ab aha se jis listing ke liye review add kiya gaya tha wo listing(object) mil gayi 
    let newReview = new Review(req.body.review);// form side se bahut sara data aayega request body  ke  form me (req.body) review object ke form me (review object jb form bana tha or submit kiya to to uske values ko wahi pe object ke form me stores kr liye (show.ejs (45,98)))   usse req.body  se  extract kr ke  ( rating and comment)  usko new new object(newReviews) ke form me store kr do 
    //   object    new opreture  class_name(object)--------->to create object like a defined class by the concept of opps  
    // listing.reviews.push(newReview); //listings object ke under jiska schema(==class) listing.js me defined hai uske pass ek  key hai reviews naam ki uske under  neReviews object store kr do  
    newReview.author=req.user._id;
    // console.log(newReview);
    listing.reviews.push(newReview); 
    await newReview.save();//newReview object ko bhi save kr do dbs ke under
    await listing.save();// updated listing ko fir se save kr do 

    // console.log("new reviews saved");
    // res.send("new review saved");
    req.flash("success","  New Review created ");//adding flash to the list;
    res.redirect(`/listings/${listing._id}`);
}


module.exports.destroyReview=async(req,res)=>{
    let {id, reviewId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});// listing collectins se findByid method se matched id wale object ko find krna hai and usme se "reviews" key ke under (jo ki object hai ) "reviewId" jo bhi id isse match ho rah hai usko delete kr ke update kr do 
    await Review.findByIdAndDelete(reviewId);//to delete match id's object
    req.flash("success","Review deleted");//adding flash to the list;
    res.redirect(`/listings/${id}`);
};


