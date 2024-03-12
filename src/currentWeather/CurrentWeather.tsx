import {FC, useContext, useEffect, useState} from 'react';
import {Icon} from '../public/Icon';
import {currentWeatherContext, locationContext} from '../pages/Main';
import {refineSkyState} from '../weather/refineSkyState';
import {getWeatherIcon} from './getWeatherIcon';
import {CurrentClothes} from './CurrentClothes';
import {CurrentTemp} from './CurrentTemp';
import {CurrentPrecipitation} from './CurrentPrecipitation';
import {CurrentHumidity} from './CurrentHumidity';
import {CurrentWind} from './CurrentWind';

export type CurrentWeatherProps = {
    category: string
    location: string
}

export const CurrentWeather: FC<CurrentWeatherProps> = ({category, location}) => {

    const whatCategory = () => {
        switch (category) {
            case "온도":
                return <CurrentTemp/>
            case "옷차림":
                return <CurrentClothes/>
            case "강수":
                return <CurrentPrecipitation/>
            case "습도":
                return <CurrentHumidity/>
            case "바람":
                return <CurrentWind/>
        }
    }

    return (
        <div className="ml-auto mr-auto bg-white text-center w-3/6 h-full rounded-2xl">
            <div className="font-['SUITE-Regular'] w-full mt-3 py-6">
                <div className="text-3xl">{location}</div>
                {whatCategory()}
            </div>
        </div>
    )
}