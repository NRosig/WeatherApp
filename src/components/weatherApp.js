import { useEffect, useState } from "react";
import WeatherForm from "./weatherForm";
import WeatherMainInfo from "./weatherMainInfo";
import styles from "./weatherApp.module.css"

const WeatherApp = () => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    loadInfo()
  }, []);

  useEffect(() => {
    document.title =  `Weather | ${weather?.location.name ?? ""}`;
  }, [weather]);

   async function loadInfo(city = "London"){
    try {
      const request = await fetch(`${process.env.REACT_APP_URL}&key=${process.env.REACT_APP_KEY}&q=${city}`
      );

      const infoApi = await request.json();
      
      setWeather(infoApi);

      console.log(infoApi)

    } catch (error) {}
  }
  

  function handleChangeCity(city) {
    setWeather(null);
    loadInfo(city)
  }

  return (
    <div className={styles.weatherContainer}>
     <WeatherForm onChangeCity={handleChangeCity} />
     <WeatherMainInfo weather={weather} />
    </div>
  );
}

export default WeatherApp;