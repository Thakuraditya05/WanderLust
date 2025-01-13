//intialising data to the data base for proper  testing 


// code for connecting with the data base 
const mongoose = require("mongoose");
const initdata=require("./data.js");
const Listing=require("../models/listing.js");
// creating port connection with mongoDataBase
const MONGO_URL="mongodb://127.0.0.1:27017/wander_lust"
main()
    .then(()=>{console.log("connection with mongoose successfull")})
    .catch((e)=>{console.log(e)});
async function main(){
    await mongoose.connect(MONGO_URL);
}
const initDB= async ()=>{
        await Listing.deleteMany({});
        initdata.data=initdata.data.map((obj)=>({...obj,owner:"677edf20c860acf8593381b5"}))
        await Listing.insertMany(initdata.data);
        console.log("data was initalized");
}
initDB();
