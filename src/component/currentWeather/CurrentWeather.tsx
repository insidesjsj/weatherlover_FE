import React, {FC, useContext, useEffect, useState} from 'react';
import {Clothes} from '../weatherItem/Clothes';
import {Temp} from '../weatherItem/Temp';
import {Precipitation} from '../weatherItem/Precipitation';
import {Humidity} from '../weatherItem/Humidity';
import {Wind} from '../weatherItem/Wind';
import {useRecoilState, useRecoilValue} from 'recoil';
import {categoryState, currentRegionState, curWeatherState, locationSelector} from '../../recoilState';
import {callPost} from '../../service/ApiService';

const CurrentWeather: FC = () => {
    const category = useRecoilValue(categoryState)
    const locationData = useRecoilValue(locationSelector)
    const [curWeatherData,setCurWeatherData] = useRecoilState(curWeatherState)
    const currentRegion = useRecoilValue(currentRegionState)
    const kind = "current"


    const call = async () => {
        const ultraSrtFcstResponse = await callPost({
            api: 'getUltraSrtFcst',
            request: {nx: locationData?.nx, ny: locationData?.ny}
        })
        setCurWeatherData(ultraSrtFcstResponse)
    }

    useEffect(() => {
        call()
    }, [currentRegion]);

    const whatCategory = () => {
        if(curWeatherData) {
            switch (category) {
                case "온도":
                    return <Temp TMP={curWeatherData?.TMP} PTY={curWeatherData?.PTY} SKY={curWeatherData?.SKY} kind={kind} />
                case "옷차림":
                    return <Clothes TMP={Number(curWeatherData?.TMP)} WSD={Number(curWeatherData?.WSD)} kind={kind} />
                case "강수":
                    return <Precipitation PCP={curWeatherData.PCP} kind={kind} />
                case "습도":
                    return <Humidity REH={curWeatherData.REH} kind={kind} />
                case "바람":
                    return <Wind WSD={curWeatherData.WSD} kind={kind} />
            }
        }
    }

    return (
        <div className="ml-auto mr-auto bg-white text-center w-3/6 h-full rounded-2xl">
            <div className="font-['SUITE-Regular'] w-full mt-3 py-6">
                <div className="flex justify-center text-2xl mb-3">
                    <h2 aria-label="현재 날씨">현재 날씨</ h2>
                    <button></button>
                </div>
                <hr />
                <div className="text-3xl mt-4">{currentRegion.address}</div>
                <button>
                    {whatCategory()}
                </button>
            </div>
        </div>
    )
}
export default CurrentWeather;