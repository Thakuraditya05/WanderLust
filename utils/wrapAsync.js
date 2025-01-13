// function wrapAsync(fn){
//     return function(req,res,next){
//         fn(req,res,next).catch(next);
//     }
// }

module.exports=(fn)=>{
    return (req,res,next)=>{
        fn(req,res,next).catch(next);
    }
}
// module.exports = (fn) => {
//     return (req, res, next) => {
//         try {
//             // Check if fn is an async function
//             const result = fn(req, res, next);
//             if (result && typeof result.then === 'function') {
//                 // If fn returns a promise, handle the promise's error
//                 result.catch(next);
//             }
//         } catch (err) {
//             // Catch synchronous errors
//             next(err);
//         }
//     };
// };
