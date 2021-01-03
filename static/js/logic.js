function createMaps(Earthquake){
    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        id: "light-v11",
        accessToken: API_KEY
    });

    var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        id: "dark-v11",
        accessToken: API_KEY
    });

    var baseMaps ={"Dark Map": darkmap,
        "Light Map": lightmap} 
    var overlayMaps = {"Earthquake Map": Earthquake}

    var myMap = L.map("mapid", {
        center: [37.090, -95.712],
        zoom: 10,
        layer: [lightmap, darkmap, Earthquake]
    });

    L.control.layers(baseMaps, overlayMaps, {
        collaspsed: false
    }).addTo(myMap);

    
}

d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson", createMarkers);


function createMarkers(earthquakeData) {
    console.log(earthquakeData);
    var earthquakes = earthquakeData.properties;
    var earthquakeMarkers = [];
    
    for (var index = 0; index < earthquakeData.properties; index++){
        var earthquake = earthquakes[index];
        var earthquakeMarker = L.marker([earthquake.lat, earthquake.lon]).bindPopup("<h3>" + feature.properties.place +
        "</h3><hr><p>" + new Date(feature.properties.time) + "</p>" +
        "</h3><hr><p>Magnitude: " + feature.properties.mag + "</p>"); 
        earthquakeMarkers.push(earthquakeMarker);
    }
    createMaps(L.layerGroup(earthquakeMarkers));
 };