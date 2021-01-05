function createMarkers(earthquakeData) {
    console.log(earthquakeData);
    var earthquakes = earthquakeData.features;
    var earthquakeMarkers = [];
    
    for (var index = 0; index < earthquakes.length; index++){
        var earthquake = earthquakes[index];
        var earthquakeMarker = L.circleMarker([earthquake.coordinates])
            .bindPopup("<h3>"+ earthquake.place + "</h3>" + "<h3>" + earthquake.title + "</h3>"  ); 
        earthquakeMarkers.push(earthquakeMarker);
    }
    createMap(L.layerGroup(earthquakeMarkers));
 };