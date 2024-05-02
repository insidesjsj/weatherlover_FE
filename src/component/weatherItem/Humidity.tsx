import React, {FC, useEffect, useState} from 'react';
import {refineHumidity} from '../../utills/refineWeather/refineHumidity';

interface humidityProps {
    REH: string | string[]
    kind: string
}

export const Humidity: FC<humidityProps> = ({REH, kind}) => {
    const [humidity, setHumidity] = useState({
        icon: "",
        degree: "",
    })
    useEffect(() => {
        if (typeof REH === "string"){
            setHumidity(refineHumidity(Number(REH)))
        }
    }, [REH]) 
    if (kind === "current") {
        return (
            <div>
                <div className="text-2xl mt-3">습도</div>
                <div className="my-4">
                    <img className="mx-auto w-20" src={humidity.icon} alt={humidity.degree} />
                </div>
                <div className="text-2xl my-3">{humidity.degree}</div>
                <div className="text-2xl my-3">{REH}%</div>
                <div className="h-8">
                </div>
            </div>
        )
    } else if (kind === "hourly"){
        return (
            <div>
                <div className="my-2">
                    <img className="mx-auto w-10" src={humidity.icon} alt={humidity.degree} />
                    <div className="text-xl my-3">{REH}%</div>
                </div>
            </div>
        )
    } else {
        return <div></div>
    }
} 