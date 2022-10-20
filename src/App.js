import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";
export default function App() {
  const [searchCity, setSearchCity] = useState("");
  const [data, setData] = useState(null);
   
   
   
  useEffect(() => {
    const url = `http://api.weatherstack.com/current?access_key=2a3304210c460ff51e1cf56e9f1c922c&query=${searchCity}`;
    fetch(url)
      .then((res) => res.json())
      .then((result) =>setData(result) )
      .catch((error) => console.log(error));
    
  },[searchCity]);

  function handleSearch(e) {
    setSearchCity(e.target.value);
  }

  function getDayName(dayname){
    let days=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
    return days[dayname];
  }
  return (
    <div className="App">
      <h1>Weather Forecast App</h1>
      <input type="search" onChange={handleSearch} placeholder="Search city for temperature.."></input>
     
      <div id="dataContainer">
       {
        !data || searchCity===""?(<p></p>):<div>

          <div id="weatherData1">
               <div id="timeData">
                  <p id="date">{getDayName(new Date(data?.location?.localtime.toString().split(" ")[0]).getDay())+"."+new Date(data?.location?.localtime.toString().split(" ")[0]).toLocaleDateString()}</p>
                  <p id="time">{data?.location?.localtime.toString().split(" ")[1]}</p>
                 
                 </div>
               <p id="temp">{data.current?.temperature}<sup><sup>o</sup>C</sup></p>
               
               <div id="weatherIconsHolder">
               <img src={data?.current?.weather_icons[0]} alt="img"/>
               <p>{data?.current?.weather_descriptions[0]}</p>
               </div>

          </div>

          <div id="weatherData2">
            
           <div id="MinMaxTemp">
              
              <p>Max:{data.current?.temperature}<sup><sup>o</sup>C</sup></p>
              <p>Min:D/N/A</p>
              </div>
         
           <div id="windDataHolder">
              <p>Wind:{data.current?.wind_dir}</p>
              <p>{data.current?.wind_speed}km/h</p>
              </div>

            </div>

        </div>
       }
      </div>
    </div>
  );
}


