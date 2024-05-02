import {FC, useContext, useEffect, useState} from 'react';
import {dayWeatherContext, locationContext} from '../../pages/Main';
import {callPost} from '../../service/ApiService';
import TendaysWeatherItem from './TendaysWeatherItem';
import {getDate, getDays} from '../../utills/getDate';

interface midWeatherDTO {
    taMax: string[],
    taMin: string[],
    wf: string[],
    PTY: string[],
    SKY: string[],
}

interface WeekWeatherProps {
    midLandRegionCode?: string,
    midRegionCode?: string
}


const TendaysWeather: FC<WeekWeatherProps> = ({midLandRegionCode, midRegionCode}) => {
    const [midWeatherData, setMidWeatherData] = useState<midWeatherDTO>();
    const location = useContext(locationContext)
    const dayWeather = useContext(dayWeatherContext)

    const midWeather = async () => {
        const getMidWeather = await callPost({
            api: 'midWeather',
            request: {
                nx: location?.nx,
                ny: location?.ny,
                midLandRegionCode: midLandRegionCode,
                midRegionCode: midRegionCode
            }
        })
        setMidWeatherData(getMidWeather)
    }

    useEffect(() => {
        midWeather()
    }, [location, midRegionCode, midLandRegionCode]);

    return (
        <div className="font-['SUITE-Regular'] bg-white py-4 ml-auto mr-auto text-center w-3/6 h-full rounded-2xl mb-4">
            <div className="flex justify-center text-2xl mb-3">
                <h2 aria-label="현재 날씨">10일 날씨</ h2>
                <button>#</button>
            </div>
            <div className="py-3 flex justify-around">
                <span className="w-1/6">날짜</span>
                <span className="w-1/6">날씨</span>
                <span className="w-1/12">최고</span>
                <span className="w-1/12">최저</span>
            </div>
            {dayWeather?.TMX.map((value, index) => (
                <TendaysWeatherItem tmn={Math.floor(Number(dayWeather?.TMN[index])).toString()}
                                    tmx={Math.floor(Number(dayWeather?.TMX[index])).toString()} date={getDate(index)}
                                    days={getDays(index)} SKY={dayWeather?.SKY[index]} PTY={dayWeather?.PTY[index]}/>
            ))}
            {midWeatherData?.taMax && midWeatherData?.taMax.map((value, index) => (
                <TendaysWeatherItem tmn={midWeatherData?.taMin[index]} tmx={midWeatherData?.taMax[index]}
                                    wf={midWeatherData?.wf[index]} date={getDate(index + 3)} days={getDays(index)}/>
            ))}
        </div>
    )
};

export default TendaysWeather