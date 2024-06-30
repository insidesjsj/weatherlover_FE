import React, {FC, useContext, useEffect, useState} from 'react';
import {refinePrecipitation} from '../../utills/refineWeather/refinePrecipitation';

interface precipitationProps {
    PCP: string | string[]
    kind: string
}

export const Precipitation: FC<precipitationProps> = ({PCP, kind}) => {
    const [precipitation, setPrecipitation] = useState({
        type: "",
        icon: "",
        amount: "",
    })

    useEffect(() => {
        if (typeof PCP === "string") {
            setPrecipitation(refinePrecipitation(PCP))
        }
    }, [PCP]);
    if (kind === "current") {
        return (
            <div>
                <div className="text-2xl mt-3">강수</div>
                <div className="my-4">
                    <img className="mx-auto w-20" src={precipitation.icon} alt={precipitation.type}/>
                </div>
                <div className="text-2xl my-3">{precipitation.type}</div>
                <div className="text-2xl my-3">{precipitation.amount}</div>
                <div className="h-8">
                </div>
            </div>
        )
    } else if (kind === "hourly") {
        return (
            <div>
                <div className="my-2">
                    <img className="mx-auto w-10" src={precipitation.icon} alt={precipitation.type}/>
                    <div className="text-xl my-3">{precipitation.amount}</div>
                </div>
            </div>
        )
    } else {
        return <div></div>
    }
}