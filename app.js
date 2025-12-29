if(process.env.NODE_ENV!="production"){
    require("dotenv").config();
}

// require('dotenv').config()
// console.log(process.env.NAME) // remove this after you've confirmed it is working


const express=require("express");
const app=express();
// const Listing=require("./models/listing.js");
const path=require("path");//pata nahi kyo
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const wrapAsync=require("./utils/wrapAsync.js");
const ExpressError=require("./utils/ExpressError.js");
//const {ListingSchema, reviewSchema}=require("./schema.js"); // 2nd step for serverside validation 


// lets store reviws now
const Review=require("./models/review.js");//to require review model taki rating wagaira le sake 
//lets require routes paths of listings
const listings=require("./routes/listings.js");
// lets require "/listings/:id/reviews" routes paths 
const reviews=require("./routes/reviews.js");
// link for express session --------------->https://www.npmjs.com/package/express-session#sessionoptions
const session = require('express-session');



// .......................................................
// at the time of deployement 
const MongoStore = require('connect-mongo');
// .......................................................


// let reqquire flash  so to make pop-up msgs for suxxess warning
const flash = require('connect-flash');
// let reqquire 
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js")
// lets require for "userRouter" for login information 
const userRouter=require("./routes/user.js")






app.engine("ejs",ejsMate);
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"/public")));




const mongoose = require('mongoose');


// at the time of deployement only we are change the,link 

// const MONGO_URL="mongodb://127.0.0.1:27017/wander_lust"
const dbUrl=process.env.ATLASDB_URL;

main()
    .then(()=>{console.log("connection with mongoose successfull")})
    .catch((e)=>{console.log(e)});
async function main(){
    // await mongoose.connect(MONGO_URL);
    await mongoose.connect(dbUrl);//

}

//cookie  ka kaam session ko track krna 

// at the time of depoyement 
const store=MongoStore.create({ 
    mongoUrl:dbUrl,  //MONGO_URL
    // mongoUrl:MONGO_URL,  //MONGO_URL
    crypto:{
        secret: process.env.SECRET,
    },
    touchAfter:24*3600,
});

store.on("error",()=>{
    console.log("error in mongo sesssion store ",err );
})

//  ...................................session  option 
const sessionOptions={
    store:store,
    secret:process.env.SECRET,
    saveUninitialized:true,
    resave:false,
    cookie:{
        expires:Date.now()+7*24*60*60*100,
        maxAge:7*24*60*60*100,
        httpOnly:true,
    },
};








app.use(session(sessionOptions));







// .....................MW for flash
app.use(flash());


// to implement password (it must be below app.use flash and session)
app.use(passport.initialize());//hrr req ke liye passport initialise ho jayega 
app.use(passport.session());//// yani ek page se dusare page agar request ja rahi hai to same user hai jo request bhej raha hai ya different-different user hai jo request bhej raha hai same  webpage ke liye 
//ek users jb baar baar  req and response, req and response krta hai hamari website kke saath --->ek session and ek seesion  me ek hi baar sign up and login kare----> 
passport.use(new LocalStrategy(User.authenticate()));//passport.use-->paasport ke under 
//               LocalStrategy-->iss authentiaction library ko use krna hai  jo ki passport ke under paayi jati hai 
//        User.authenticate() --> authenticate ek methode hai jisski help se authentication hota hai and authention ke samay jo username, password ....orr kon kon si feild ke liye authenticat krna hai uske liye user model(class use kiya jayega )

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());//Generates a function that is used by Passport to serialize users into the session-->
passport.deserializeUser(User.deserializeUser());


// custom validation error handller details: [ [Object] ]
//3rd step to validate server side 
// const validateListing=(req,res,next)=>{
//     let {error}=ListingSchema.validate(req.body);//if there any typpe of error then it will get stored in the error object(33,13) 
//     if(!error){//if there exists any error 
//         errMsgs=error.details.map((el)=>el.message).join(",");//error ek object hai uske under kayi saari key values pair honge to sbpr ek ek baar traverse sbko comma separated jo denge and string form kr dnge orr fir usko return kr denge 
//         throw new ExpressError(400,errMsgs);//then throw the error will we catched by the line(168,4)
//     }else{
//         next();//call the next non error handling middleware
//     }
// }
// const validateReview=(req,res,next)=>{
//     let {error}=reviewSchema.validate(req.body);//if there any typpe of error then it will get stored in the error object(33,13) a&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& reviewSchema ke through validate karenge req.body ko if there any error to msg throw karenge nahi to chale jayenge matched route ke pass
//     if(error){//if there exists any error 
//         errMsgs=error.details.map((el)=>el.message).join(",");//error ek object hai uske under kayi saari key values pair honge to sbpr ek ek baar traverse sbko comma separated jo denge and string form kr dnge orr fir usko return kr denge 
//         throw new ExpressError(400,errMsgs);//then throw the error will we catched by the line(168,4)
//     }else{
//         next();//call the next non error handling middleware
//     }
// }
// 4th step is to pass this schema to every app method 



// this middle ware try to access flash 
app.use((req, res, next) => {
    //res.locals.successMsg= req.flash("success");// likhna hai agar ejs template me use krna hai to local variable ke under store kara skte hai req.local.message ek variable hai 
    res.locals.success = req.flash("success");
   res.locals.error = req.flash("error");
   res.locals.currUser = req.user;// request ke under jo bhi information hai usse  res.locals.currUser ki hlep sse curruser ke under stored ho jayegi 

    next();
})



// "/demouser" to bs data base me ek fake user register krna hai 

// app.get("/demouser",async(req,res)=>{
//     let fakeUser = new User({//bs naya user crate kr rahe isski help se 
//         email:"thakuradityasingh@mail.com",
//         username:"delta-student",
//     });
    
//     let registeredUser= await User.register(fakeUser,"helloworld");//register-->register method ka use krke jiske argument fakeUser(the userdocument itself), with passwoard("helloWorrd")
//     res.send(registeredUser);

// });








//app.use for listings mapping routes
app.use("/listings",listings);//listings--->listingsRouter
app.use("/listings/:id/reviews",reviews);//reviews--->
// ek naya router
app.use("/",userRouter);





// //index route 
// app.get("/listings", wrapAsync(async (req,res)=>{
//     Listing.find({});
//     const allistings=await Listing.find({});
//     res.render("listings/index.ejs", {allistings} );
// }));

// //new route  
// app.get("/listings/new",wrapAsync((req,res)=>{
//     res.render("listings/new.ejs");
// }));
// // update route (update data in data base for individual lsisting)
// app.put("/listings/:id",
//     validateListing,
//     wrapAsync(async (req,res)=>{
//     if(!req.body.listing)throw new ExpressError(400,"<h1>send valid data for listings</h1>");// khud se deemga lagana hota hai ki haha kaha se error aa skte hai 
//     let {id}=req.params;
//     await Listing.findByIdAndUpdate(id,{...req.body.listing});
//     res.redirect(`/listings/${id}`);
// }));
// //delete route 
// app.delete("/listings/:id",wrapAsync(async(req,res)=>{
//     let {id}=req.params;
//     await Listing.findByIdAndDelete(id);
//     res.redirect("/listings");
// }));


// // POST route for show comment and providing "FORM" 
// // Point number two hmm alag se reviews wagaira nahi dekhenge keval or keval individual listing ke saath hi uske reviews dekh rahen honge issliye uske liye index Route wagira faltu ke route jarurat nahi hogi jo relevent ho ge wahi keval use karenge 
// app.post("/listings/:id/reviews",
//     validateReview,
//     wrapAsync(
//     async (req,res)=>{
//         let listing = await Listing.findById(req.params.id);// Listing collectins se findById method ka use kkrke jo bhi id aayi hogi request.params object me se  uske corresponding listing document  nikal ke lani hai aur usko listing(80,13) me store kr ddo ab aha se jis listing ke liye review add kiya gaya tha wo listing(object) mil gayi 
//         let newReview = new Review(req.body.review);// form side se bahut sara data aayega request body  ke  form me (req.body) review object ke form me (review object jb form bana tha or submit kiya to to uske values ko wahi pe object ke form me stores kr liye (show.ejs (45,98)))   usse req.body  se  extract kr ke  ( rating and comment)  usko new new object(newReviews) ke form me store kr do 
//         //   object    new opreture  class_name(object)--------->to create object like a defined class by the concept of opps  
//         listing.reviews.push(newReview); //listings object ke under jiska schema(==class) listing.js me defined hai uske pass ek  key hai reviews naam ki uske under  neReviews object store kr do  

//         await newReview.save();//newReview object ko bhi save kr do dbs ke under
//         await listing.save();// updated listing ko fir se save kr do 

//         // console.log("new reviews saved");
//         // res.send("new review saved");
//         res.redirect(`/listings/${listing._id}`);
//     }
// ));

// // DELETE REVIEWS route 
// app.delete("/listings/:id/reviews/:reviewId",
//     wrapAsync(
//     async(req,res)=>{
//         let {id, reviewId}=req.params;
//         await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});// listing collectins se findByid method se matched id wale object ko find krna hai and usme se "reviews" key ke under (jo ki object hai ) "reviewId" jo bhi id isse match ho rah hai usko delete kr ke update kr do 
//         await Review.findByIdAndDelete(reviewId);//to delete match id's object
//         res.redirect(`/listings/${id}`);
// }))






//reciving of get request 
// app.get("/testing",async(req,res)=>{
//     let sampleListing=new Listing({
//         title:"RD sharma",
//         description:"maths book for jee and class 12 ",
//         price:1299,
//         location:"bara,unnao",
//         country:"india",
//     });
//     await sampleListing.save();
//     console.log(Listing.find());
//     // console.log(Listing.count());

//     res.send("<h1>successful testing</h1>");
//     // listing

// });


//create route 
// app.post("/listings", async (req,res,next)=>{
//      try{
//         // let {title,description,image,price,country,location}=req.body;
//         let listing = new Listing(req.body.listing);  
//         await listing.save();
//         res.redirect("/listings");
//      }catch(err){
//         next(err);
//      }
// });

//Create Route (WrapAsync) 
// app.post("/listings",
//     wrapAsync(async (req,res,next)=>{
//         if(!req.body.listing)throw new ExpressError(400,"<h1>send valid data for listings</h1>");
//         // let {title,description,image,price,country,location}=req.body;
//         let listing = new Listing(req.body.listing); 
//         if(!req.body.title)throw new ExpressError(400,"<h1>send valid data for listings</h1>");
//         if(!req.body.description)throw new ExpressError(400,"<h1>send valid data for listings</h1>");
//         if(!req.body.image)throw new ExpressError(400,"<h1>send valid data for listings</h1>"); 
//         if(!req.body.price)throw new ExpressError(400,"<h1>send valid data for listings</h1>");
//         if(!req.body.country)throw new ExpressError(400,"<h1>send valid data for listings</h1>");
//         if(!req.body.location)throw new ExpressError(400,"<h1>send valid data for listings</h1>"); 
//         await listing.save();
//         res.redirect("/listings");
//     })
//     // this is too much tds task to handle error 
// );


//Create Route (WrapAsync) 
// app.post("/listings",
//     wrapAsync(async (req,res,next)=>{
//         let result=ListingSchema.validate(req.body);//jo listings schema create kiya hai joy ke under uske under check kr rahe hai ki jo constrains hmne defined kiye hai(schema.js ke under ) kya wo satisfied ho rahi hai kya kya wo validate ho pa rahi hai orr jo  bhi uska output aayega let it be result   
//         console.log(result);
//         if(result.error){throw new ExpressError(400,result.error);}
//         // let {title,description,image,price,country,location}=req.body;
//         let listing = new Listing(req.body.listing); 
//         await listing.save();
//         res.redirect("/listings");
//     })
// );

//Create Route (WrapAsync) 
// app.post("/listings",
//     validateListing, 
//     wrapAsync(async (req,res,next)=>{
//         // let {title,description,image,price,country,location}=req.body;
//         let listing = new Listing(req.body.listing); 
//         await listing.save();
//         res.redirect("/listings");
//     })
// );


// app.get("/listings/:id/edit",validateListing,
//      wrapAsync(async (req,res)=>{
//     let {id}=req.params;
//     const listing = await Listing.findById(id);
//      res.render("listings/edit.ejs", { listing });
// }));
// //show 
// app.get("/listings/:id",validateListing,
//     wrapAsync(async (req,res) => { 
//     let {id}=req.params;
//     // const listing = await Listing.findById(id);
//     const listing = await Listing.findById(id).populate("reviews");// this line was added after review page is render at very last --->jo saare riews hai unko populate krna hai (yani saare ids ko deatil se refresent krwana hai  )
//     // console.log("id", listing);
//     res.render("listings/show.ejs",{ listing });
//  }));

// app.get("/",wrapAsync((req,res)=>{ 
//     res.send("<h1>8080 is listing </h1>")
// }));
//agar texting krte samay kisi galat route ko request chali gayi hai to uss case me ya hrr us case ke liye route match naahi kr raha hai
//to usme ye wala method jarur chalega  

app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"<h1>Page Note Found!</h1>"));
});

// custom error handler 
app.use((err,req,res,next)=>{
    //deconstructing express error 
    let {statusCode=500,message="sorry error caused"}=err;
    if (!res.locals.currUser) res.locals.currUser = null; 
        res.status(statusCode).render("error.ejs",{err});
    // res.status(statusCode).send(`<h2 style="text-align: center; margin:20rem auto; font-weight:900;">${message}</h2>`);
});

//listing to the port 
app.listen(8080,()=>{
    console.log("server start listening on the port 8080");
});


 
// app.use((err, req, res, next) => {
//     let { statusCode = 500, message = "Something went wrong!" } = err;
    
//     // --- ADD THIS LINE ---
//     // If an error happens before we define currUser, set it to null 
//     // so the navbar doesn't crash the error page.
//     
//     // ---------------------

//     res.status(statusCode).render("error.ejs", { err });
// });
