import * as d3 from 'd3';
import { statesGet} from './Cities';
import Chart from 'chart.js/auto'
import { utcMillisecond } from 'd3';
// import * as atlas from '../data/'

export const renderMap = async ()=>{
    // d3.select('body').append('h2').text('Select a State')
    let width = 1000, height = 600
      
    let svg = d3.select("div.states").append("svg")
              .attr("width", width)
              .attr("height", height)
    

    // A projection tells D3 how to orient the GeoJSON features
    console.log('I made it here')
    let usaProjection = d3.geoAlbersUsa()
        .scale(screen.width/2)
        .translate([500, 300])


    // The path generator uses the projection to convert the GeoJSON
    // geometry to a set of coordinates that D3 can understand


    let pathGenerator = d3.geoPath().projection(usaProjection)
    let geoJsonUrl = "https://raw.githubusercontent.com/loganpowell/census-geojson/master/GeoJSON/20m/2021/state.json"


    // Request the GeoJSON
    d3.json(geoJsonUrl).then(geojson => {

    
    svg.selectAll("path")
        .data(geojson.features)
        .enter()
        .append("path")
        .attr("d", pathGenerator) // This is where the magic happens
        .on('mouseover', function(event){
        let title = d3.select('h2');
        title.text(this.dataset.names)
        }) 
        .on('mouseout', function(event){
            let title = d3.select('h2');
            title.text('Select a State:')
            }) 
        .on('click', function(event){
          let chart = d3.select('.stateChart')
          createStateLineChart(this.dataset.names);
        })
        .attr("stroke", "black") // Color of the lines themselves
        .attr('stroke-width', 2)
        .attr('fill-opacity', .1)
        .attr("fill", "transparent") // Color uses to fill in the lines
        .attr('data-names', (state)=>{
            return state.properties.NAME
        })//add stateNames to paths
        .attr('class', 'state')
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

export const renderEmissions = async ()=>{
  // console.log("taylor swift")
    // Setting up the svg element for D3 to draw in
      let width = 1000, height = 600
  
      let svg = d3.select(".emissions").append("svg")
          .attr("width", width)
          .attr("height", height)
   
    // console.log('I made it Here')
      // A projection tells D3 how to orient the GeoJSON features
      let usaProjection = d3.geoAlbersUsa()
          .scale(screen.width/2)
      .translate([500, 300])
  
  
      // The path generator uses the projection to convert the GeoJSON
      // geometry to a set of coordinates that D3 can understand
  
  
      let pathGenerator = d3.geoPath().projection(usaProjection)
      let geoJsonUrl = "https://api.v2.emissions-api.org/api/v2/carbonmonoxide/geo.json?country=USA&begin=2021-02-01&end=2021-02-11&limit=10000&offset=0"
  
  
      // Request the GeoJSON
      let dotMap;
       d3.json(geoJsonUrl).then(geojson => {
          // Tell D3 to render a path for each GeoJSON feature
        //  console.log(geojson, geojson.features)
        
        let max = .049;
        let min = .0139;
        let counter = 0
      svg.selectAll("path")
          .data(geojson.features)
          .enter()
          .append("path")
          .attr("d", pathGenerator) // This is where the magic happens
        //   .attr("stroke", "white") // Color of the lines themselves
          .attr("fill", object=>{
            counter +=1;
            let value = object.properties.value;
          //max = 0.491, min =.0139
           let dScale = (max-min)/5;
     
            if (value > min + 3 * dScale){console.log('counter')}
          
            if (value < (min + dScale)) {return '#ffbaba'}else if(value < min + 2* dScale){return '#ff7b7b'}
            else if(value < min + 3 * dScale) {return '#ff5252'} else if(value< min + 3.5 * dScale){return '#702963'};
            return '#301934';
       
          } ) // Color uses to fill in the lines
        //   .attr('r', 10)
        //   .attr('stroke', 'white')
         //add stateNames to paths
      }).then(()=>renderMap())
  }

//   addEventListener('resize', (event)=>{
//     console.log('I made it in here')
//     dotMap.scale(screen.width/2)
//     borderMap.scale(screen.width/2)
//   })


const createStateLineChart = async (state)=>{
  let states = statesGet();
  let stateObject;
  let yearlies = {};
  for (let i = 0; i < states.length; i++){
    if (states[i]['State'] === state){
      stateObject = states[i];
      let delta = stateObject.Percent
      for (let j = 1970; j <= 2019; j++){
        yearlies[j] = stateObject[`${j}`]
      }
      console.log(delta, yearlies)
      break;
    } 
    
  }
  let canvas = document.getElementById('chart')

  //If no chart exist, we need to create a new canvs
  if(!canvas){
    d3.select('.stateChart').append('canvas').attr('id', 'chart')
    canvas = document.getElementById('chart')
    //If a chart does exist we need to delete the old canvas and create a new one
  } else {
    //create a nice chart
    //need to delete the canvas
    d3.select('canvas').remove();
    d3.select('.stateChart').append('canvas').attr('id', 'chart')
    canvas = document.getElementById('chart')
  }
  
 
  let ctx = canvas.getContext('2d')
  const data = {
    labels: Object.keys(yearlies),
    datasets: [{
      label: 'My First Dataset',
      data: Object.values(yearlies),
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };
   const myChart = new Chart(ctx, {
      type: 'line',
      data: data
   })
  
}
