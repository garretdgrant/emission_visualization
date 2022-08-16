/**
 * Solving for the 20k data point
 * 1) Classify each data point to a state(we know long, lat, some translation)
 * 2)
 */






// import {citiesGet, stateNames} from './scripts/Cities';
// import * as d3 from 'd3';
import { renderEmissions, renderMap, stateObjects } from './scripts/visualization';





addEventListener('DOMContentLoaded',  async (event) => {
    // let data = await fetchData()
    // console.log(data)

    


    // Gathering state emissions data from api
    // let emissions = {};
    // data().then(res=> emissions = res);
    
    
    //Rendering the emission data points
   await renderEmissions()//.then(res => renderMap());
   setTimeout(()=>renderMap(), 10000)
    // renderMap();
    //rendering the map border
   

});