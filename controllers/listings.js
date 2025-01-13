const Listing=require("../models/listing");
const wrapAsync=require("../utils/wrapAsync.js");//


// geocoding ke liye 
//  mapbox ke under mapbox-sdk hai uske under kafi sari services hai or hame usme se geocoding wali services use krna hai  
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');// geooding wali servise ko acire kiya 
// lets require map token 
const mapToken=process.env.MAP_TOKEN;// map token acquired     
// base client ko create karenge map token ka use kr ke 
// geocodingClient ek aise object jo hame kaam kr ke dega geo coding se releted 
const geocodingClient = mbxGeocoding({ accessToken: mapToken });// service ko sart kr diya by passsing access token  geocodingClient--> ek aisi object jo hame kaam krke dega goe coding releted 
//  santyax yaad krne ki koi jarurat nahi hai hamesa documnetation se hi dekhn apdega 





module.exports.index=async (req, res) => {
    // await  Listing.find({});
    const allistings = await Listing.find({});
    res.render("listings/index.ejs", { allistings });
}
module.exports.renderNewForm=(req, res) => {
    // console.log(user);//essential part oof user'info wo dikhayi de rahi hai 
    // lets checki hamara user authenhicated(alredy having existing account or not) hai ya nahi  
    // if(!req.isAuthenticated()){//--> checks given bnda authenticated or not

    //   req.flash("error","you must be logged in to create listings");//
    //   return res.redirect("/listings");
    // }
    res.render("listings/new.ejs");
}

module.exports.showListings=async (req, res) => {
    let { id } = req.params;
    // const listing = await Listing.findById(id);
    // const listing = await Listing.findById(id).populate("reviews").populate("owner");// this line was added after review page is render at very last --->jo saare riews hai unko populate krna hai (yani saare ids ko deatil se refresent krwana hai  )
    const listing = await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");// this line was added after review page is render at very last --->jo saare riews hai unko populate krna hai (yani saare ids ko deatil se refresent krwana hai  )

    // console.log("id", listing);
    if(!listing){    // error ke liye flashh yaha create ho raha hai ----->failure partial
        req.flash("error","listing you requested for does not exists");
        res.redirect("/listings");
    }
    // console.log(listing);//----password nahi hai isske under
    res.render("listings/show.ejs", { listing });
}
module.exports.createListing=async (req, res, next) => {
 
    // step1 for geocoding 
    let response=await geocodingClient.forwardGeocode({query:req.body.listing.location, limit: 1, }).send();// geo coding ka basic code hai 
//  ---->   console.log(response.body.features[0].geometry);//--->{ type: 'Point', coordinates: [ 74.054111, 15.325556 ] }
    // res.send("done");

    
    let url=req.file.path;
    let filename=req.file.filename;
    // console.log(url,filename);


    // let {title,description,image,price,country,location}=req.body;
    let listing = new Listing(req.body.listing);
    // console.log(req.user._id);
    listing.owner=req.user._id;

    listing.image={url,filename};

        // storing geo cordinates in geojson of mongodb inside listings itself 
        listing.geometry=response.body.features[0].geometry;

        let savedListing=await listing.save();
        console.log(savedListing);

    //pop-up msgs that 
    req.flash("success","new listings created");// ye msg flash krwana chahte hai jaise hi direct krte hai "/listings" wale route pe    this flash can be accessed at app.js


    res.redirect("/listings");
}
module.exports.renderEditForm=async (req, res) => {
        let { id } = req.params;
        const listing = await Listing.findById(id);
        if(!listing){    // error ke liye flashh yaha create ho raha hai ----->failure partial
            req.flash("error","listing you requested for does not exists");
            res.redirect("/listings");
        }

            //this is the way to set prievew at edit form 
        let originalImageUrl=listing.image.url;
        originalImageUrl=originalImageUrl.replace("/upload","/upload/h_200,w_250");
    //  --->   console.log("Modified Image URL:", originalImageUrl);

        // req.flash("success","  listings Edited");//adding flash to the list;
        res.render("listings/edit.ejs", { listing ,originalImageUrl });
    }

module.exports.updateListing = async (req, res) => {
        // if (!req.body.listing) throw new ExpressError(400, "<h1>send valid data for listings</h1>");// khud se deemga lagana hota hai ki haha kaha se error aa skte hai 
        let { id } = req.params;
        // let listing=await Listing.findById(id);
        // if(!listing.owner.equals(res.locals.currUser._id)){
        //     req.flash("error","  you dont have permisssion to edit ");//adding flash to the list;
        //     res.redirect(`/listings/${id}`);
        // }
        
        let listing=await Listing.findByIdAndUpdate(id, { ...req.body.listing });


        // logic to save file to the backend --->this is the basic code edit ke time pe update kr payenge with new
        if(typeof req.file!=="undefined"){
            let url=req.file.path;
            let filename=req.file.filename;
            listing.image={url,filename};
            await listing.save();
        }


        
        req.flash("success","  listings update");//adding flash to the list;
        res.redirect(`/listings/${id}`);
    }
module.exports.distroyListing = async (req, res) => {
        let { id } = req.params;
        await Listing.findByIdAndDelete(id);
        req.flash("success","  listings deleted");//adding flash to the list;
        res.redirect("/listings");
    }