import {useContext, useEffect, useState} from 'react';
import {currentWeatherContext} from '../pages/Main';
import {refineSkyState} from '../weather/refineSkyState';

export const CurrentTemp = () => {
    const weatherData = useContext(currentWeatherContext)
    const [skyState, setSkyState] = useState({
        type: "",
        icon: "",
    })
    const PTY = weatherData?.PTY
    const SKY = weatherData?.SKY

    useEffect(() => {
        if (PTY && SKY) {
            setSkyState(refineSkyState(PTY, SKY))
            console.log("날씨 아이콘은" + skyState.icon)
        }
    }, [PTY, SKY])

    return (
        <div>
            <div className="text-2xl my-3">온도</div>
            <div className="my-4">
                <img className="mx-auto w-20" src={skyState.icon} />
            </div>
            <div className="text-2xl my-3">{weatherData?.TMP}°</div>
            <div className="text-2xl my-3">{skyState.type}°</div>
        </div>
    )
};