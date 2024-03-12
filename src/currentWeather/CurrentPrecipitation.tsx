import {useContext, useEffect, useState} from 'react';
import {currentWeatherContext} from '../pages/Main';
import norain from '../img/PCP/norain.png';
import umbrella from '../img/PCP/umbrella.png';

export const CurrentPrecipitation = () => {
    const weatherData = useContext(currentWeatherContext)
    const PCP = weatherData?.PCP
    const [precipitation, setPrecipitation] = useState({
        type: "",
        icon: "",
        amount: "",
    })

    useEffect(() => {
        if (PCP === "강수없음") {
            setPrecipitation({
                type: "비 예보 없음",
                icon: `${norain}`,
                amount: '0.0 ml'
            })
        } else {
            setPrecipitation({
                type: "우산 챙겨요",
                icon: `${umbrella}`,
                amount: `${PCP} ml`
            })
        }
    }, [PCP]);

    return (
        <div>
            <div className="text-2xl mt-3">강수</div>
            <div className="my-4">
                <img className="mx-auto w-20" src={precipitation.icon} />
            </div>
            <div className="text-2xl my-3">{precipitation.type}</div>
            <div className="text-2xl my-3">{precipitation.amount}</div>
        </div>
    )
}