let User=require("../models/user.js");

module.exports.renderSignupForm=(req,res)=>{
    // res.send("forms");
    res.render("users/signup.ejs");
}

module.exports.signup=async (req,res)=>{
    try{
        // res.send("forms");
        let {username, email, password}=req.body;//information req.body
        const newUser=new User({email, username});//models(class) ka use krke newUser document(objects) create kr lena  
        let registeredUser=await User.register(newUser, password );
    //    ---> console.log(registeredUser);
        req.login(registeredUser,(err)=> {
            if (err) { 
                return next(err); 
            }
            req.flash("success", "welcome to wanderlust u r login after signup");
            res.redirect("/listings");
          });
        
    }catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}

module.exports.renderLoginForm=(req,res)=>{
    res.render("users/login.ejs");
}

module.exports.login=async(req,res)=>{
    // res.send("welcome to the wanderlust! you are logged in!");
    req.flash("success", "welcome to wanderlust again");
    // res.redirect("/listings");
    // res.redirect(req.session.redirectUrl);//---> general case me ye sahi hai  ,lekin passport me ekk dikkat hai ki "req.session" ko wo reset kr deta hai  jaise hi  passport.authenticate("local", { failureRedirect:"/login", failureFlash:true}) ne succes msg de diya  yani hamare middle ware ne extra information store karayi hogi to session ke under se redirectUrl ko delete kr dega  issliye ye empty undefinde value de raha hai, bu hamne ek jugad nikala hai ki chalo usko bhi reqest .locals ke under store kara deta hai kyo locas hrr jagah accessable hote hai    
    // res.redirect(res.locals.redirectUrl);
    
    let redirectUrl=res.locals.redirectUrl||"/listings";
    res.redirect(redirectUrl);

}

module.exports.logout=(req,res,next)=>{
    req.logout((err) => {// ekk mehod hai 
        if(err){
            return next(err);
        }
        req.flash("success", "you logged out from wanderlust again");
        res.redirect("/listings");
    });
};