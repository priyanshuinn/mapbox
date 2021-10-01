
//Todo: Setting up the base layer using mapbox tile laye
var mapboxtoken = "pk.eyJ1IjoicHJpeWFuc2h1OTcxOCIsImEiOiJja3Q2MXQ1b3QwZTY4MnhsYWV4aDJzaDY5In0.FV7nYch0bvfslm4ntATK9Q";
var apikey = "254759d273065b03e3ed623c9f16c90f";
var mymap = L.map('mapid').setView([28.639768, 77.231232], 10);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token='+mapboxtoken, {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
}).addTo(mymap);


//?: Components in geojson has [long,lati]
//* Fetching data from delhi_ward.geojson 


fetch('Delhi_Boundary.json')
.then(response => response.json())
.then( geojsondata => {

    L.geoJson(geojsondata, {style: style}).addTo(mymap)

  function getColor(aqi) {
      console.log("AQI color : ",aqi);
    return aqi == "NaN" ? '#FFFFFF' :
         aqi > 400 ? '#870eeb' :
         aqi > 300  ? '#ff2626' :
         aqi > 200  ? '#ff8800' :
         aqi > 100  ? '#ffee00' :
         aqi > 50   ? '#1e9905' :
                      '#2bff00' }

    async function style(feature) {
        let res = await getAQI(feature);
        // console.log("PM2.5 : ",res.list[0].components.pm2_5)
        // console.log("PM10 : ",res.list[0].components.pm10)
        var max = Math.max(res.list[0].components.pm2_5,res.list[0].components.pm10);
        // console.log("Maximum of two is : ",max);
        return {
                fillColor: getColor(max),
                // fillColor: '#ff8800',
                weight: 2,
                opacity: 1,
                // color: '#ffee00',
                color: getColor(max),
                fillOpacity: 0.5
              };        
            
      }


  
 async function getAQI(feature)
  {
        var lat = feature.geometry["coordinates"][0][0][1].toString();
        var log = feature.geometry["coordinates"][0][0][0].toString();
    try {
        let response = await fetch('http://api.openweathermap.org/data/2.5/air_pollution?lat='+lat+'&lon='+log+'&appid='+apikey);
    response = await response.json();
    return response;
    } catch (error) {
        console.log(error.response);
    };
  }
  L.geoJSON(geojsondata, {
    onEachFeature: async function (feature, layer) {
      let res = await getAQI(feature);
      var max = Math.max(res.list[0].components.pm2_5,res.list[0].components.pm10);
      layer.setStyle({ weight: 2, color: getColor(max), fillOpacity: 0 });
      layer.bindPopup('<h3> Air Quality index </h3><h1>'+max.toString()+'</h1>');
    }
  }).addTo(mymap)
  

//Todo: Adding Legend to the map
    var legend = L.control({position: 'bottomright'});
    legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),
        grades = ["Good", "Satisfactory", "Moderate", "Poor", "Very Poor","Severe"],
        aqi = [0, 50, 100, 200, 300, 400]
        labels = [];
    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(aqi[i] + 1) + '"></i> ' +
            grades[i] + '<br>' ;
            }
    return div;
    };
    legend.addTo(mymap);
//? ***************************************************************************************
});
