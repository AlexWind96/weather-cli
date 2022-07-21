import { CITY, getValueByKey, TOKEN } from "./storage.service.js";
import axios from "axios";

const getWeather = async () => {
  const token = await getValueByKey(TOKEN)
  const city = await getValueByKey(CITY)


  if (!token) {
    throw new Error('Token was not defined. Please run command -t [APP_KEY]')
  }

  if (!city) {
    throw new Error('City was not defined. Please run command -s [CITY_NAME]')
  }

  const coordinates = await getCoordinates(city, token)

  const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
    params: {
      appid: token,
      lat: coordinates?.lat,
      lon: coordinates?.lon,
      units: 'metric',
      lang: 'en'
    }
  })

  return data
}

const getCoordinates = async (city, token) => {
  const { data } = await axios.get('https://api.openweathermap.org/geo/1.0/direct', {
    params: {
      appid: token,
      q: city
    }
  })

  return {
    lat: data[0]?.lat,
    lon: data[0]?.lon
  }
}


const getIcon = (icon) => {
  switch (icon.slice(0, 2)) {
    case '01':
      return '☀ ';
    case '02':
      return '🌤 ';
    case '03':
      return '☁ ';
    case '04':
      return '☁ ';
    case '09':
      return '🌧️ ';
    case '10':
      return '🌦️ ';
    case '11':
      return '🌩️ ';
    case '13':
      return '❄ ';
    case '50':
      return '🌫️';
  }
};

export { getWeather, getIcon }