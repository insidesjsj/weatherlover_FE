import {useContext} from 'react';
import {dataType, weatherStateContext} from '../App';
import {WeatherItem} from './WeatherItem';

export const AddFavoriteRegList = () => {
    const weatherData = useContext(weatherStateContext)
    const favoriteWeather: dataType[] = weatherData.slice(1)    // shift는 원본 배열에 변화를 주므로 slice 사용

    if (weatherData) {
        return (
            <div>
                <div className="flex justify-between mb-4">
                    <span className="text-xl">즐겨찾기</span>
                    <div className="inline badge badge-neutral bg-gray-300 rounded-xl w-14 h-8 cursor-pointer flex justify-center items-center">편집</div>
                </div>
                {favoriteWeather.map((value, index) =>
                    <WeatherItem region={favoriteWeather[index].region} weatherIcon={favoriteWeather[index].weatherIcon} temp={favoriteWeather[index].temp} />
                )}
            </div>
        )
    } else {
        return (
            <div>sas</div>
        )
    }
}

