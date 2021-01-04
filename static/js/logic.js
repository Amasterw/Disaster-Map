function createMap(Earthquake){
    var myMap = L.map("map-id", {
        center: [37.09, -95.71],
        zoom: 4,
        layer: [stmap, Earthquake]
    });

    var stmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/streets-v11",
        accessToken: API_KEY
    }).addTo(myMap);

    var baseMaps ={"Street Map": stmap};
  
    var overlayMaps = {"Earthquake Map": Earthquake};

    L.control.layers(baseMaps, overlayMaps, {
    collaspsed: false
    }).addTo(myMap);
};

d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson", createMarkers);

function createMarkers(earthquakeData) {
    console.log(earthquakeData);
    var earthquakes = earthquakeData.features;
    var earthquakeMarkers = [];
    
    for (var index = 0; index < earthquakes.properties; index++){
        var earthquake = earthquakes[index];
        var earthquakeMarker = L.marker([earthquake.coordinates])
            .bindPopup("<h3>"+ earthquake.place + "</h3>" + "<h3>" + earthquake.title + "</h3>"  ); 
        earthquakeMarkers.push(earthquakeMarker);
    }
    createMap(L.layerGroup(earthquakeMarkers));
 };