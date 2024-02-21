import type {EventHandlerRequest, H3Event} from "h3";

export async function fetchWeatherAPI(event: H3Event<EventHandlerRequest>, url: string): Promise<Response> {
    try {
        const response = await fetch(url)

        if (!response.ok) {
            setResponseStatus(event, response.status)
            return response
        }

        return response
    } catch (e: any) {
        setResponseStatus(event, 503)
        return new Response()
    }
}

export const BASE_URL = 'https://api.openweathermap.org'