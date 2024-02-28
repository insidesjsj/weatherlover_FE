import React, {useContext, useEffect, useState} from 'react';
import {Modal, ModalContents} from '../addModal/Modal';
import {AddRegion} from '../addModal/AddRegion';
import {Header} from '../component/Header';
import {CurrentWeather} from '../currentWeather/CurrentWeather';
import {dataType, weatherStateContext} from '../App';
import {getCurrentLocation} from '../geoLocation/getCurrentLocation';
import {getCoordinate} from '../geoLocation/getCurrentCoordinate';
import {callGet, callPost} from '../service/ApiService';
import WeatherHeader from '../component/WeatherHeader';
import Divder from '../public/Divder';

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

const geolocationOptions = {
    enableHighAccuracy: true,
    timeout: 1000 * 10,
    maximumAge: 1000 * 3600 * 24,
}


export const currentWeatherContext = React.createContext<currentWeatherDTO | undefined>(undefined)
export const locationContext = React.createContext<locationDTO | undefined>(undefined)
export const Main: React.FC = () => {
    const data = useContext(weatherStateContext)
    const [index, setIndex] = useState(0)
    const [openAdd, setOpenAdd] = useState<boolean>(false)
    const [currentRegion, setCurrentRegion] = useState(data[index].region)
    const [location, setLocation] = useState<locationDTO>()
    const [currentWeather, setCurrentWeather] = useState<currentWeatherDTO>()
    const locDataLoaded = !location ? false : true   // useEffect에 넣을 상수. location 값이 비어있지 않으면 true 반환

    useEffect(() => {
        setCurrentRegion(data[index].region)
    }, [data, index]);

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
        getLoction()
        callingOrder()
    }, [locDataLoaded]);

    // 둘 다 비동기로 호출되기 때문에 callPost가 완료되기 전에 callGet이 호출 되어 서버에서 x, y 값이 전달이 안된 상태로 초단기 예보 API를 불러온다
    const callingOrder = async () => {
        if (location) {
            try {
                const gridResponse = await callPost({
                    api: 'location/grid',
                    request: {nx: location?.nx, ny: location?.ny}
                })
                const postLoc = await callPost({
                    api:"location/region",
                    request:{latitude: location?.lat, longitude: location?.lng}
                })

                const ultraSrtFcstResponse = await callGet({
                    api: 'getUltraSrtFcst',
                    request: null
                })
                setCurrentRegion((val) => postLoc)
                setCurrentWeather(ultraSrtFcstResponse)
                console.log(currentWeather)
            } catch (error) {
                console.error('Error in fetchData:', error);
            }
        }
    }

    const onClickAdd = () => {
        setOpenAdd(openAdd => !openAdd)
    }

    const increment = () => {
        index < data.length - 1 ? setIndex(index => index + 1) : setIndex(index => 0)
        setCurrentRegion(data[index].region)
    }
    const decrement = () => {
        index > 0 ? setIndex(index => index - 1) : setIndex(index => data.length - 1)
        setCurrentRegion(data[index].region)
    }


    if (currentWeather === undefined) {
        return <div className="ml-auto mr-auto text-center w-3/6 h-full">날씨 데이터를 불러오는 중입니다.</div>
    } else {
        return (
            <div className="m-0 text-center w-full h-full">
                <WeatherHeader/>
                <Divder />
                <div className="ml-auto mr-auto text-center w-3/6 h-full">
                    <locationContext.Provider value={location}>
                        {/*                        <Header
                            title={currentRegion}
                            left={{menu: "menu", style: {fontSize: "50px"}}}
                            right={{
                                menu: "add_box",
                                style: {fontSize: "50px"},
                                className: "cursor-pointer",
                                onClick: onClickAdd
                            }}
                            leftButton={{text: "<", className: "mr-12 cursor-pointer", onClick: decrement}}
                            rightButton={{text: ">", className: "ml-12 cursor-pointer", onClick: increment}}
                        />*/}
                        <currentWeatherContext.Provider value={currentWeather}>
                            <CurrentWeather location={currentRegion}/>
                            <Modal openAdd={openAdd}>
                                <ModalContents>
                                    <AddRegion closeModal={onClickAdd}/>
                                </ModalContents>
                            </Modal>
                        </currentWeatherContext.Provider>
                    </locationContext.Provider>
                </div>
            </div>
        )
    }

}
