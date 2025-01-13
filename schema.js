const Joi = require('joi');
const { schema } = require('./models/listing');
// 1st step to handle server side validation 
module.exports.ListingSchema=Joi.object({//joi ke under ek object aani chahiye jiska naam hoga listing(->Joi.object({})) 
    listing:Joi.object({//listings bhi khud ek object hai orr joi ke according ye ek object hi honi chahiye(-->Joi.object({}))
        title:Joi.string().required(),//listing object ke under ye ye keys hai jinki value not undefied  honi chahiye  ya reqired honi chahiye(->required(),12,12);
        description:Joi.string().required(),
        location:Joi.string().required(),
        country:Joi.string().required(),
        price:Joi.number().required().min(0),
        image:Joi.string().allow("",null),
    }).required()
});
// const ListingSchema=Joi.object({......});
// module.exports.ListingSchema = ListingSchema;


// listing:Joi.object({}).required();// jb bhi request aaye hamare pass to uske ass ye listing object required honi hii honi chahiye and fir object ke pass kya kya parameter hone chaiye title 


// joi ke help se schema define krte hai ki hamare ki schema me ye ye(title,....) feild hai to kripiya inko individually maintain kare 
//  server side validation ke liye hota hai



// reviws object banane ja rahe hai 
//                             ek object honi chahiye jiska naam hoga review
module.exports.reviewSchema = Joi.object({
    //review naam ki object honi hii honi chahiye(.required) and object jo  aaygi jo khud me joi object ho 
    review:Joi.object({
        rating:Joi.number().required().min(1).max(5),
        comment:Joi.string().required(),
    }).required()

});