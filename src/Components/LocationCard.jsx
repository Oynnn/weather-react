import React, { useRef, useState } from "react";
import Line from "./Line";
import WeatherCard from "./WeatherCard";

function LocationCard() {

   let [showLocationCard, setshowLocatinCard] = useState(true);
   let [location, setlocation] = useState();
   let locationInputRef = useRef();

   function setCurrentLocation(location) {
      if (typeof location == 'object') { location = `${location.coords.latitude},${location.coords.longitude}` };
      setlocation(location);
      setshowLocatinCard(false);
   };

   return (
      showLocationCard ?
      <div id="location-card">
         <span className="get-weather-text">Get weather</span>
         <hr />
            <form id="location-form" onSubmit={(event) => {
               event.preventDefault();
               setCurrentLocation(locationInputRef.current.value);
            }}>
            <input 
               id="location-input" 
               ref={locationInputRef}
               type="text" 
               placeholder="Your city..."
               autoComplete="false"
            />
         </form>
         <div className="or-container">
            <Line width={30}/>or<Line width={30}/>
         </div>
            <button id="location-button" onClick={() => { navigator.geolocation.getCurrentPosition(setCurrentLocation) }}>Get your location!</button>
      </div>
      :
      <WeatherCard location={location}/>
   );

};

export default LocationCard;