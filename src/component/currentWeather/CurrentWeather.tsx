import {FC, useContext, useEffect, useState} from 'react';
import {currentWeatherContext, locationContext} from '../../pages/Main';
import {Clothes} from '../weatherItem/Clothes';
import {Temp} from '../weatherItem/Temp';
import {Precipitation} from '../weatherItem/Precipitation';
import {Humidity} from '../weatherItem/Humidity';
import {Wind} from '../weatherItem/Wind';

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
                <div className="flex justify-center text-2xl mb-3">
                    <h2 aria-label="현재 날씨">현재 날씨</ h2>
                    <button>#</button>
                </div>
                <hr />
                <div className="text-3xl mt-4">{location}</div>
                <button>
                    {whatCategory()}
                </button>
            </div>
        </div>
    )
}