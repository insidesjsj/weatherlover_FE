import React, {useContext, useEffect, useState} from 'react';
import {Modal, ModalContents} from '../component/Modal';
import {AddRegion} from '../component/AddRegion';
import {Header} from '../component/Header';
import {CurrentWeather} from '../component/CurrentWeather';
import {dataType, weatherStateContext} from '../App';
import {getCurrentLocation} from '../geoLocation/getCurrentLocation';
import {getCoordinate} from '../geoLocation/getCurrentCoordinate';
import {callGet, callPost} from '../service/ApiService';

interface locationDTO {
    lat: string,
    lng: string
    nx: string | null,
    ny: string | null,
}

const geolocationOptions = {
    enableHighAccuracy: true,
    timeout: 1000 * 10,
    maximumAge: 1000 * 3600 * 24,
}

export const locationContext = React.createContext<locationDTO | undefined>(undefined)
export const Main: React.FC = () => {
    const data = useContext(weatherStateContext)
    const [index, setIndex] = useState(0)
    const [openAdd, setOpenAdd] = useState<boolean>(false)
    const [currentRegion, setCurrentRegion] = useState<dataType>(data[index])
    const [location, setLocation] = useState<locationDTO>()
    useEffect(() => {
        setCurrentRegion(data[index])
    }, [data, index]);
    // 위경도와 x,y 좌표를 얻는 함수
    const getLoction = async () => {
        const location = await getCurrentLocation() // 위 경도 불러오기
        if (location) {
            console.log('location: ' + location.latitude , location.longitude)

            const grid = getCoordinate(location.latitude, location.longitude)  // x, y 좌표값 구하기
            console.log('grid: ' + grid.ny, grid.nx)

            setLocation({
                lat: location.truncatedLatitude,
                lng: location.truncatedLongitude,
                nx: grid.nx,
                ny: grid.ny
            })
        } else {
            console.error('Failed to get location.')
        }
    }

    const onClickAdd = () => {
        setOpenAdd(openAdd => !openAdd)
    }

    const increment = () => {
        index < data.length -1 ? setIndex(index => index + 1) : setIndex(index => 0)
        setCurrentRegion(data[index])
    }
    const decrement = () => {
        index > 0 ? setIndex(index => index - 1) : setIndex(index => data.length -1)
        setCurrentRegion(data[index])
    }

    useEffect(() => {
        getLoction()

    }, []);

    //  둘 다 비동기로 호출되기 때문에 callPost가 완료되기 전에 callGet이 호출 되어 서버에서 x, y 값이 전달이 안된 상태로 초단기 예보 API를 불러온다
    // 순서를 정해줘서 c
    const callingOrder = async () => {
        if(location) {
            try {
                await callPost({api: 'location/grid', request: { nx: location?.nx, ny: location?.ny}})
                await callGet({api: 'getUltraSrtFcst', request: null})
            } catch (error) {
                console.error('Error in fetchData:', error);
            }
        }
    }

    callingOrder()

    return (
        <div>
            <locationContext.Provider value={location}>
                <Header
                    title={currentRegion.region}
                    left={{menu: "menu", style: {fontSize: "50px"}}}
                    right={{menu: "add_box", style: {fontSize: "50px"}, className: "cursor-pointer", onClick: onClickAdd}}
                    leftButton={{text: "<", className: "mr-12 cursor-pointer", onClick: decrement}}
                    rightButton={{text: ">", className: "ml-12 cursor-pointer", onClick: increment}}
                />
                <CurrentWeather location={currentRegion.region} />
                <Modal openAdd={openAdd}>
                    <ModalContents>
                        <AddRegion closeModal={onClickAdd} />
                    </ModalContents>
                </Modal>
            </locationContext.Provider>
        </div>
    )
}
