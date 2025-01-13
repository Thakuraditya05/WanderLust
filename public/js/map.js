
// console.log(coordinates); // Correct logging
 

    // let mapToken = "<%= process.env.MAP_TOKEN %>"; // Your Mapbox token
    // console.log(mapToken);
    
//     mapboxgl.accessToken = mapToken;

//     const map = new mapboxgl.Map({
//         container: 'map', // container ID
//         // center: [77.209, 28.6139], // starting position [lng, lat]. Note that lat must be set between -90 and 90 ---> map khulne ke baad sbse starting position kyA HOGI YANI KON SI COUNTRY KA KON SI  jagah let set the new delhi 
//                 // [ logitude    , n latiitude     ]
//         style:"mapbox://styles/mapbox/streets-v12", //style url
//         center: listing.geometry.coordinates,
//         zoom: 9// starting zoom
  

//     });

//     console.log(listing.geometry.coordinates);


// // createing marker
//  // Create a default Marker and add it to the map.
//  const marker = new mapboxgl.Marker({ color: 'red'})
//  .setLngLat(listing.geometry.coordinates) //listing.geometry.coordinates
//  .setPopup(new mapboxgl.Popup({offset: 25})//-->new mapboxgl se  ek naya popup set kr rahe hai 
//  .setHTML(`<h4>${listing.location}</h4><p>exact loaction will be provided after booking</p>`)) //--> popup me hello world dikhayi dega 
//  .addTo(map);


//  map alag file me likha hu hai and show .ejs alag file me issko access karega and basic map render ho jaeyga
mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({     // new mapboxgl iss function ka use krke ek map creat kr rahe hai 
    container: 'map', // container ID
    // style: "mapbox://styles/mapbox/street-v12", // style url-->dark-v11  // yaha pr map ko ek style de rahe hai ki hamara map kaisa dukhayi dega 
    center: coordinates, // Ensure this is a valid [lng, lat] array   //---> map open hone ke baaad start kaha se hoga 
    zoom: 7 // starting zoom
});

console.log(coordinates); // Correct logging

// Creating a marker
const marker = new mapboxgl.Marker({ color: 'red' })
    .setLngLat(coordinates) // listing.geometry.coordinates should be [longitude, latitude]
    .setPopup(new mapboxgl.Popup({ offset: 25 }).setMaxWidth("30rem")// creating a popup with offset
    .setHTML(`<h4>${locations}</h4><p>Exact location will be provided after booking</p>`)) // Make sure listing.location is defined
    
    .addTo(map);
// we can add multiple marker too usklo diiferent coordinate dene padenge 
// aad icon to homepasge 






