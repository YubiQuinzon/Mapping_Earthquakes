// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
    Street: streets,
    Dark: dark
  };

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
    center: [30, 30],
    zoom: 2,
    layers: [streets]
})

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// setting a variable equal to the URL where we want to retrieve data
let airportData = "https://raw.githubusercontent.com/YubiQuinzon/Mapping_Earthquakes/Mapping_GeoJSON_Points/majorAirports.json"

// Grabbing our GeoJSON data usin the D3 library
d3.json(airportData).then(function(data) {
    console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJSON(data, {
      onEachFeature: function(feature, layer){
          layer.bindPopup("<h2>" + feature.properties.city + "<br>ID: " + feature.properties.id + "</h2>");
      }
  }).addTo(map);
  
});


// The onEachFeature callback function allows you to add styling and bind data to a popup marker
// L.geoJSON(sanFranAirport, {
//     onEachFeature: function(feature, layer) {
//         layer.bindPopup("<h2>" + feature.properties.city + "</h2><br><h2>" + feature.properties.name + "</h2>");
//         console.log(layer);
//     }
// }).addTo(map);



