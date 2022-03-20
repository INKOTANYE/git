import React, { useEffect, useState } from 'react'
import axios from "axios"
import {usePosition} from "use-position"
import SelectCity from './SelectCity'
import WeatherForm from "./WeatherForm"

function WeatherApp() {
    const [weather,setWeather]=useState()
    const [currentCity,setCurrentCity]=useState()
    const {latitude, longitude}=usePosition()
    const [city, setCity]=useState()
    const [loc, setLoc]=useState({})
   

    const getWeatherData = async (lat, lon) => {

        try {
            const {data}=await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=f6b4e42362dd52e7c697536026285a54&units=metric`)
            setWeather(data)
            console.log(data);
        } catch {
        alert("WEATHER ERROR")}   
    }

   const getLocation =  (city) => {

    const axios = require('axios');
    const params = {
      auth: '181489584652590129024x19144',
      locate:`${city}`,
      json: '1'
    }
    
    axios.get('https://geocode.xyz', {params})
      .then(response => {
        let newLoc= {
            lat:response.data.latt,
            lon:response.data.longt
        }
        setLoc(newLoc)
      }).catch(error => {
        alert("Loc error");
      });  
    } 

    const getCurrentCity = async (lat, lon) => {

      try {
        const {data}=await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`)
        setCurrentCity(data.city)
      } catch {
      alert("CURRENT CITY ERROR")}   
  }


    useEffect(() => {
    latitude && longitude && getWeatherData(latitude, longitude);
    },[latitude, longitude])


    useEffect(() => {
    city && getLocation(city)
    },[city])

    useEffect(() => { 
    {loc.lat && loc.lon ? getWeatherData(loc.lat,loc.lon): getCurrentCity(latitude, longitude)}
    },[loc])

  return (
    <div className='weather-app'>
        <h1>Weather Forecast</h1>
        <SelectCity city={city} selectCity={setCity}/>
        <WeatherForm weather={weather} currentCity={currentCity} city={city}/>
        
    </div>
  )
}

export default WeatherApp