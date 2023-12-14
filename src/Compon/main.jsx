import { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import cloud from "./img/free-icon-cloud-4745474.png";
import drizzle from "./img/free-icon-cloudy-6316087.png";
import sun from "./img/free-icon-sun-1889778.png";
import mist from "./img/free-icon-fog-3750506.png";
import snow from "./img/free-icon-snowflake-691999.png";
import rain from "./img/free-icon-rain-1458404.png";
import search from "./img/free-icon-magnifier-2725317.png";
import wind from "./img/free-icon-wind-2531724.png";
import humidity from "./img/free-icon-humidity-481453.png";
import celsius from "./img/free-icon-celsius-474805.png";

const API_KEY = "400bc08eb5621c6b2dfb2c7f3a6b5c5e";


const Main = () => {
  const [weather, setWeather] = useState({
    name: "",
    humidity: 999,
    speed: 999,
    img: "",
  });
  const [comm, setComm] = useState("");
  const [ip, setIp] = useState("");
  const [cel, setcel] = useState([]);
  const [inp, setInp] = useState("");
  let celll = Math.round(cel - 273.15);
  let IpCity = ip.city;

  const handlerInp = (e) => {
    setInp(e.target.value);
    console.log(`input value:${inp}`);
    console.log(inp);
  };

  // const getCurrentLocation = async (ipName) => {
  //   const response = await axios.get(
  //     `http://ipinfo.io/${ipName}?token=f022cd9bfd20f1`
  //   );
  //   setIp(response.data);
  //   console.log(ip.city);
  // };
  // console.log(ip.city);
  // useEffect(() => {
  //   getCurrentLocation(inp);
  // }, [inp]);

  const getCurrentLocation = (IpName) => {
    const getIp = `http://ipinfo.io/${IpName}?token=f022cd9bfd20f1`;
    axios
      .get(getIp)
      .then((response) => {
        setIp(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(IpCity);

  useEffect(() => {
    getCurrentLocation(inp);
  }, [inp]);

 


  const handlerBtn = () => {
    if (inp=="" ) {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${IpCity}&appid=${API_KEY}`;
      axios
        .get(apiUrl)
        .then((res) => {
          let weatrherImg = "";
          if (res.data.weather[0].main == "Clouds") {
            weatrherImg = cloud;
          } else if (res.data.weather[0].main == "Clear") {
            weatrherImg = sun;
          } else if (res.data.weather[0].main == "Rain") {
            weatrherImg = rain;
          } else if (res.data.weather[0].main == "Drizzle") {
            weatrherImg = drizzle;
          } else if (res.data.weather[0].main == "Mist") {
            weatrherImg = mist;
          } else if (res.data.weather[0].main == "Snow") {
            weatrherImg = snow;
          } else {
            weatrherImg = "./img/free-icon-cloud-4745474.png";
          }
          setWeather({
            ...weather,
            img: weatrherImg,
            name: res.data.name,
            humidity: res.data.main.humidity,
            speed: res.data.wind.speed,
          });

          setcel(res.data.main.temp);
          console.log(weather);
        })
        .catch((err) => {
          console.log(err);
         
        });
    } else {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inp}&appid=${API_KEY}`;
      axios
        .get(apiUrl)
        .then((res) => {
          let weatrherImg = "";
          if (res.data.weather[0].main == "Clouds") {
            weatrherImg = cloud;
          } else if (res.data.weather[0].main == "Clear") {
            weatrherImg = sun;
          } else if (res.data.weather[0].main == "Rain") {
            weatrherImg = rain;
          } else if (res.data.weather[0].main == "Drizzle") {
            weatrherImg = drizzle;
          } else if (res.data.weather[0].main == "Mist") {
            weatrherImg = mist;
          } else if (res.data.weather[0].main == "Snow") {
            weatrherImg = snow;
          } else {
            weatrherImg = "./img/free-icon-cloud-4745474.png";
          }
          setWeather({
            ...weather,
            img: weatrherImg,
            name: res.data.name,
            humidity: res.data.main.humidity,
            speed: res.data.wind.speed,
          });

          setcel(res.data.main.temp);
          console.log(weather);
        })
        .catch((err) => {
         console.log(err);
        });
    }
  };
  // useEffect(()=>{
  //   handlerBtn()
  // })

  //   const getWeather = async (city) => {
  // let celll = Math.round(cel - 273.15);
  //     const response = await axios.get(
  //       `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
  //     );

  //     setWeather(response.data);

  // setcel(response.data.main.temp);
  //     console.log(weather);
  //     console.log(celll);
  //   };

  //   useEffect(() => {
  //     getWeather(inp);
  // }, [inp]);

  return (
    <>
      <div className="main">
        <div className="logo">
          <img src={sun} alt="" className="logoImg"/>
          <p className="logoP">yourWeather</p>
        </div>
        <div className="weather">
          <div className="findBar">
            <input
              className="findBarInput"
              type="text"
              onChange={handlerInp}
              onKeyDown={handlerBtn}
              placeholder="Enter city"
            />
            <button
              className="findBarBtn"
              onClick={handlerBtn}
              onKeyDown={handlerBtn}
            >
              <img className="searchBtn" src={search} alt="" />
            </button>
          </div>

          {inp == "" ? (
            // <div>{IpCity}
          
            // </div>
       
            <div className="indicators">
            <img
              className="weatherIcn"
              src={weather.img}
              alt="Мы потеряли иконку("
            />
            <div className="temp">
              {celll == "-273" ? "" : <p className="tempCel">{celll}</p>}
              <img className="cels" src={celsius} alt="" />
            </div>

            <p className="WeatherName">{weather.name}</p>

            <div className="humidityAndSpeed">
              {weather.humidity == "999" ? (
                ""
              ) : (
                <div className="a">
                  <img className="humidity" src={humidity} alt="" />

                  <p className="h">{weather.humidity} %</p>
                  {/* <p className="h">humidity</p> */}
                </div>
              )}
              {weather.speed == "999" ? (
                ""
              ) : (
                <div className="a">
                  <img className="wind" src={wind} alt="" />
                  <p className="h">{Math.round(weather.speed)} km/h</p>

                  {/* <p>wind</p> */}
                </div>
              )}
            </div>
          </div>
          ) : (
            <div className="indicators">
              <img
                className="weatherIcn"
                src={weather.img}
                alt="Мы потеряли иконку("
              />
              <div className="temp">
                {celll == "-273" ? "" : <p className="tempCel">{celll}</p>}
                <img className="cels" src={celsius} alt="" />
              </div>

              <p className="WeatherName">{weather.name}</p>

              <div className="humidityAndSpeed">
                {weather.humidity == "999" ? (
                  ""
                ) : (
                  <div className="a">
                    <img className="humidity" src={humidity} alt="" />

                    <p className="h">{weather.humidity} %</p>
                    {/* <p className="h">humidity</p> */}
                  </div>
                )}
                {weather.speed == "999" ? (
                  ""
                ) : (
                  <div className="a">
                    <img className="wind" src={wind} alt="" />
                    <p className="h">{Math.round(weather.speed)} km/h</p>

                    {/* <p>wind</p> */}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Main;
