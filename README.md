# Emission Visualization

![GitHub language count](https://img.shields.io/github/languages/count/garretdgrant/emission_visualization?style=flat-square)
![GitHub top language](https://img.shields.io/github/languages/top/garretdgrant/emission_visualization)

A tool built to increase visbility to and readability of the latest CO and CO2 data.

Live Link: https://garretdgrant.github.io/emission_visualization/

Table of Contents
---
---

1) Background

2) Functionality and MVP's

3) Screenshots and Video Demonstrations

4) Technologies, Libraries, and API's


# Background


This application displays Carbon Monoxide (CO) and Carbon Dioxide (CO2) emissions data across the United States. On launch the application loads thousands of CO data points from the emissions api. The map is filled in with these data points, allowing a seamless view of CO across the country. Individual states on the map can be clicked to display the historical CO2 data over the last 20 years for that state. 


# Functionality and MVP's


In Emission Visualization, users are be able to:

1) Access continuously updated data on carbon monoxide emmisions accross the United States via satellite data provided by Emissions Api https://emissions-api.org/
2) Interact with state map, and graphs with a variety of :hover and :active events.
3) See a variety of stylized representations of data.

In addition, this project includes:

1) An introductory modal briefly describing the project, simple instructions for use of the visualizer, and links by which users can professionally connect with me.
2) A production README.

# Screenshots and Video Demonstrations

## 1) Modal with simple instructions on how to use the application, closes on click. 

![Getting Started](/public/ev_instruction_modal.jpg)

## 2) Upon initialization queries the Emissions API to retrieve most recent sattelite data on carbon monoxide for the united states

``` javascript
     // The path generator uses the projection to convert the GeoJSON
      // geometry to a set of coordinates that D3 can understand
      let pathGenerator = d3.geoPath().projection(usaProjection)
      let geoJsonUrl = "https://api.v2.emissions-api.org/api/v2/carbonmonoxide/geo.json?country=USA&begin=2021-02-01&end=2021-02-11&limit=7000&offset=0"
      // Request the GeoJSON
       d3.json(geoJsonUrl).then(geojson => {
          //...
       
}
```

## 3) Clickable states that render a modal displaying a 20 year historical carbon dioxide chart

![](https://media.giphy.com/media/457Fy9QJ9PnRublNRP/giphy.gif)

``` javascript
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
```



# Technologies, Libraries, and API's


1) D3.js
2) Charts.js
4) webpack
3) https://emissions-api.org/
