#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import { printError, printHelp, printSuccess, printWeather } from "./services/log.service.js";
import { CITY, saveKeyValue, TOKEN } from "./services/storage.service.js";
import { getIcon, getWeather } from "./services/api.service.js";

const saveToken = async (token) => {
  if (!token.length) {
    printError('No token')
    return
  }
  try {
    await saveKeyValue(TOKEN, token)
    printSuccess("Token was saved")
  } catch (e) {
    printError(e.message)
  }
}

const saveCity = async (city) => {
  if (!city.length) {
    printError('No city')
    return
  }
  try {
    await saveKeyValue(CITY, city)
    printSuccess("City was saved")
  } catch (e) {
    printError(e.message)
  }
}

const getForecast = async () => {
  try {
    const weather = await getWeather()
    printWeather(weather, getIcon(weather.weather[0].icon))
  } catch (e) {
    if (e?.response?.status === 400) {
      printError("Wrong city")
    } else if (e?.response?.status === 401) {
      printError("Wrong token")
    } else {
      printError(e.message)
    }

  }
}


const initCLI = () => {
  const args = getArgs(process.argv)

  if (args.h) {
    return printHelp()
  }

  if (args.s) {
    return saveCity(args.s)
  }

  if (args.t) {
    return saveToken(args.t)
  }

  return getForecast()
}

initCLI()