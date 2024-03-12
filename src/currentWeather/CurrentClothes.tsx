import {useContext, useEffect, useState} from 'react';
import {currentWeatherContext} from '../pages/Main';
import {calculateWindChill} from '../weather/calculateWindChill';
import {refineClothes} from '../weather/refineClothes';

export const CurrentClothes = () => {
    const weatherData = useContext(currentWeatherContext)
    const TMP = Number(weatherData?.TMP)
    const WSD = Number(weatherData?.WSD)
    const [currentCloth, setCurrentCloth] = useState({
        val: "",
        icon: "",
        WCT: 0
    })
    useEffect(() => {
        setCurrentCloth(refineClothes(TMP, WSD))
    }, [TMP, WSD]);

    return (
        <div>
            <div className="text-2xl my-3">옷차림</div>
            <div className="my-4">
                <img className="mx-auto w-20" src={currentCloth.icon} />
            </div>
            <div className="text-2xl my-3">{currentCloth?.val}°</div>
            <div className="text-2xl my-3">체감온도: {currentCloth.WCT}°</div>
        </div>    )
};