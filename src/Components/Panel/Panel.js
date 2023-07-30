import '../Panel/Panel.css';
import { useEffect, useState } from 'react'
const Panel = () => {
  const [d, setd] = useState("");
  const [m, setm] = useState("");
  const [y, sety] = useState("");
  const [day, setday] = useState("");
  const [temp, setTemp] = useState("-");
  const [cloud, setCloud] = useState("--");
  const [hum, setHum] = useState("--");
  const [wind, setWind] = useState("--");
  const [iconId, setIcon] = useState("day/113.png");
  const [con, setCon] = useState("---");
  const [region, setRegion] = useState("------");
  const [country, setCountry] = useState("------");
  const [time, setTime] = useState("------")
  const [city, setCity] = useState("");


  useEffect(() => {
    if (city === "") {
      sety("");
      setm("");
      setd("");
      setday("");
      setCloud("--");
      setHum("--");
      setWind("--");
      setTemp("-");
      setCity("");
      setCon("---");
      setRegion("------");
      setCountry("------");
      setTime("------");

    }
  })

  const weekday = (day, month, year) => {
    const week = [
      "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ]
    return week[new Date(`${year}-${month}-${day}`).getDay()];
  };


  const onChangeInput = (event) => {
    setCity(event.target.value);
  }
  const handleClick = () => {
    console.log(city)
    const fetchapi = async () => {
      try {
        const location = city;
        const url = `ec2-18-220-108-4.us-east-2.compute.amazonaws.com:8000/weather/?location=${location}`;
        let res = await fetch(url);
        const weather_data = await res.json();
        console.log(weather_data)
        const date = weather_data.location.localtime;
        setCity(weather_data.location.name);
        sety(parseInt(date.substr(0, 4)));
        setm(parseInt(date.substr(5, 7)));
        setd(parseInt(date.substr(8, 10)));
        setday(weekday(d, m, y));
        setCloud(weather_data.current.cloud);
        setHum(weather_data.current.humidity);
        setWind(weather_data.current.wind_kph);
        setTemp(weather_data.current.temp_c);
        setCon(weather_data.current.condition.text);
        setRegion(weather_data.location.region);
        setCountry(weather_data.location.country);
        setIcon(weather_data.current.condition.icon.substr("//cdn.weatherapi.com/weather/64x64/".length));
        setTime(weather_data.location.localtime);
        console.log(iconId);

      }
      catch (error) {
        console.log("error")
      }
    }
    fetchapi();
  }
  return (
    <>
      <div className="container">
        <h3 className="brand">Weather-App By Kotesh</h3>
        <div>
          <h1 className="temp">{temp}&#176;</h1>
          <div className="city-time">
            <h1 className="name">{city}</h1>
            <small>
              <span className="date"> {day} ,&ensp; {d} - {m} - {y}</span>
            </small>
          </div>
          <div className="weather">
            <img src={require(`../../icons/${iconId}`)} className="icon" width="50" height="50" alt="icon" />
            <span className="condition">{con}</span>
          </div>
        </div>
      </div>
      <div className="panel" >
        <div id="locationInput">
          <input type="search" className="search" id="search" placeholder="Search Location..." value={city} onChange={onChangeInput} />
          <button  className="submit" onClick={handleClick}><i className="fas fa-search"></i></button>
        </div>

        <ul className="cities">
          <li className="city"><i className="fa-solid fa-location-dot"></i> {city}</li>
          <li className="city">  {region} , &emsp;{country}</li>
          <li className="city">  {time}</li>
        </ul>

        <ul className="details">
          <h4>Weather Details</h4>
          <li>
            <span>Cloudy</span>
            <span className="cloud">{cloud} %</span>
          </li>
          <li>
            <span>Humidity</span>
            <span className="humidity">{hum} %</span>
          </li>
          <li>
            <span>Wind</span>
            <span className="wind">{wind} km/h</span>
          </li>
        </ul>

        <ul className='cities footer'>
          <li className='city'><span>created By Koteswara rao Pakeeri</span></li>
          <li className='city'><span>copyright &copy; 2023 PKR</span></li>
        </ul>
      </div></>
  )
};
export default Panel;
