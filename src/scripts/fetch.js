import {citiesGet, stateNames} from './Cities';


// export const fetchData = async ()  => {
//     let emissions = [];
//    for(let i =0; i < 2; i++){
//     const lat = citiesGet()[i]['Lat'];
//     const lng = citiesGet()[i]['Long'];
//     const name = stateNames()[i];
//     const url = `https://api.v2.emissions-api.org/api/v2/carbonmonoxide/average.json?point=${lat}&point=${lng}&begin=2021-08-13&end=2022-08-14&limit=1&offset=0`

//     console.log("fetching")
//     const response = await fetch(url);
//     const data =  response.json();
//     return data

//     // console.log(data[0]);
//     // let emit = data[0];
//     // emissions.push([name, emit.average ]);
//     // console.log(emissions);
//     // return emissions;
//    }
// }

export const fetchData = async ()  => {
        let emissions = {};
       for(let i =0; i < citiesGet().length; i++){
        const lat = citiesGet()[i]['Lat'];
        const lng = citiesGet()[i]['Long'];
        const name = stateNames()[i];
        const url = `https://api.v2.emissions-api.org/api/v2/carbonmonoxide/average.json?point=${lat}&point=${lng}&begin=2021-08-13&end=2022-08-14&limit=1&offset=0`
   
        // console.log(i  + 1)
        // console.log(citiesGet().length)
        // console.log(citiesGet()[i]['State'])
        const response = await fetch(url)
        const data = await response.json();

        // console.log(data[0])
        let emit = data[0]
        emissions[name]= emit.average 
        // console.log(emissions)
       }
    //    console.log(emissions)
      return emissions;
    }