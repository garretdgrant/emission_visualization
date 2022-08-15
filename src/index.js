// import {citiesGet, stateNames} from './scripts/Cities';
// import * as d3 from 'd3';
import { render, stateObjects } from './scripts/visualization';
import {fetchData} from './scripts/fetch'
import { async } from 'regenerator-runtime';



addEventListener('DOMContentLoaded', async (event) => {
    let data = await fetchData()
    console.log(data)

    


    // Gathering state emissions data from api
    // let emissions = {};
    // data().then(res=> emissions = res);
    
    
    //Rendering the US map
    // fetch();
    
    render();
   

});