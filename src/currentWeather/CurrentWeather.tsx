import {FC, useContext, useEffect, useState} from 'react';
import {Icon} from '../public/Icon';
import {currentWeatherContext, locationContext} from '../pages/Main';
import {refineSkyState} from '../weather/refineSkyState';
import {getWeatherIcon} from './getWeatherIcon';

export type CurrentWeatherProps = {
    location: string
}


export const CurrentWeather: FC<CurrentWeatherProps> = ({location}) => {
    const weatherData = useContext(currentWeatherContext)
    const [skyState, setSkyState] = useState("")
//    const [weatherIcon, setWeatherIcon] = useState("")

    const [weatherIcon, setWeatherIcon] = useState({
        icon: "",
        style: {
            fontSize: "",
            color: "",
        },
    })
    const PTY = weatherData?.PTY
    const SKY = weatherData?.SKY


    useEffect(() => {
        if (PTY && SKY) {
            setSkyState((val) => refineSkyState(PTY, SKY))
            if (skyState) {
                setWeatherIcon(getWeatherIcon(skyState))
            }
        }
    }, [PTY, SKY, skyState]);


    return (
        <div className="font-['SUITE-Regular'] w-full mt-3">
            <div className="text-3xl">{location}</div>
            <div className="text-2xl mt-3">{skyState}</div>
            <div className="text-center">
                <Icon style={weatherIcon.style} name={weatherIcon.icon}/>
            </div>
            <div className="text-2xl">{weatherData?.TMP}°</div>
        </div>
    )
}