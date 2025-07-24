import React, { useEffect, useState, useRef } from "react";

export const Weatherdata = () => {
  const user = useRef("");
  const [weatherdata, setWeatherdata] = useState("");
  const errormsg = "Could not find the city";

  useEffect(() => {
    serch("delhi");
  }, []);
  const serch = async (city) => {
    if (city === "") {
      alert("Enter City name");
      return;
    }
    try {
      const key = "71ce5b437e79c4cb257f1fb2731432ae";
      const API = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`;

      const data = await fetch(API);
      const response = await data.json();
      
      setWeatherdata({
        humidity: response.main.humidity,
        windspeed: response.wind.speed,
        temp: Math.floor(response.main.temp),
        location: response.name,
        icon: weathercode(response.weather[0].id),
      });
    } catch (error) {
      setWeatherdata(false);
    }
    function weathercode(weatherid) {
      switch (true) {
        case weatherid >= 200 && weatherid < 300:
          return "⛈️";

        case weatherid >= 300 && weatherid < 400:
          return "🌧️";

        case weatherid >= 500 && weatherid < 600:
          return "🌧️";

        case weatherid >= 600 && weatherid < 700:
          return "🌨️";
        case weatherid >= 700 && weatherid < 800:
          return "🌫️";

        case weatherid === 800:
          return "🌞";

        case weatherid >= 801 && weatherid < 809:
          return "☁️";

        default:
          return "❓";
      }
    }
  };

  return (
    <div
      className=" my-10 sm:my-20 bg-gray-800  min-h-[200px] text-center mx-auto p-8 sm:rounded-2xl
    sm:w-lg  text-white"
    >
      <div className="">
        <input
          type="text"
          placeholder="Type the name of city"
          ref={user}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              serch(user.current.value);
            }
          }}
          className="bg-white rounded-2xl h-8 mx-3 sm:mx-5 px-4 text-black"
        />

        <button
          onClick={() => serch(user.current.value)}
          className="border border-white/30 h-8 px-3 rounded-2xl bg-blue-300"
        >
          🔍
        </button>
      </div>
      {weatherdata === "" ? null : weatherdata ? (
        <div>
          <div className=" text-9xl">{weatherdata.icon}</div>
          <p className="text-5xl mb-2 "> {weatherdata.temp}°C</p>
          <p className="text-5xl  mb-2 ">{weatherdata.location}</p>
          <div className=" flex justify-center gap-6 p-2 text-xl">
            <div className="border border-white/50 py-2 px-3 rounded-xl">
              <p>{weatherdata.humidity}</p> <span>Humidity</span>
            </div>
            <div className="border border-white/50 py-2 px-3 rounded-xl ">
              <p>{weatherdata.windspeed} km/h</p> <span>Wind Speed</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-red-600 font-bold mt-5 text-4xl">{errormsg}</div>
      )}
    </div>
  );
};
