import {truncateToNDecimalPlaces} from './truncateToNDecimalPlaces';

export const getCurrentLocation = async () => {
    let location = {
        latitude: 0,
        longitude: 0
    }
    try {
        // 현재 위치에 대한 위경도 얻기
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject)
        })

        const {latitude, longitude} = position.coords

        location.latitude = latitude
        location.longitude = longitude

        // 위경도를 소수점 3째 자리까지 끊어준다
        const truncatedLatitude = truncateToNDecimalPlaces(latitude, 3)
        const truncatedLongitude = truncateToNDecimalPlaces(longitude, 3)

        return {latitude, longitude, truncatedLatitude, truncatedLongitude}
    } catch (error) {
        console.error('Error getting or sending location:', error)
    }
}
