/* eslint-disable no-mixed-operators */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
const place = document.getElementById('place');
const mapCon = document.getElementById('map-img');
const btn = document.getElementById('go');

const weather = document.getElementById('weather');
const temp = document.getElementById('temp');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const zipCode = document.getElementById('zipcode');
const cityName = document.getElementById('city');
const convertTempBtn = document.getElementById('convert-temp');
const share = document.getElementById('share');
const timeZone = document.getElementById('time-zone');
const pressure = document.getElementById('pressure');
const condition = document.getElementById('condition');
const cloud = document.getElementById('cloud-cover');
const temperatureSpan = document.getElementById('tempSpan');
const errorC = document.getElementById('error');

const getWeatherData = async () => {
  try {
    errorC.style.display = 'none';
    const [data, zip] = await Promise.all([
      fetch(`http://api.openweathermap.org/data/2.5/weather?q=${place.value}&units=metric&APPID=7d62003427c83ed606f15ceb8edeb5c1`).then((response) => response.json()),
      fetch(`https://api.opencagedata.com/geocode/v1/json?q=${place.value}&key=32b68c57341742378c21b593c79ca9fa`).then((response) => response.json()),
    ]);
    return { data, zip };
  } catch (e) {
    errorC.style.display = 'inline';
    errorC.innerHTML = 'LOCATION NOT FOUND  TRY AGAIN OR INPUT A VALID ADDRESS  ';
    console.log(e);
  }
};

const mapArea = (a, b) => {
  try {
    mapCon.style.opacity = '100';
    mapCon.src = 'https://maps.googleapis.com/maps/api/staticmap?center=' + a + ',' + b + '&zoom=13&scale=1&size=600x300&maptype=hybrid&key=AIzaSyBsGZ2MDH8SfdeNXY1cZe49sClfsBx-0_4&format=jpg&visual_refresh=true&markers=size:mid%7Ccolor:0xff0000%7Clabel:C%7C' + a + ',' + b + '';
  } catch (e) {
    console.log(e);
  }
};
const weatherReport = (data) => {
  // console.log(data[0].weather[0].main);
  temp.innerHTML = `${data[0].main.temp}`;
  // temp.textContent = 23;
  humidity.innerHTML = ` ${data[0].main.humidity}`;
  windSpeed.innerHTML = `  ${data[0].wind.speed}`;
  zipCode.innerHTML = ` ${data[1].results[0].components.postcode}`;
  cityName.innerHTML = `${data[1].results[0].components.city}`;
  timeZone.innerHTML = `${data[1].results[0].annotations.timezone.short_name}`;
  pressure.innerHTML = `${data[0].main.pressure}`;
  condition.innerHTML = `${data[0].weather[0].description}`;
  cloud.innerHTML = `${data[0].clouds.all}`;
};


convertTempBtn.addEventListener('click', () => {
  const curTmp = parseInt(temp.textContent);
  // console.log(curTmp);
  const celcius = curTmp * 9 / 5 + 32;
  if (temperatureSpan.textContent === 'C') {
    // convert to fah
    temperatureSpan.textContent = 'F';
    temp.textContent = celcius;
    convertTempBtn.innerHTML = 'Convert <sup>o</sup>F to<sup>o</sup>C';
  } else {
    const cel = curTmp;
    temp.textContent = Math.round((cel - 32) * 5 / 9);
    temperatureSpan.textContent = 'C';
    convertTempBtn.innerHTML = 'Convert <sup>o</sup>C to<sup>o</sup>F';
  }
});

btn.addEventListener('click', () => {
  getWeatherData();
  const a = getWeatherData()
    .then((f) => {
      const { data } = f;
      const { zip } = f;
      const mapLon = data.coord.lon;
      const mapLat = data.coord.lat;
      const weatherData = [data, zip];
      mapArea(mapLat, mapLon);
      weatherReport(weatherData);
    });
});
// temp.textContent = '23';
// Temperature conversion


const input = document.getElementById('place');
const autocomplete = new google.maps.places.Autocomplete(input);
