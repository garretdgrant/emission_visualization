import * as d3 from 'd3';
import { statesGet} from './Cities';
import Chart from 'chart.js/auto'
import { forceCenter, utcMillisecond } from 'd3';


export const renderMap = async ()=>{
    
    let width = 1000, height = 600
      
    let svg = d3.select("div.states").append("svg")
              .attr("width", width)
              .attr("height", height)
    

    // A projection tells D3 how to orient the GeoJSON features
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
            
            title.text('Click a State:')
            }) 
        .on('click', function(event){
          let chart = d3.select('.stateChart')
          createStateLineChart(this.dataset.names);
          d3.select('.stateChart').style('opacity', 1)
            .style('pointer-events', 'auto')
            .on('click',function(){
              d3.select('.stateChart').style('opacity', 0)
              .style('pointer-events', 'none')
            })
  
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
        stateObjects = data.features;
    })
    return stateObjects;
}

export const renderEmissions = async ()=>{
    // Setting up the svg element for D3 to draw in
      let width = 1000, height = 600
  
      let svg = d3.select(".emissions").append("svg")
          .attr("width", width)
          .attr("height", height)
   
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
        
        let max = .049;
        let min = .0139;
        let counter = 0
      svg.selectAll("path")
          .data(geojson.features)
          .enter()
          .append("path")
          .attr("d", pathGenerator) // This is where the magic happens
          .attr("fill", object=>{
            counter +=1;
            let value = object.properties.value;
          //max = 0.491, min =.0139
           let dScale = (max-min)/5;
            // if (value < (min + dScale)) {return '#ffbaba'}else if(value < min + 2* dScale){return '#ff7b7b'}
            // else if(value < min + 3 * dScale) {return '#ff5252'} else if(value< min + 3.5 * dScale){return '#702963'};
            // return '#301934';
            if (value < (min + dScale)) {return '#2cba00'}else if(value < min + 2* dScale){return '#a3ff00'}
            else if(value < min + 3 * dScale) {return '#fff400'} else if(value< min + 3.5 * dScale){return '#ffa700'};
            return '#ff0000';
          } ) 
      })
  }


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
      break;
    } 
    
  }
  let canvas = document.getElementById('chart')

  //If no chart exist, we need to create a new canvs
  if(!canvas){
    d3.select('body')
      .append('div').attr('class', 'stateChart')
      d3.select('.stateChart')
      .append('div').attr('class', 'modalContainer')
      d3.select('.modalContainer')
      .append('canvas').attr('id', 'chart')
    d3.select('modalButtons')
      .append('button').attr('class','close').text('X')
    canvas = document.getElementById('chart')
    //If a chart does exist we need to delete the old canvas and create a new one
  } else {
    //create a nice chart
    //need to delete the canvas
    d3.select('canvas').remove();
    d3.select('.modalContainer').append('canvas').attr('id', 'chart')
    canvas = document.getElementById('chart')
  }
  

 
  let ctx = canvas.getContext('2d')
  const data = {
    labels: Object.keys(yearlies),
    datasets: [{
      data: Object.values(yearlies),
      fill: true,
      xAxisId: 'year', 
      yAxisId: 'CO2'
    }]
  };

  
    const elements =  {
     
      point: {
        pointStyle: 'circle',
        radius: 4,
        hoverRadius: 15,
        borderColor: '#2e424d',
        backgroundColor: '#5B8291'
      },
      line: {
        borderColor: '#2e424d',
        tension: 0.1
      }
    };

    const font = {
      size: 18,
      weight: 'bold',
      family: "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif"
      };

    const titleFont = {
      size: 24,
      weight: 'bolder',
      family: "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif"
    };

    const ticks = {
      color: '#5B8291',
      font: {size: 14, weight: 'bold'}
    }

    const scales = {
      yAxis: {
        ticks: ticks,
        grid:{
          color: '#5B8291'
        },
        title: {
          text: 'CO2 Emissions (million metric tons)',
          display: true,
          color: '#5B8291',
          font: font,
          // padding: 10
        }
      },
      xAxis: {
        ticks: ticks,
        grid:{
          color: '#5B8291'
        },
        title: {
          text: 'Year',
          display: true,
          color: '#5B8291',
          font: font,
          // padding: 10
      } 
    }
  };
  
  const plugins = {
    legend: {
      display: false
    },
    title: {
      display: true,
      text: `${state}'s Historical CO2 Emissions`,
      color: '#5B8291',
      font: titleFont
    }
  };

   const myChart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: {
        elements: elements,
        scales: scales,
        plugins: plugins
      }
   })
  
 
}

export const closeInstructions = ()=>{
  d3.select('#instruction_modal')
    .on('click', function(){
      d3.select('#instruction_modal').attr('opacity', 0)
      .attr('pointer-events', 'none')
    })
 }
