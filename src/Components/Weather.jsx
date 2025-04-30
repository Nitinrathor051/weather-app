import React, { useState } from "react";
import "./Weather.css"

function Weather(){
    const [cityName, setcityName] = useState("")
    const [weatherData, setweatherData] = useState(null)
    const [loading, setloading] = useState(false)
    const [error, seterror] = useState("")

    const submitHandler = async (e) => {
        e.preventDefault();
            seterror("")
            setweatherData(null)

            if(cityName.trim().length == 0){
                seterror("Please enter city name")
                return;
            }
            setloading(true)
            try{
                let response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=cc016f04b72f94c3006e639acf919fd9&units=metric`
                )

                console.log(response);
                if(!response.ok){
                    seterror("City not found ....")
                    setloading(false)
                    return;
                }

                let data = await response.json();
                console.log(data);

                setweatherData(data)
                setcityName("")
                setloading(false)

            } catch (error){
                seterror(error.message || "Something went wrong") 
            }
        }

    return(
        <div className="weather-container">
            <h1>Weather Application</h1>
            <form className="form" onSubmit={submitHandler}>
                <input type="text" placeholder="Enter city name" value={cityName} onChange={(e) => setcityName(e.target.value)} />
                <button className="btn" type="submit">Get weather details</button>
            </form>
            {loading && <span className="loading">Loading weather data...</span> }
            {error && <span className="errors">{error}</span> }

            {weatherData &&(
                <div className="weather-details">
                    <h2>{weatherData.name},{weatherData.sys.country}</h2>
                    <p>Temperature: {weatherData.main.temp}°C</p>
                    <p>Weather: {weatherData.weather[0].description}</p>
                    <p>Humidity: {weatherData.main.humidity}%</p>
                    <p>Wind Speed: {weatherData.wind.speed}m/s</p>
                </div>
            )}
        </div>
    )
}
export default Weather;