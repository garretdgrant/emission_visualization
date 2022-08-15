const cities = [
  {
    "State": "Wisconsin, USA",
    "Lat": 44.5,
    "Long": -89.5
  },
  {
    "State": "West Virginia, USA",
    "Lat": 39,
    "Long": -80.5
  },
  {
    "State": "Vermont, USA",
    "Lat": 44,
    "Long": -72.699997
  },
  {
    "State": "Texas, the USA",
    "Lat": 31,
    "Long": -100
  },
  {
    "State": "South Dakota, the US",
    "Lat": 44.5,
    "Long": -100
  },
  {
    "State": "Rhode Island, the US",
    "Lat": 41.742325,
    "Long": -71.742332
  },
  {
    "State": "Oregon, the US",
    "Lat": 44,
    "Long": -120.5
  },
  {
    "State": "New York, USA",
    "Lat": 43,
    "Long": -75
  },
  {
    "State": "New Hampshire, USA",
    "Lat": 44,
    "Long": -71.5
  },
  {
    "State": "Nebraska, USA",
    "Lat": 41.5,
    "Long": -100
  },
  {
    "State": "Kansas, the US",
    "Lat": 38.5,
    "Long": -98
  },
  {
    "State": "Mississippi, USA",
    "Lat": 33,
    "Long": -90
  },
  {
    "State": "Illinois, USA",
    "Lat": 40,
    "Long": -89
  },
  {
    "State": "Delaware, the US",
    "Lat": 39,
    "Long": -75.5
  },
  {
    "State": "Connecticut, USA",
    "Lat": 41.599998,
    "Long": -72.699997
  },
  {
    "State": "Arkansas, the US",
    "Lat": 34.799999,
    "Long": -92.199997
  },
  {
    "State": "Indiana, USA",
    "Lat": 40.273502,
    "Long": -86.126976
  },
  {
    "State": "Missouri, USA",
    "Lat": 38.573936,
    "Long": -92.60376
  },
  {
    "State": "Florida, USA",
    "Lat": 27.994402,
    "Long": -81.760254
  },
  {
    "State": "Nevada, USA",
    "Lat": 39.876019,
    "Long": -117.224121
  },
  {
    "State": "Maine, the USA",
    "Lat": 45.367584,
    "Long": -68.972168
  },
  {
    "State": "Michigan, USA",
    "Lat": 44.182205,
    "Long": -84.506836
  },
  {
    "State": "Georgia, the USA",
    "Lat": 33.247875,
    "Long": -83.441162
  },
  // {
  //   "State": "Hawaii, USA",
  //   "Lat": 19.741755,
  //   "Long": -155.844437
  // },
  {
    "State": "Alaska, USA",
    "Lat": 66.160507,
    "Long": -153.369141
  },
  {
    "State": "Tennessee, USA",
    "Lat": 35.860119,
    "Long": -86.660156
  },
  {
    "State": "Virginia, USA",
    "Lat": 37.926868,
    "Long": -78.024902
  },
  {
    "State": "New Jersey, USA",
    "Lat": 39.833851,
    "Long": -74.871826
  },
  {
    "State": "Kentucky, USA",
    "Lat": 37.839333,
    "Long": -84.27002
  },
  {
    "State": "North Dakota, USA",
    "Lat": 47.650589,
    "Long": -100.437012
  },
  {
    "State": "Minnesota, USA",
    "Lat": 46.39241,
    "Long": -94.63623
  },
  {
    "State": "Oklahoma, the USA",
    "Lat": 36.084621,
    "Long": -96.921387
  },
  {
    "State": "Montana, USA",
    "Lat": 46.96526,
    "Long": -109.533691
  },
  {
    "State": "Washington, the USA",
    "Lat": 47.751076,
    "Long": -120.740135
  },
  {
    "State": "Utah, USA",
    "Lat": 39.41922,
    "Long": -111.950684
  },
  {
    "State": "Colorado, USA",
    "Lat": 39.113014,
    "Long": -105.358887
  },
  {
    "State": "Ohio, USA",
    "Lat": 40.367474,
    "Long": -82.996216
  },
  {
    "State": "Alabama, USA",
    "Lat": 32.31823,
    "Long": -86.902298
  },
  {
    "State": "Iowa, the USA",
    "Lat": 42.032974,
    "Long": -93.581543
  },
  {
    "State": "New Mexico, USA",
    "Lat": 34.307144,
    "Long": -106.018066
  },
  {
    "State": "South Carolina, USA",
    "Lat": 33.836082,
    "Long": -81.163727
  },
  {
    "State": "Pennsylvania, USA",
    "Lat": 41.203323,
    "Long": -77.194527
  },
  {
    "State": "Arizona, USA",
    "Lat": 34.048927,
    "Long": -111.093735
  },
  {
    "State": "Maryland, USA",
    "Lat": 39.045753,
    "Long": -76.641273
  },
  {
    "State": "Massachusetts, USA",
    "Lat": 42.407211,
    "Long": -71.382439
  },
  {
    "State": "California, the USA",
    "Lat": 36.778259,
    "Long": -119.417931
  },
  {
    "State": "Idaho, USA",
    "Lat": 44.068203,
    "Long": -114.742043
  },
  {
    "State": "Wyoming, USA",
    "Lat": 43.07597,
    "Long": -107.290283
  },
  {
    "State": "North Carolina, USA",
    "Lat": 35.782169,
    "Long": -80.793457
  },
  {
    "State": "Louisiana, USA",
    "Lat": 30.39183,
    "Long": -92.329102
  }
]

export const stateNames = ()=>{
  let states = [];
  for(let i = 0; i < cities.length; i++){
      states.push(cities[i]['State'].split(',')[0])
  }
  return states;
}





export const citiesGet = () =>{
  return cities;
}

// let lat = "Lat"
// let long = "Long"

//   export const fetcher = async (i)  => {
    
//     let point1 = cities[i][lat]
//     let point2 = cities[i][long]
//     let url = `https://api.v2.emissions-api.org/api/v2/carbonmonoxide/average.json?point=${point1}&point=${point2}&begin=2019-02-10&end=2019-02-11&limit=100&offset=0`
//     const got = await fetch(url);
//     // console.log(got.json());
  
// }