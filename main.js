mapboxgl.accessToken ="pk.eyJ1IjoicHJpeWFuc2h1OTcxOCIsImEiOiJja3Q2MXQ1b3QwZTY4MnhsYWV4aDJzaDY5In0.FV7nYch0bvfslm4ntATK9Q";

navigator.geolocation.getCurrentPosition(successLocation,errorLocation,{enableHighAccuracy:true})

function successLocation(possition){
  setupMap([possition.coords.longitude,possition.coords.latitude])
}
function errorLocation()
{
  setupMap([-2.24,53.48])
}
function setupMap(center)
{
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/satellite-streets-v10",
  center: center,
  zoom:14
})
const nav = new mapboxgl.NavigationControl({
  visualizePitch: true
});
map.addControl(nav, 'top-right');

var directions = new MapboxDirections({
  accessToken: mapboxgl.accessToken,
});
map.addControl(directions, 'top-left');
}
