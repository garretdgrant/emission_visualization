import * as d3 from 'd3';
import { statesGet } from './Cities';
import Chart from 'chart.js/auto'
import { forceCenter, utcMillisecond } from 'd3';


const maxMinData = () =>{
  const statesArray = Object.values(statesGet())
  const maxMin = {
    max: 0,
    min: 100
  };
  for (let j = 0; j < statesArray.length; j++){
    const currentMax = maxMin['max'];
    const currentMin = maxMin['min']
    const currentLevel = statesArray[j]['2019'];
    if (currentLevel > currentMax){
      maxMin['max'] = currentLevel;
    } else if (currentLevel < currentMin){
      maxMin['min'] = currentLevel;
    }
  }
  return maxMin;
}

export const renderMap = async ()=>{
    
    let width = 1000, height = 425
      
    let svg = d3.select("div.states").append("svg")
              .attr("width", width)
              .attr("height", height)
    

    // A projection tells D3 how to orient the GeoJSON features
    let usaProjection = d3.geoAlbersUsa()
        .scale(screen.width/2)
        .translate([500, 225])


    // The path generator uses the projection to convert the GeoJSON
    // geometry to a set of coordinates that D3 can understand

    let pathGenerator = d3.geoPath().projection(usaProjection)
    let geoJsonUrl = "https://raw.githubusercontent.com/loganpowell/census-geojson/master/GeoJSON/20m/2021/state.json"


    // Request the GeoJSON
    const states = statesGet();
    d3.json(geoJsonUrl).then(geojson => {

      
    svg.selectAll("path")
        .data(geojson.features)
        .enter()
        .append("path")
        .attr("d", pathGenerator) // This is where the magic happens
        .attr('fill', (object)=> {
          const state = states[object.properties.NAME]
          if (!state){
            return 'blue'
          }
          const percentMax = state['2019']/maxMinData()['max'] 
          if (percentMax > 0.3) return '#ff0000';
          if (percentMax > 0.20) return '#ffa700';
          if (percentMax > 0.10) return '#fff400';
          if (percentMax > .03) return '#a3ff00';
          return '#2cba00'
        })
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
        .attr("stroke", "grey") // Color of the lines themselves
        .attr('stroke-width', 2)
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


const createStateLineChart = async (stateName)=>{
  const states = statesGet();
  const state = states[stateName];
  const yearlies = {};
      // let delta = stateObject.Percent
      for (let j = 1970; j <= 2019; j++){
        yearlies[j] = state[`${j}`]
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
      text: `${stateName}'s Historical CO2 Emissions`,
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
