import React, {useContext} from 'react';
import {dayWeatherContext} from '../pages/Main';

const DayHighestTemp: React.FC = () => {
    const data = useContext(dayWeatherContext)
    const maxTemp = data?.TMX[0]

    return (
        <div>
            <div>일 최고 기온</div>
            <div>{maxTemp}</div>
        </div>
    )
}

export default DayHighestTemp;