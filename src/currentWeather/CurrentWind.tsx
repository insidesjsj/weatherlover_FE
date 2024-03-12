import {useContext, useEffect, useState} from 'react';
import {currentWeatherContext} from '../pages/Main';
import wind1 from '../img/WSD/wind1.png'
import wind2 from '../img/WSD/wind2.png'
import wind3 from '../img/WSD/wind3.png'
import wind4 from '../img/WSD/wind4.png'
import wind5 from '../img/WSD/wind5.png'

export const CurrentWind = () => {
    const weatherData = useContext(currentWeatherContext)
    const WSD = Number(weatherData?.WSD)
    const [windClass, setWindClass] = useState({
        degree: "",
        icon: ""
    })
    useEffect(() => {
        if (WSD < 1) {
            setWindClass({degree: "없음", icon: `${wind1}`})
        } else if (WSD >= 1 && WSD < 3) {
            setWindClass({degree: "약함", icon: `${wind2}`})
        } else if (WSD >= 3 && WSD < 5) {
            setWindClass({degree: "보통", icon: `${wind3}`})
        } else if (WSD >= 5 && WSD < 10) {
            setWindClass({degree: "강함", icon: `${wind4}`})
        } else {
            setWindClass({degree: "아주 강함", icon: `${wind5}`})
        }
    }, [WSD])

    return (
        <div>
            <div className="text-2xl mt-3">풍속</div>
            <div className="my-4">
                <img className="mx-auto w-20" src={windClass.icon} />
            </div>
            <div className="text-2xl my-3">{windClass.degree}</div>
            <div className="text-2xl my-3">{WSD} m/s</div>
        </div>
    )
}