import {BASE_URL, fetchWeatherAPI} from "~/utils/weather";

type Main = {
    temp: number,
    humidity: number
}

type Weather = {
    main: string
}

type Wind = {
    speed: number
}

type Forecast = {
    dt: number,
    main: Main,
    weather: Array<Weather>,
    wind: Wind
}

export default defineEventHandler(async (event) => {
    const query = getQuery(event)

    if (!query.lat || !query.lon) {
        setResponseStatus(event, 400)
        return
    }

    const config = useRuntimeConfig(event);
    const url = `${BASE_URL}/data/2.5/forecast?lat=${query.lat}&lon=${query.lon}&units=metric&appid=${config.apiKey}`
    const response = await fetchWeatherAPI(event, url)

    if (!response.ok) {
        return;
    }

    const data = await response.json()

    if (data.length === 0) {
        setResponseStatus(event, 500)
        return
    }

    let count = 0
    let lastDay = new Date(data.list[0].dt * 1000).getUTCDate()
    const forecast = [];
    for (const f of data.list) {
        const dt = new Date(f.dt * 1000)

        if (dt.getUTCDate() != lastDay && dt.getUTCHours() >= 12) {
            lastDay = dt.getUTCDate()
            forecast.push(pickForecast(f))

            if (++count >= 3) break
        }
    }

    return {current: pickForecast(data.list[0]), forecast}
})

function pickForecast(data: Forecast): object {
    return {dt: data.dt, temp: data.main.temp, humidity: data.main.humidity, wind: data.wind.speed, weather: data.weather[0].main}
}