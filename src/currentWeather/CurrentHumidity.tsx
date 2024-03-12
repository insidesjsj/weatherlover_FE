import {useContext, useEffect, useState} from 'react';
import {currentWeatherContext} from '../pages/Main';
import {Icon} from '../public/Icon';
import REH1 from '../img/REH/REH1.png'
import REH2 from '../img/REH/REH2.png'
import REH3 from '../img/REH/REH3.png'
import REH4 from '../img/REH/REH4.png'
import REH5 from '../img/REH/REH5.png'

export const CurrentHumidity = () => {
    const weatherData = useContext(currentWeatherContext)
    const [humidity, setHumidity] = useState({
        icon: "",
        degree: "",
    })
    const REH = Number(weatherData?.REH)
    useEffect(() => {
        if(REH){
            if (REH >= 0 && REH <= 20) {
                setHumidity({icon: `${REH1}`, degree: "아주 낮음"})
            } else if (REH > 20 && REH <= 40) {
                setHumidity({icon: `${REH2}`, degree: "낮음"})
            } else if (REH > 40 && REH <= 60) {
                setHumidity({icon: `${REH3}`, degree: "보통"})
            } else if (REH > 60 && REH <= 80) {
                setHumidity({icon: `${REH4}`, degree: "많음"})
            } else if (REH > 80) {
                setHumidity({icon: `${REH5}`, degree: "아주 많음"})
            } else {
                setHumidity({icon: "", degree: ""})
            }
        }
    }, [REH]);

    return (
        <div>
            <div className="text-2xl mt-3">습도</div>
            <div className="my-4">
                <img className="mx-auto w-20" src={humidity.icon} />
            </div>
            <div className="text-2xl my-3">{humidity.degree}</div>
            <div className="text-2xl my-3">{REH}%</div>
        </div>
    )
};