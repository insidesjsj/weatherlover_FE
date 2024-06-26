import { API_BASE_URL } from "../app-config";
import axios from 'axios';

interface CallDTO {
    api: string 
    request: object | null
}

export const callGet = async ({ api,  request }: CallDTO) => {
    try {
        const response = await axios.get(API_BASE_URL + api)
        console.log(`${api} data: `, response.data)
        return response.data
    } catch (error) {
        console.error('Error fetching weather data:', error)
    }
}

export const callPost = async ({api, request}: CallDTO) => {
    try {
        const response = await axios.post(API_BASE_URL + api, request)
        console.log("받아온 데이터: " + response.data)
        return response.data
    } catch (error) {
        console.error(`Error getting or sending ${api}:`, error);
    }

}