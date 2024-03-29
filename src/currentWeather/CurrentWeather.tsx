import {FC, useContext, useEffect, useState} from 'react';
import {currentWeatherContext, locationContext} from '../pages/Main';
import {Clothes} from './Clothes';
import {Temp} from './Temp';
import {Precipitation} from './Precipitation';
import {Humidity} from './Humidity';
import {Wind} from './Wind';

export type CurrentWeatherProps = {
    category: string
    location: string
}

export const CurrentWeather: FC<CurrentWeatherProps> = ({category, location}) => {
    const weatherData = useContext(currentWeatherContext)
    const kind = "current"
    const whatCategory = () => {
        if(weatherData) {
            switch (category) {
                case "온도":
                    return <Temp TMP={weatherData?.TMP} PTY={weatherData?.PTY} SKY={weatherData?.SKY} kind={kind} />
                case "옷차림":
                    return <Clothes TMP={Number(weatherData?.TMP)} WSD={Number(weatherData?.WSD)} kind={kind} />
                case "강수":
                    return <Precipitation PCP={weatherData.PCP} kind={kind} />
                case "습도":
                    return <Humidity REH={weatherData.REH} kind={kind} />
                case "바람":
                    return <Wind WSD={weatherData.WSD} kind={kind} />
            }
        }
    }

    return (
        <div className="ml-auto mr-auto bg-white text-center w-3/6 h-full rounded-2xl">
            <div className="font-['SUITE-Regular'] w-full mt-3 py-6">
                <div className="text-3xl">{location}</div>
                {whatCategory()}
            </div>
            <div>

            </div>
        </div>
    )
}