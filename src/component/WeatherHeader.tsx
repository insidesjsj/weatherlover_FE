import React, {useContext, useState} from 'react';
import SearchGroup from '../public/SearchGroup';
import {Icon} from '../public/Icon';
import {Modal, ModalContents} from '../addModal/Modal';
import {regionDTO, searchContext} from '../pages/Main';
import {getCoordinate} from '../geoLocation/getCurrentCoordinate';


const WeatherHeader: React.FC = () => {
    const [isFocused, setIsFocused] = useState(false)
    const [regionArr, setRegionArr] = useState([])
    const search = useContext(searchContext)
    const regionValue = search?.regionData

    const handleFocus = () => {
        if (!isFocused) {
            setIsFocused(true)
        }
    }
    const handleBlur = () => {
        if (isFocused) {
            setIsFocused(false)
        }
    }

    const clickRegion = (region: string, lat: number, lng: number) => {
        const {nx, ny} = getCoordinate(lat, lng)
        search?.clickRegion(region, nx, ny)
        handleBlur()
    }
    // 검색해서 가져온 지역명 배열, 최대 10개까지만 끊어서 보여준다
    const combinedRegionArray = regionValue?.map(item => item.combinedRegion).slice(0, 10)
    console.log(combinedRegionArray)
    return (
        <div>
            <div className="pt-5 flex justify-between items-center">
                <div className="w-1/6 font-['SokchoBadaDotum'] text-3xl">
                    <span className="cursor-pointer">날씨의 연인</span>
                </div>
                <div className="w-1/4">
                    <SearchGroup divClassName="w-full" searchSize="30px" onFocus={handleFocus} onBlur={handleBlur} readonly={true} />
                </div>
                <div className="w-1/6 items-center">

                </div>
            </div>
            <Modal
                openAdd={isFocused}
                divClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            >
                <ModalContents>
                    <SearchGroup divClassName="w-full" searchSize="30px" onChange={search?.onChange}
                                 value={search?.search}/>
                    <ul>
                        {search?.regionData?.slice(0,10).map(item => (
                            <li key={item.id} className="text-left p-1" onClick={() => clickRegion(item.combinedRegion, Number(item.nx), Number(item.ny))}>
                                <p>{item.combinedRegion}</p>
                            </li>
                        ))}
                    </ul>

                </ModalContents>
            </Modal>
        </div>
    )
}

export default WeatherHeader;