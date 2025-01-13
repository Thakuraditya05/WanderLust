const express = require("express");
const router =express.Router();

// lets require models so it can be used as mongo db storage
let User=require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");

// ..............
const passport=require("passport");
const LocalStrategy=require("passport-local");
// lets require
const {saveRedirectUrl}=require("../middleware.js");
// 
const userControllers=require("../controllers/users.js");




router.route("/signup")
        .get(userControllers.renderSignupForm)
        .post( wrapAsync(userControllers.signup));

// router.get("/signup",userControllers.renderSignupForm);
// router.post("/signup", wrapAsync(userControllers.signup));



router.route("/login")
        .get(userControllers.renderLoginForm)
        .post(saveRedirectUrl,passport.authenticate("local", { failureRedirect:"/login", failureFlash:true}) ,userControllers.login );


// router.get("/login",userControllers.renderLoginForm)
// router.post("/login",
//     saveRedirectUrl,
//     passport.authenticate("local", { failureRedirect:"/login", failureFlash:true}) ,userControllers.login );



router.get("/logout",userControllers.logout);



module.exports=router;