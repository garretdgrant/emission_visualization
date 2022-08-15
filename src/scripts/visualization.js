import * as d3 from 'd3';
import { stateNames } from './Cities';
// import * as atlas from '../data/'

export const render = ()=>{
  // Setting up the svg element for D3 to draw in
let width = 1000, height = 600

let svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)

// A projection tells D3 how to orient the GeoJSON features
let usaProjection = d3.geoAlbersUsa()
	.scale(1000)
  .translate([500, 300])


// The path generator uses the projection to convert the GeoJSON
// geometry to a set of coordinates that D3 can understand


  let pathGenerator = d3.geoPath().projection(usaProjection)
  let geoJsonUrl = "https://raw.githubusercontent.com/loganpowell/census-geojson/master/GeoJSON/20m/2021/state.json"


// Request the GeoJSON
d3.json(geoJsonUrl).then(geojson => {
	// Tell D3 to render a path for each GeoJSON feature
    // console.log(geojson.features)
//   geojson.features.forEach(element => {
//     console.log(element)
//   });
  svg.selectAll("path")
    .data(geojson.features)
    .enter()
    .append("path")
    .attr("d", pathGenerator) // This is where the magic happens
    .on('mouseover', function(event){
       let title = d3.select('h1');
       title.text(this.dataset.names)
    }) // es5 vs es6
    .attr("stroke", "black") // Color of the lines themselves
    .attr("fill", "green") // Color uses to fill in the lines
    .attr('data-names', (state)=>{
        return state.properties.NAME
    })//add stateNames to paths
})
}

export const stateObjects = ()=>{
    let geoJsonUrl = "https://raw.githubusercontent.com/loganpowell/census-geojson/master/GeoJSON/20m/2021/state.json"

    let stateObjects;
    d3.json(geoJsonUrl).then(data=>{
        console.log(data.features)
        stateObjects = data.features;
    })
    return stateObjects;
}
