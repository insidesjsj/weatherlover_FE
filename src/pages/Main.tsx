import React, {useEffect} from 'react';
import {callPost} from '../service/ApiService';
import WeatherHeader from '../component/header/Header';
import Divder from '../component/Divder';
import TendaysWeather from '../component/tendaysWeather/TendaysWeather';
import HourlyWeather from '../component/hourlyWeather/HourlyWeather';
import WeatherCategory from '../component/WeatherCategory';
import Loading from '../component/Loading';
import {useRecoilState, useRecoilValue} from 'recoil';
import {currentRegionState, locationSelector} from '../recoilState';
import CurrentWeather from '../component/currentWeather/CurrentWeather';

export const Main: React.FC = () => {
    const locationData = useRecoilValue(locationSelector)
    const [currentRegion, setCurrentRegion] = useRecoilState(currentRegionState)

    // 둘 다 비동기로 호출되기 때문에 callPost가 완료되기 전에 callGet이 호출 되어 서버에서 x, y 값이 전달이 안된 상태로 초단기 예보 API를 불러온다
    const callingOrder = async () => {
        if (locationData) {
            console.log(`callingOrder 값 {lat: ${locationData.lat}, lng: ${locationData.lng}, nx: ${locationData.nx}, ny: ${locationData.ny}}`)
            try {
                // 위, 경도를 서버로 보내서 현위치의 행정 주소 얻어오기
                const postLoc = await callPost({
                    api: "location/region",
                    request: {latitude: locationData?.lat, longitude: locationData?.lng}
                })
                setCurrentRegion((val) => postLoc)
                console.log("현재 위치에 대한 currentRegion State" + currentRegion)
            } catch (error) {
                console.error('Error in fetchData:', error)
            }
        }
    }

    useEffect(() => {
        console.log(`locationData 값 {lat: ${locationData?.lat}, lng: ${locationData?.lng}, nx: ${locationData?.nx}, ny: ${locationData?.ny}}`)
        callingOrder()
    }, [locationData])

    if (!locationData) {
        return (
            <Loading/>
        )
    } else {
        return (
            <div className="m-0 text-center w-full">
                <WeatherHeader/>
                <Divder/>
                <div className="w-full bg-gray-300 pt-1 pb-1">
                    <WeatherCategory/>
                    <CurrentWeather />
                    <HourlyWeather/>
                    <TendaysWeather midRegionCode={currentRegion.midRegionCode}
                                    midLandRegionCode={currentRegion.midLandRegionCode}/>
                </div>
            </div>
        )
    }
}
