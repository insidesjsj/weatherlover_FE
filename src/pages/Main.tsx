import React, {useContext, useEffect, useState} from 'react';
import {Modal, ModalContents} from '../component/Modal';
import {AddRegion} from '../component/AddRegion';
import {Header} from '../component/Header';
import {CurrentWeather} from '../component/CurrentWeather';
import {dataType, weatherStateContext} from '../App';
import {CurrentLocation} from '../geoLocation/CurrentLocation';
import ReceiveWeather from '../weather/ReceiveWeather';
import {call} from '../service/ApiService';

const geolocationOptions = {
    enableHighAccuracy: true,
    timeout: 1000 * 10,
    maximumAge: 1000 * 3600 * 24,
}

export const Main = () => {
    const data = useContext(weatherStateContext)
    const [index, setIndex] = useState(0)
    const [openAdd, setOpenAdd] = useState<boolean>(false)
    const [currentRegion, setCurrentRegion] = useState<dataType>(data[index])

    useEffect(() => {
        setCurrentRegion(data[index])
    }, [data, index]);

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


    return (
        <div>
            <Header
                title={currentRegion.region}
                left={{menu: "menu", style: {fontSize: "50px"}}}
                right={{menu: "add_box", style: {fontSize: "50px"}, className: "cursor-pointer", onClick: onClickAdd}}
                leftButton={{text: "<", className: "mr-12 cursor-pointer", onClick: decrement}}
                rightButton={{text: ">", className: "ml-12 cursor-pointer", onClick: increment}}
            />
            <CurrentWeather location={currentRegion.region} />
            <CurrentLocation />
            <Modal openAdd={openAdd}>
                <ModalContents>
                    <AddRegion closeModal={onClickAdd} />
                </ModalContents>
            </Modal>
        </div>
    )
}
