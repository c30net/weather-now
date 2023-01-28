import { useState } from "react";
import axios from "axios";
export default function Form() {
  let [cityname, setcityname] = useState("Paris");
  let [temperature, settemperature] = useState("");
  let [nameofcity, setname] = useState("");
  let [description, setdesc] = useState("");
  let [icon, seticon] = useState("");
  let [alter, setalter] = useState("");
  let [humidity, sethumidity] = useState("");
  let [speed, setspeed] = useState("");
  function exportit(event) {
    setcityname(event.target.value);
  }

  function ajaxit(event) {
    event.preventDefault();
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          cityname +
          "&appid=9d5e9ae00531cc47a1afce47e2f9473b&units=metric"
      )
      .then((response) => {
        setname(response.data.name);
        settemperature(response.data.main.temp);
        setdesc(response.data.weather[0].description);
        seticon(() => {
          return (
            "http://openweathermap.org/img/wn/" +
            response.data.weather[0].icon +
            "@2x.png"
          );
        });
        setalter(response.data.weather[0].main);
        sethumidity(response.data.main.humidity);
        setspeed(response.data.wind.speed);
      })
      .catch(function () {
        alert("Please edit the name of the city");
      });
  }

  return (
    <div className="Form">
      <div className="m-3">
        <form>
          <input
            type="text"
            placeholder="search city here..."
            autoComplete="off"
            onChange={exportit}
          />
          <button onClick={ajaxit}>Search</button>
        </form>
      </div>
      <p>Name : {nameofcity}</p>
      <p>Temperature : {temperature} ℃</p>

      <p>Description : {description}</p>
      <p>Humidity : {humidity} %</p>
      <p>Wind Speed : {speed} Km/h</p>
      <img src={icon} alt={alter} />
    </div>
  );
}
