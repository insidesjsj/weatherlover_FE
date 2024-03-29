import React, {FC, useContext, useEffect, useState} from 'react';
import {categoryContext, dayWeatherContext} from '../pages/Main';
import {Temp} from '../currentWeather/Temp';
import {Clothes} from '../currentWeather/Clothes';
import {Precipitation} from '../currentWeather/Precipitation';
import {Humidity} from '../currentWeather/Humidity';
import {Wind} from '../currentWeather/Wind';



const DayHourlyWeather: FC = () => {
    const [currentHour, setCurrentHour] = useState<number>(0);

    const weatherData = useContext(dayWeatherContext)
    const category = useContext(categoryContext)
    const [currentPage, setCurrentPage] = useState(0) 
    const [midnightCounter, setMidnightCounter] = useState(0)  // midnightCounter를 상태로 선언

    useEffect(() => {
        const intervalId = setInterval(() => {
            const now = new Date();
            const hour = now.getHours();
            setCurrentHour(hour);
        }, 1000);

        if (currentPage === 0) {
            setMidnightCounter(0)
        }
        // 컴포넌트가 unmount될 때 clearInterval 호출
        return () => clearInterval(intervalId);
    }, [currentPage]);

    const renderTimeWithDate = (time: string) => {
        if (time === "00:00" && midnightCounter < 2) {
            setMidnightCounter((prevCounter) => prevCounter + 1); // 자정인 경우 midnightCounter 증가
            if (midnightCounter === 1) {
                console.log(midnightCounter)
                return "내일"
            } else if (midnightCounter === 2) {
                console.log(midnightCounter)
                return "모레"
            }
        }
        return '' 
    } 

    const whatCategory = () => {
        if (!weatherData) return null 

        const itemsPerPage = 6 
        const startIdx = currentPage * itemsPerPage 
        const endIdx = (currentPage + 1) * itemsPerPage 
        const currentPageData = weatherData.TMPTime.slice(startIdx, endIdx) 

        switch (category) {
            case "온도":
                return currentPageData.map((time: string, index: number) => (
                    <div className="inline-block mx-4" key={index}>
                        <div>{renderTimeWithDate(time)}</div>
                        <div>{time}</div>
                        <Temp
                            TMP={weatherData.TMP[index + startIdx]}
                            PTY={weatherData.PTY[index + startIdx]}
                            SKY={weatherData.SKY[index + startIdx]}
                            kind="hourly"
                        />
                    </div>
                )) 
            case "옷차림":
                return currentPageData.map((time: string, index: number) => (
                    <div className="inline-block mx-4" key={index}>
                        <div>{time}</div>
                        <Clothes
                            TMP={Number(weatherData?.TMP[index + startIdx])}
                            WSD={Number(weatherData?.WSD[index + startIdx])}
                            kind="hourly"
                        />
                    </div>
                )) 
            case "강수":
                return currentPageData.map((time: string, index: number) => (
                    <div className="inline-block mx-4" key={index}>
                        <div>{time}</div>
                        <Precipitation
                            PCP={weatherData.PCP[index + startIdx]}
                            kind="hourly"
                        />
                    </div>
                )) 
            case "습도":
                return currentPageData.map((time: string, index: number) => (
                    <div className="inline-block mx-4" key={index}>
                        <div>{time}</div>
                        <Humidity
                            REH={weatherData.REH[index + startIdx]}
                            kind="hourly"
                        />
                    </div>
                )) 
            case "바람":
                return currentPageData.map((time: string, index: number) => (
                    <div className="inline-block mx-4" key={index}>
                        <div>{time}</div>
                        <Wind
                            WSD={weatherData.WSD[index + startIdx]}
                            kind="hourly"
                        />
                    </div>
                )) 
            default:
                return null 
        }
    } 
    const handlePageChange = (page: number) => {
        setCurrentPage(page) 
    } 

    const totalPages = weatherData ?  Math.ceil(weatherData.TMPTime.length / 6) : 0 

    return (
        <div className="ml-auto mr-auto text-center w-3/6 h-full rounded-2xl">
            <div className="font-['SUITE-Regular'] w-full mt-3 py-6">
                <div className="bg-white rounded-2xl p-6 flex justify-between">
                    <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0}>
                        이전
                    </button>
                    {whatCategory()}
                    <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages - 1}>
                        다음
                    </button>
                </div>
            </div>
        </div>
        ) 
}
export default DayHourlyWeather;