import {WeatherItem} from './WeatherItem';
import {useContext} from 'react';
import {weatherStateContext} from '../App';

const AddCurrentWeather = () => {
    const data = useContext(weatherStateContext)
    const currentWeather = data[0]
    return (
        <div className="w-full mt-8 mb-8">
            <p className="text-left mb-4 text-xl">현재 위치</p>
            <WeatherItem region={currentWeather.region} weatherIcon={currentWeather.weatherIcon} temp={currentWeather.temp} />
        </div>
    )
}

export default AddCurrentWeather