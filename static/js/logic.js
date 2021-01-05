var myMap = L.map("map-id", {
    center: [37.09, -95.71],
    zoom: 4,
});

var stmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
}).addTo(myMap);

var Earthquake = L.layerGroup();

 var baseMaps ={"Street Map": stmap};
  
 var overlayMaps = {earthquakes: Earthquake};

L.control.layers(baseMaps, overlayMaps, {
    collaspsed: false
}).addTo(myMap);

//add data
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson", function (data){
    console.log(data);
    function styleinfo(features) {
        //   grabbing info needed to style our marker
        return {
          radius: getradius(features.properties.mag),
          fillColor: getcolor(features.geometry.coordinates[2]),
          stroke: true,
          weight: 0.2,
          fillOpacity: 0.5,
          color: "red",
          opacity: 1,
        };
    };
    function getradius(magnitude) {
        return magnitude * 4; //three is just a scaling factor to visualize difference in magnitude
      };
    function getcolor(depth) {
        switch (true) {
          case depth > 90:
            return "#c51b7d";
          case depth > 70:
            return "#e9a3c9";
          case depth > 50:
            return "#fde0ef";
          case depth > 30:
            return "#e6f5d0";
          case depth > 10:
            return "#a1d76a";
          default:
            return "#4d9221";
        }
    };
    //create circles
    L.geoJSON(data, {
        pointToLayer: function (feature, latlng) {
          return L.circleMarker(latlng);
        },
        style: styleinfo,
    
        // create popup (using d3 bindpopup)
        onEachFeature: function (feature, layer) {
          layer.bindPopup(
            "Location: " +
              feature.properties.place +
              //    add break tag to clean up popup
              "<br>Magnitude: " +
              feature.properties.mag +
              "<br>Depth(km): " +
              feature.geometry.coordinates[2]
         );
        },
    }).addTo(Earthquake);
});Earthquake.addTo(myMap);  

//create legend
var legend = L.control({
    position: "bottomleft",
  });

function getColor(d) {
    return d < 1 ? 'rgb(255,255,255)' :
          d < 2  ? 'rgb(255,225,225)' :
          d < 3  ? 'rgb(255,195,195)' :
          d < 4  ? 'rgb(255,165,165)' :
          d < 5  ? 'rgb(255,135,135)' :
          d < 6  ? 'rgb(255,105,105)' :
          d < 7  ? 'rgb(255,75,75)' :
          d < 8  ? 'rgb(255,45,45)' :
          d < 9  ? 'rgb(255,15,15)' :
                      'rgb(255,0,0)';
}
legend.onAdd = function () {
    var div = L.DomUtil.create("div", "info legend"),
      grades = [0, 10, 30, 50, 70, 90];
      labels = [];

    div.innerHTML+='Magnitude<br><hr>'

    // loop through and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
        '<i style="background:' + getColor(grades[i] + 1) + '">&nbsp&nbsp&nbsp&nbsp</i> ' +
        grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }
    return div;
  };
  legend.addTo(myMap);