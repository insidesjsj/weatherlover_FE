import React, {FC, useContext, useState} from 'react';
import {categoryContext, dayWeatherContext} from '../../pages/Main';
import {Temp} from '../weatherItem/Temp';
import {Clothes} from '../weatherItem/Clothes';
import {Precipitation} from '../weatherItem/Precipitation';
import {Humidity} from '../weatherItem/Humidity';
import {Wind} from '../weatherItem/Wind';



const HourlyWeather: FC = () => {
    const weatherData = useContext(dayWeatherContext)
    const category = useContext(categoryContext)
    const [currentPage, setCurrentPage] = useState(0) 

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
            <div className="font-['SUITE-Regular'] w-full my-3 py-6 bg-white rounded-2xl p-6">
                <div className="flex justify-center text-2xl mb-3">
                    <h2 aria-label="현재 날씨">시간별 날씨</ h2>
                    <button>#</button>
                </div>
                <hr />
                <div className="flex justify-between">
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
export default HourlyWeather;