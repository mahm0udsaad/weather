import { useEffect, useState } from 'react';
import axios from 'axios'

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [location , setLocation] = useState({lat:0 , lon:0})
  const citys = [
    "New York City",
    "Paris",
    "London",
    "Tokyo",
    "Rome",
    "Sydney",
    "Cairo",
    "Beijing",
    "Rio de Janeiro",
    "Moscow",
    "Dubai",
    "Mumbai",
    "Cape Town",
    "Buenos Aires",
    "Amsterdam",
    "Bangkok",
    "Toronto",
    "Singapore",
    "Berlin",
    "Istanbul",
    "Seoul",
    "Havana",
    "Lisbon",
    "Athens",
    "Stockholm",
    "Mexico City",
    "Hong Kong",
    "Johannesburg",
    "Auckland",
  ];
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((postion)=> setLocation({lat: postion.coords.latitude,lon:postion.coords.longitude}))
    axios.post('https://weather-api-fpk7.onrender.com/weather',location)
      .then(res => setWeatherData(res.data))
      .catch(err=> console.error(err))
  }, []);
  
  function getCity(city){
    fetch(`https://weather-api-fpk7.onrender.com/weather/${city}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ city })
    })
    .then(response => response.json())
    .then(data => {
      setWeatherData(data)
    })
    .catch(error => {
      console.log(error);
    });
  }

  return (
    <>
    <div>
    {weatherData ? (
  <div className='weather-card'>
    <h2>Current Weather</h2>
    <img src={weatherData.current.condition.icon} alt="icon" />
    <p>Location: {weatherData.location.name}, {weatherData.location.region}, {weatherData.location.country}</p>
    <p>Temperature: {weatherData.current.temp_c}°C / {weatherData.current.temp_f}°C</p>
    <p>Condition: {weatherData.current.condition.text}</p>
    <div className='cityBtns'>
      {citys.map(city => (
        <button className='cityBtn' key={city} onClick={() => getCity(city)}>{city}</button>
      ))}
    </div>
  </div>

) : (
  <p className='load'>Loading weather data...</p>
)}
  </div>
  </>

  )
}


