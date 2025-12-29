const mongoose = require('mongoose');
const Schema= mongoose.Schema;
// LETs require reviws taki listings delete ho ane ke bad usse relateted saari review object chali jaye 
const Review=require("./review.js");
const User=require("./user.js");
const defaultImageURL = "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhY2glMjBob3VzZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60";

// const imageSchema = {
//     image: {
//         type: String,
//         default: defaultImageURL,
//         set: (v) => (v === "" ? defaultImageURL : v),
//     }
// };


const ListingSchema = new Schema ({
    title:{
        type:String,
        required:true,
    },
    description:String,
    image:{
        // type: String,
        // default: defaultImageURL,
        // set: (v) => (v === "" ? defaultImageURL : v),
        // after clouninary 
       url:String,
        filename:String, 

    },
    price: Number,
    location: String,
    country:String,
    // to add reviews of  users (abhi ke liye sign and unsign dono ho skta hai )
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review"//Review-->this is model name jaha se id ko copy krni hai 
        }
    ],
    owner:{
        type:Schema.Types.ObjectId,
         ref:"User"//User-->this is model name jaha se id ko copy krni hai 
    },


    // ek pahla trika coordinate ko save kare ka is that and ye bilkul sahi trika hai 
    // coordinates:{
    //     type:[Number],
    //     required:true,
    // }
    // but isse better tarika hai geo json
        geometry: {
          type: { //-->ek type store krna hai 
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required:true,
          },
          coordinates: { ///>> cordinates hoge array of numbers
            type: [Number],
            required:true,
          }
        }
    
});


ListingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){// agar listings object aati hai tabhi ye kaam krna hai nahi to nahi 
            await Review.deleteMany({_id:{$in:listing.reviews}}); //unn reviews ko delete krna hai jo hamari listing ke reviews ke under id form me hai yani........"listing.reviews"ke nder jo bhi arrays hai unpr ek ke kr ke traverse karenge ($in: isska mtab yahi hota hai ) and to wo id wala pura ka pura Riview delet jo jayega   
    }
});

const Listing=mongoose.model("Listing",ListingSchema);//Listing----> 
module.exports=Listing;//ek document kaise dikhayi dega 
















// handling deletion 
// app.js ke under jaise hi " await Listing.findByIdAndDelete(id);" (81th line ke under 19 space pr) to ass a mongoose post middle ware call hoga orr orr ye uske correspoinding saare ke saare evies ko khatam kr dega 