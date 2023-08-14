import React, { useEffect, useState } from 'react';
import { BsGeoAlt } from 'react-icons/bs';
import wind from './icons/wind.png';
import humidity from './icons/humidity.jpg';
import LocationCard from './LocationCard';

function WeatherCard({ location }) {

   let [loaded, setLoaded] = useState(false);
   let [showWeatherCard, setshowWeatherCard] = useState(true)
   
   let [weather, setweather] = useState({
      city: '',
      country: '',
      conditionText: '',
      conditionImg: '',
      temperature: '',
      windSpeed: '',
      humidity: ''
   });

   useEffect(() => {
      async function getWeather() {
         await fetch(`http://api.weatherapi.com/v1/current.json?key=8ad4834ee1244f6cb2e143628230308&q=${location}`)
         .then(resp => { return resp.ok ? resp : Error(resp) })
         .then(resp => resp.json())
         .then(resp => setweather({
            city: resp.location.name,
            country: resp.location.country,
            conditionText: resp.current.condition.text,
            conditionImg: resp.current.condition.icon,
            temperature: resp.current.temp_c,
            windSpeed: resp.current.wind_kph,
            humidity: resp.current.humidity
         }))
         .catch(error => console.log(error));
         
         setTimeout(() => {
            setLoaded(true)
         }, 1000);
      };

      getWeather();
   }, []);

   return (
      loaded ?
      (showWeatherCard ?
      <div id='weather-card'> 
         <button id='go-back' onClick={()=>setshowWeatherCard(false)}><span className='get-weather-text'>← Go back</span></button>
         <hr />
         <div id='condition-container'>
            <img
               src={weather.conditionImg}
               alt='Condition image'
               width='100px'
            />
            <div id='condition-container-text'>
               <span id='location'><BsGeoAlt />{weather.city}, {weather.country}</span>
               <span>{weather.conditionText}</span>
            </div>
         </div>
         <p id='temperature'>{weather.temperature}°C</p>
         <div id='humadity-and-wind-speed'>
            <div className='container border'>
               <img src={wind} alt='Wind icon' height='35px' />
               <span className='WandHtext'>{weather.windSpeed} km/h</span>
            </div>
            <div className='container'>
               <img src={humidity} alt='Humidity icon' height='35px' />
               <span className='WandHtext'>{weather.humidity} %</span>
            </div>
         </div>
      </div>
      :
      <LocationCard/>
      )
      :
      <span className='loader'></span>
   );

};

export default WeatherCard;