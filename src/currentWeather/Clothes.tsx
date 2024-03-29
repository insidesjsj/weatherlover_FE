import React, {FC, useContext, useEffect, useState} from 'react';
import {currentWeatherContext, dayWeatherContext} from '../pages/Main';
import {calculateWindChill} from '../weather/calculateWindChill';
import {refineClothes} from '../weather/refineClothes';

interface clothesProps {
    TMP: number | number[]
    WSD: number | number[]
    kind: string
}

export const Clothes: FC<clothesProps> = ({TMP, WSD, kind}) => {
    const dayWeatherData = useContext(dayWeatherContext)
    const [currentCloth, setCurrentCloth] = useState({
        val: "",
        icon: "",
        WCT: 0
    })
    useEffect(() => {
        if (typeof TMP === 'number' && typeof WSD === 'number') {
            setCurrentCloth(refineClothes(TMP, WSD))
        }
    }, [TMP, WSD]);
    if (kind === "current") {
        return (
            <div>
                <div className="text-2xl my-3">옷차림</div>
                <div className="my-4">
                    <img className="mx-auto w-20" src={currentCloth.icon}/>
                </div>
                <div className="text-2xl my-3">{currentCloth?.val}°</div>
                <div className="text-2xl my-3">체감온도: {currentCloth.WCT}°</div>
                <div className="h-8">
                    <span>최고: {calculateWindChill(Number(dayWeatherData?.TMX[0]), Number(dayWeatherData?.maxWSD))}°</span>
                    <span>최저: {calculateWindChill(Number(dayWeatherData?.TMN[0]), Number(dayWeatherData?.minWSD))}°</span>
                </div>
            </div>
        )
    } else if (kind === "hourly"){
        return (
            <div>
                <div className="my-2">
                    <img className="mx-auto w-10" src={currentCloth.icon} />
                    <div className="text-xl my-3">{currentCloth.WCT}°</div>
                </div>
            </div>
        )
    } else {
        return <div></div>
    }
};