/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
const place = document.getElementById('place');
const mapCon = document.getElementById('mapArea');
const btn = document.getElementById('go');
// const weatherBtn = document.getElementById('weather-btn');
const weather = document.getElementById('weather');
const temp = document.getElementById('temp');
const humidity = document.getElementById('hum');
const windSpeed = document.getElementById('wind-speed');
// /apis
// OpenWeather API

//

// weatherBtn.addEventListener('click', () => {
//   const a = weather.classList;
//   if (a[1] === 'hide-sm') {
//     weather.classList.remove('hide-sm');
//   } else {
//     weather.classList.add('hide-sm');
//   }
// });
// Open weatherapi
// const weatherapi = () = {
//     fetch('http://api.openweathermap.org/data/2.5/weather?q=' + place.value + '&APPID=7d62003427c83ed606f15ceb8edeb5c1')
//     .then(response => response.json())
//     .then(data => {
//     console.log(data) // Prints result from `response.json()` in getRequest
//     })
//     .catch(error => console.error(error));

// };

const getWeatherData = async () => {
  try {
    // const b = await fetch(`https://maps.googleapis.com/maps/api/geocode/xml?address=${place.value}&key=AIzaSyBsGZ2MDH8SfdeNXY1cZe49sClfsBx-0_4`);
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${place.value}&units=metric&APPID=7d62003427c83ed606f15ceb8edeb5c1`);
    const data = response.json();
    // console.log(b.json());
    return data;
  } catch (e) {
    console.log(e);
  }
};
// https://maps.googleapis.com/maps/api/geocode/xml?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY

const mapArea = (a, b) => {
  mapCon.style.backgroundImage = 'url(' + 'https://maps.googleapis.com/maps/api/staticmap?center='+ a +','+ b +'&zoom=14&scale=1&size=600x300&maptype=hybrid&key=AIzaSyBsGZ2MDH8SfdeNXY1cZe49sClfsBx-0_4&format=png&visual_refresh=true&markers=size:mid%7Ccolor:0xff0000%7Clabel:1%7'+ a.value +')';
  // 'url(' + 'https://maps.googleapis.com/maps/api/staticmap?center=' + a +','+ b +',13/400x400?access_token=pk.eyJ1IjoidGVqdW1hZGUiLCJhIjoiY2sybWFwejFiMGVsZjNqbjV5NmdqdzZyZSJ9.lOgB0z3a000HaKHWx94IIQ' + ')'
};// https://maps.googleapis.com/maps/api/staticmap?Lagos,+Nigeria&zoom=14&scale=1&size=600x300&maptype=hybrid&key=AIzaSyBsGZ2MDH8SfdeNXY1cZe49sClfsBx-0_4&format=png&visual_refresh=true&markers=size:mid%7Ccolor:0xff0000%7Clabel:1%7CLagos,+Nigeria
const weatherReport = (data) => {
  console.log(data.main.temp);
  temp.innerHTML = ` Temp ${data.main.temp}`;
  humidity.innerHtml = ` Humidity ${data.main.humidity}`;
  // windSpeed.innerHTML = 'Wind-speed '+ data.
};

btn.addEventListener('click', () => {
  getWeatherData()
    .then((data) => {
      const mapLon = data.coord.lon;
      const mapLat = data.coord.lat;
      const weatherData = data;
      const geoCode = 'hello';

      console.log(geoCode);
      mapArea(mapLat, mapLon);
      weatherReport(weatherData);
    });
});

const input = document.getElementById('place');
const autocomplete = new google.maps.places.Autocomplete(input);
