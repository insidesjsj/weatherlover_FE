import React, {useContext} from 'react';
import {dayWeatherContext} from '../pages/Main';

const DayLowestTemp: React.FC = () => {
    const data = useContext(dayWeatherContext)
    const minTemp = data?.TMN[0]

    return (
        <div>
            <div>일 최저 기온</div>
            <div>{minTemp}</div>
        </div>
    )
}

export default DayLowestTemp;