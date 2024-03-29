import React, {FC, useContext, useEffect, useState} from 'react';
import {refineWind} from '../weather/refineWind';


interface windProps {
    WSD: string | string[]
    kind: string
}

export const Wind: FC<windProps> = ({WSD, kind}) => {
    const [windClass, setWindClass] = useState({
        degree: "",
        icon: ""
    })
    useEffect(() => {
        if (typeof WSD === "string") {
            setWindClass(refineWind(Number(WSD)))
        }
    }, [WSD])
    if (kind === "current") {
        return (
            <div>
                <div className="text-2xl mt-3">풍속</div>
                <div className="my-4">
                    <img className="mx-auto w-20" src={windClass.icon}/>
                </div>
                <div className="text-2xl my-3">{windClass.degree}</div>
                <div className="text-2xl my-3">{WSD} m/s</div>
                <div className="h-8">
                </div>
            </div>
        )
    } else if (kind === "hourly") {
        return (
            <div>
                <div className="my-2">
                    <img className="mx-auto w-10" src={windClass.icon}/>
                    <div className="text-xl my-3">{WSD}°</div>
                </div>
            </div>
        )
    } else {
        return <div></div>
    }


}