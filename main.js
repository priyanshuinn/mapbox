mapboxgl.accessToken ="pk.eyJ1IjoicHJpeWFuc2h1OTcxOCIsImEiOiJja3Q2MXQ1b3QwZTY4MnhsYWV4aDJzaDY5In0.FV7nYch0bvfslm4ntATK9Q";
//Todo: USA CLOROPLETH MAP

const map = new mapboxgl.Map({
  container: 'map', // container id
  center: [77.1025,28.6441],
  zoom: 9.8,
  style: 'mapbox://styles/priyanshu9718/cku4azznq144g18l6i94qlw0g' // replace this with your style URL
});

map.on('load', () => {
  // the rest of the code will go in here
// Adding hover effect to show information
map.on('mousemove', ({ point }) => {
  const states = map.queryRenderedFeatures(point, {
    layers: ['delhi-wards']
  });
  document.getElementById('pd').innerHTML = states.length
    ? `<h3>${states[0].properties.Ward_Name}</h3><p> Ward No. : <strong><em>${states[0].properties.Ward_No}</strong></em></p>`
    : `<p>Hover over a state!</p>`;
});
// Set the default cursor style
map.getCanvas().style.cursor = 'default';

// show USA on load
// map.fitBounds([
//   [77.1025,28.7041],// southwestern corner of the bounds
//   [77.1025,28.7041]// northeastern corner of the bounds
// ]);
});