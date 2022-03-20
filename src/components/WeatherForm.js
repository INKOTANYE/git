import React, { useState} from 'react'
import {MdLocationOn} from "react-icons/md"
import {MdWaterDrop} from "react-icons/md"
import {BsFillCalendarDateFill} from "react-icons/bs"
import {BiWind} from "react-icons/bi"
import {GrDebian} from "react-icons/gr"
import {ImFire} from "react-icons/im"


function WeatherForm (props) {
    const {weather}  = props
    const {currentCity}  = props
    const {city}  = props
   
   
    const[id, setId]=useState([
      {id:0,active:false},
      {id:1,active:false},
      {id:2,active:false},
      {id:3,active:false},
      {id:4,active:false},
      {id:5,active:false},
      {id:6,active:false},
      {id:7,active:false}
    ])

    const handleId= (key)=>{
      const newItem= id.find(({id})=>id===key)
      newItem.active = !newItem.active
      setId([...id])
    }

   if(!weather ) {
      return <p>Loading...</p>
    }
   
  return (
    <div className='panel'>
        <div className='weather' >
           {weather.daily.map((data,key) => (
          <div >   
           <div  className='hover' onClick={()=>{handleId(key)}}>
             <div id="widget" className={new Date(data.dt*1000).toDateString()===new Date().toDateString() ? id[key].active ? "both" : "active" : id[key].active ?  "selected" :"" } >              
                  <div className="day">{['Sun ', 'Mon ', 'Tue ', 'Wed ', 'Thu ', 'Fri ', 'Sat '][new Date(data.dt*1000).getDay()]}   
                  <div className="city"> <MdLocationOn/> {city ? city :currentCity}</div></div>
                  <div className="icon">{<img src ={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} alt="wthr img" />}</div>
                  <div className="temp"><ImFire/> {data.temp.max}&deg; </div>
                  <div className="desc">{data.weather[0].description}</div>       
             </div>  
           </div> 

           <div>
             {id[key].active &&
              <div className='info'>
                  <p><BsFillCalendarDateFill/> {new Date(data.dt*1000).toDateString()}</p>
                  <p><MdWaterDrop/> Humidity {data.humidity}%</p>
                  <p><BiWind/> Wind {data.wind_speed} km/h</p>
                  <p><GrDebian/> Pressure {data.pressure}hPa</p>
             </div>  }
             
        </div>  
          </div> 
            ))}

           
        </div>                     
    </div> 
  )
}

export default WeatherForm