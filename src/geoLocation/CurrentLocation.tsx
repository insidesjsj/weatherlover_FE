import React, {useEffect, useState} from 'react';
import {truncateToNDecimalPlaces} from './truncateToNDecimalPlaces';
import CurrentCoordinate from './CurrentCoordinate';

interface LocationDTO {
    latitude: number | null,
    longitude: number | null
}

export const CurrentLocation: React.FC = () => {
    const [location, setLocation] = useState<LocationDTO>({latitude: null, longitude: null})
    const getCurrentLocation = async () => {
        try {

            // 현재 위치에 대한 위경도 얻기
            const position = await new Promise<GeolocationPosition>((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });

            const { latitude, longitude } = position.coords;

            // 위경도를 소수점 3째 자리까지 끊어준다
            const truncatedLatitude = truncateToNDecimalPlaces(latitude, 3);
            const truncatedLongitude = truncateToNDecimalPlaces(longitude, 3);

            setLocation({
                latitude: latitude,
                longitude: longitude,
            })

            // 위경도를 서버로 보내기
            const response = await fetch('http://localhost:8055/api/location', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ latitude: truncatedLatitude, longitude: truncatedLongitude }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Location sent successfully:', data);
            } else {
                console.error('Failed to send location to server.');
            }
        } catch (error) {
            console.error('Error getting or sending location:', error);
        }
    };
    useEffect(() => {
        getCurrentLocation()
    }, []);

    if (location.latitude !== null && location.longitude !== null) {
        return (
            <div>
                <CurrentCoordinate lat={location.latitude} lon={location.longitude} />
            </div>
        )
    } else {
       return <div>데이터를 불러오는 중입니다.</div>
    }


}