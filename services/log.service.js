import chalk from "chalk";
import dedent from "dedent";

const printError = (error) => {
  console.log(chalk.black.bgRed(" ERROR ") + " " + error)
}

const printSuccess = (message) => {
  console.log(chalk.black.bgGreen(" SUCCESS ") + ' ' + message)
}

const printHelp = () => {
  console.log(dedent(`${chalk.black.bgCyan(" HELP ")}
      Without params - show weather
      -s [CITY] for setting city
      -h show help
      -t [API_KEY] for setting token
      `)
  )
}


const printWeather = (weather, icon) => {
  console.log(dedent(`${chalk.black.bgMagenta(" WEATHER ")} in ${weather.name}
      Weather: ${weather?.weather[0]?.description} ${icon}
      Temperature: ${weather?.main.temp}°C, feels like ${weather?.main.feels_like}°C
      Wind speed: ${weather.wind.speed} mph
      Humidity: ${weather?.main.humidity}%
      `)
  )
}

export { printError, printSuccess, printHelp, printWeather }