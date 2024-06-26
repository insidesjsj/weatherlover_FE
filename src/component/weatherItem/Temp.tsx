import React, {FC, useContext, useEffect, useState} from 'react';
import {refineSkyState} from '../../utills/refineWeather/refineSkyState';
import {useRecoilValue} from 'recoil';
import {hourlyWeatherState} from '../../recoilState';


interface TempProps {
    TMP: string
    PTY: string | string[]
    SKY: string | string[]
    kind: string
}
export const Temp: FC<TempProps> = ({TMP, PTY, SKY, kind}) => {
    const hourlyWeatherData = useRecoilValue(hourlyWeatherState)
    const [skyState, setSkyState] = useState({
        type: "",
        icon: "",
    })

    useEffect(() => {
        if (typeof PTY === 'string' && typeof SKY === 'string') {
            setSkyState(refineSkyState(PTY, SKY))
            console.log("날씨 아이콘은" + skyState.icon)
        }
    }, [PTY, SKY])


    if (hourlyWeatherData && kind === "current") {
        return (
            <div>
                <div className="text-2xl my-3">온도</div>
                <div className="my-4">
                    <img className="mx-auto w-20" src={skyState.icon} alt={skyState.type} />
                </div>
                <div className="text-2xl my-3">{TMP}°</div>
                <div className="text-2xl my-3">{skyState.type}</div>
                <div className="h-8">
                    <span>최고: {hourlyWeatherData?.TMX[0]}°</span>
                    <span>최저: {hourlyWeatherData?.TMN[0]}°</span>
                </div>
            </div>
        )
    } else if (kind === "hourly") {
        return (
            <div>
                <div className="my-2">
                    <img className="mx-auto w-10" src={skyState.icon} alt={skyState.type} />
                    <div className="text-xl my-3">{TMP}°</div>
                </div>
            </div>
        )
    } else if (kind === "weekly") {
        return (
            <div className="w-1/6">
                <img className="mx-auto w-7" src={skyState.icon} alt={skyState.type} />
            </div>
        )
    } else {
        return <div></div>
    }
} 