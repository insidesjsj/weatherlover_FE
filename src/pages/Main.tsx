import React, {useContext, useEffect, useState} from 'react';
import {CurrentWeather} from '../currentWeather/CurrentWeather';
import {weatherStateContext} from '../App';
import {getCurrentLocation} from '../geoLocation/getCurrentLocation';
import {getCoordinate} from '../geoLocation/getCurrentCoordinate';
import {callGet, callPost} from '../service/ApiService';
import WeatherHeader from '../component/WeatherHeader';
import Divder from '../public/Divder';
import {Button} from '../public/Button';
import DayWeather from '../dayWeather/DayWeather';

interface locationDTO {
    lat: string | null,
    lng: string | null,
    nx: string | null,
    ny: string | null,
}

interface currentWeatherDTO {
    TMP: string,    // 날씨
    POP: string,    // 강수확률
    PTY: string,    // 강수형태
    PCP: string,    // 1시간 강수량
    REH: string,    // 습도
    SKY: string,    // 하늘
    WSD: string,    // 풍속
}

interface dayWeatherDTO {
    TMP: string[],    // 날씨
    POP: string[],    // 강수확률
    PTY: string[],    // 강수형태
    PCP: string[],    // 1시간 강수량
    REH: string[],    // 습도
    SKY: string[],    // 하늘
    WSD: string[],    // 풍속
    TMN: string[],    // 최저기운
    TMX: string[],    // 최고기온
    dates: string[],  // 날짜
}

export interface regionDTO {
    id: number,
    combinedRegion: string,
    nx: string,
    ny: string,
}

const geolocationOptions = {
    enableHighAccuracy: true,
    timeout: 1000 * 10,
    maximumAge: 1000 * 3600 * 24,
}

interface WeatherCategoryProps {
    onClickButton: (category: string) => void;
    selectedCategory: string;
}

interface headerProps {
    search: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    regionData: [regionDTO] | undefined,
    clickRegion: (selectedRegion: string, nx: string, ny: string) => void
}

const WeatherCategory: React.FC<WeatherCategoryProps> = ({onClickButton, selectedCategory}) => {
    return (
        <div className="font-['SUITE-Regular'] mt-2 ml-auto mr-auto w-3/6 flex justify-around text-lg">
            <Button className={`p-1 border-2 rounded-2xl ${selectedCategory === '온도' && 'bg-blue-500 text-white'}`}
                    text="온도" onClick={() => onClickButton('온도')}/>
            <Button className={`p-1 border-2 rounded-2xl ${selectedCategory === '옷차림' && 'bg-blue-500 text-white'}`}
                    text="옷차림" onClick={() => onClickButton('옷차림')}/>
            <Button className={`p-1 border-2 rounded-2xl ${selectedCategory === '습도' && 'bg-blue-500 text-white'}`}
                    text="습도" onClick={() => onClickButton('습도')}/>
            <Button className={`p-1 border-2 rounded-2xl ${selectedCategory === '강수' && 'bg-blue-500 text-white'}`}
                    text="강수" onClick={() => onClickButton('강수')}/>
            <Button className={`p-1 border-2 rounded-2xl ${selectedCategory === '바람' && 'bg-blue-500 text-white'}`}
                    text="바람" onClick={() => onClickButton('바람')}/>
        </div>
    )
}

export const searchContext = React.createContext<headerProps | undefined>(undefined)
export const currentWeatherContext = React.createContext<currentWeatherDTO | undefined>(undefined)
export const dayWeatherContext = React.createContext<dayWeatherDTO | undefined>(undefined)
export const locationContext = React.createContext<locationDTO | undefined>(undefined)
export const Main: React.FC = () => {
    const data = useContext(weatherStateContext)
    const [index, setIndex] = useState(0)
    const [currentRegion, setCurrentRegion] = useState(data[index].region)
    const [location, setLocation] = useState<locationDTO>()
    const [currentWeather, setCurrentWeather] = useState<currentWeatherDTO>()
    const [dayWeather, setDayWeather] = useState<dayWeatherDTO>()
    const locDataLoaded = !location ? false : true   // useEffect에 넣을 상수. location 값이 비어있지 않으면 true 반환
    const [category, setCategory] = useState("온도")
    const [searchValue, setSearchValue] = useState("")
    const [regionData, setRegionData] = useState<[regionDTO]>()


    // 위경도와 x,y 좌표를 얻는 함수
    const getLoction = async () => {
        const location = await getCurrentLocation() // 위 경도 불러오기
        if (location) {
            const grid = getCoordinate(location.latitude, location.longitude)  // x, y 좌표값 구하기
            console.log('grid: ' + grid.ny, grid.nx)
            setLocation({
                lat: location.latitude.toString(),
                lng: location.longitude.toString(),
                nx: grid.nx,
                ny: grid.ny
            })
        } else {
            console.error('Failed to get location.')
        }
    }
    useEffect(() => {
        setCurrentRegion(data[index].region)
    }, [data, index])

    useEffect(() => {
        getLoction()
        callingOrder()
    }, [locDataLoaded])

    // 둘 다 비동기로 호출되기 때문에 callPost가 완료되기 전에 callGet이 호출 되어 서버에서 x, y 값이 전달이 안된 상태로 초단기 예보 API를 불러온다
    const callingOrder = async () => {
        if (location) {
            try {
                // 위, 경도를 서버로 보내서 현위치의 행정 주소 얻어오기
                const postLoc = await callPost({
                    api: "location/region",
                    request: {latitude: location?.lat, longitude: location?.lng}
                })
                // gridResponse에서 보낸 x,y 주소로 현재 날씨 불러오기
                const ultraSrtFcstResponse = await callPost({
                    api: 'getUltraSrtFcst',
                    request: {nx: location.nx, ny: location.ny}
                })
                const SrtFcstResponse = await callPost({
                    api: 'getSrtFcst',
                    request: {nx: location.nx, ny: location.ny}
                })
                setCurrentRegion((val) => postLoc)
                setCurrentWeather(ultraSrtFcstResponse)
                setDayWeather(SrtFcstResponse)
                console.log(currentWeather)
            } catch (error) {
                console.error('Error in fetchData:', error)
            }
        }
    }

    const onClickButton = (selectedCategory: string) => {
        setCategory(selectedCategory) // 여기에서 선택한 카테고리에 따라 필요한 로직을 수행할 수 있습니다.
    }

    // 검색창 입력할 때마다 서버로 보내는 함수
    const onChangeSearchGroup = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        setSearchValue(newValue)

        // 서버에 비동기 호출
        const getSearchRegion = await callPost({
            api: 'search',
            request: {inputValue: newValue}
        })
        if (getSearchRegion) {
            setRegionData(getSearchRegion)
            console.log(regionData)
        }
    }


    const clickRegion = async (selectedRegion: string, nx: string, ny: string) => {
        const ultraSrtFcstResponse = await callPost({
            api: 'getUltraSrtFcst',
            request: {nx: nx, ny: ny}
        })
        const SrtFcstResponse = await callPost({
            api: 'getSrtFcst',
            request: {nx: nx, ny: ny}
        })
        setCurrentRegion(selectedRegion)
        setCurrentWeather(ultraSrtFcstResponse)
        setDayWeather(SrtFcstResponse)
        console.log("하루 데이터" + dayWeather)
    }
    const searchContextValue = React.useMemo(() => ({
        search: searchValue,
        onChange: onChangeSearchGroup,
        regionData: regionData,
        clickRegion: clickRegion,
    }), [searchValue, onChangeSearchGroup, regionData, clickRegion])


    if (currentWeather === undefined) {
        return <div className="ml-auto mr-auto text-center w-3/6 h-full">날씨 데이터를 불러오는 중입니다.</div>
    } else {
        return (
            <div className="m-0 text-center w-full">
                <searchContext.Provider value={searchContextValue}>
                    <WeatherHeader/>
                </searchContext.Provider>
                <Divder/>
                <div className="w-full bg-gray-300 pt-1 pb-1">
                    <WeatherCategory onClickButton={onClickButton} selectedCategory={category}/>
                    <locationContext.Provider value={location}>
                        <currentWeatherContext.Provider value={currentWeather}>
                            <CurrentWeather category={category} location={currentRegion}/>
                        </currentWeatherContext.Provider>
                    </locationContext.Provider>
                    <dayWeatherContext.Provider value={dayWeather}>
                        <DayWeather/>
                    </dayWeatherContext.Provider>
                </div>
            </div>
        )
    }

}
