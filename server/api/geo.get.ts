import {BASE_URL, fetchWeatherAPI} from "~/utils/weather";

export default defineEventHandler(async (event) => {
    const query = getQuery(event)

    if (!query.q) {
        setResponseStatus(event, 400)
        return;
    }

    const config = useRuntimeConfig(event);
    const url = `${BASE_URL}/geo/1.0/direct?q=${query.q}&limit=1&appid=${config.apiKey}`
    const response = await fetchWeatherAPI(event, url)


    if (!response.ok) {
        return;
    }

    const data = await response.json()

    if (data.length === 0) {
        setResponseStatus(event, 404)
        return;
    }

    return {lat: data[0].lat, lon: data[0].lon}
})