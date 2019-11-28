/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
const place = document.getElementById('place');
const mapCon = document.getElementById('map-img');
const btn = document.getElementById('go');

// const weatherBtn = document.getElementById('weather-btn');
const weather = document.getElementById('weather');
const temp = document.getElementById('temp');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const zipCode = document.getElementById('zipcode');
const cityName = document.getElementById('city');

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
    const [data, zip] = await Promise.all([
      fetch(`http://api.openweathermap.org/data/2.5/weather?q=${place.value}&units=metric&APPID=7d62003427c83ed606f15ceb8edeb5c1`).then((response) => response.json()),
      fetch(`https://api.opencagedata.com/geocode/v1/json?q=${place.value}&key=32b68c57341742378c21b593c79ca9fa`).then((response) => response.json()),
    ]);

    // console.log(b.json());
    // console.log(data);

    return { data, zip };
  } catch (e) {
    console.log(e);
  }
};
// https://maps.googleapis.com/maps/api/geocode/xml?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY

const mapArea = (a, b) => {
  mapCon.src = 'https://maps.googleapis.com/maps/api/staticmap?center=' + a +','+ b +'&zoom=13&scale=1&size=600x300&maptype=hybrid&key=AIzaSyBsGZ2MDH8SfdeNXY1cZe49sClfsBx-0_4&format=jpg&visual_refresh=true&markers=size:mid%7Ccolor:0xff0000%7Clabel:C%7C' + a +','+ b +'';
  // 'url(' + 'https://maps.googleapis.com/maps/api/staticmap?center=' + a +','+ b +',13/400x400?access_token=pk.eyJ1IjoidGVqdW1hZGUiLCJhIjoiY2sybWFwejFiMGVsZjNqbjV5NmdqdzZyZSJ9.lOgB0z3a000HaKHWx94IIQ' + ')'
};// https://maps.googleapis.com/maps/api/staticmap?Lagos,+Nigeria&zoom=14&scale=1&size=600x300&maptype=hybrid&key=AIzaSyBsGZ2MDH8SfdeNXY1cZe49sClfsBx-0_4&format=png&visual_refresh=true&markers=size:mid%7Ccolor:0xff0000%7Clabel:1%7CLagos,+Nigeria
const weatherReport = (data) => {
  console.log(data[1].results[0].components.postcode);
  temp.innerHTML = ` Temp - ${data[0].main.temp}`;
  humidity.innerHTML = `Humidity - ${data[0].main.humidity}`;
  windSpeed.innerHTML = ` Wind-speed - ${data[0].wind.speed}`;
  zipCode.innerHTML = ` Postal-code - ${data[1].results[0].components.postcode}`;
  cityName.innerHTML = `${data[1].results[0].components.city}`;
};

btn.addEventListener('click', () => {
  getWeatherData();
  const a = getWeatherData()

  // const { data, zip } = a
    .then((f) => {
      const { data } = f;
      const { zip } = f;
      console.log(data);
      console.log(zip);
      const mapLon = data.coord.lon;
      const mapLat = data.coord.lat;
      const weatherData = [data, zip];
      const geoCode = 'hello';

      console.log(geoCode);
      mapArea(mapLat, mapLon);
      weatherReport(weatherData);
    });
});

const input = document.getElementById('place');
const autocomplete = new google.maps.places.Autocomplete(input);
