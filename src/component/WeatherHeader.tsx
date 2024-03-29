import React, {useContext, useState} from 'react';
import SearchGroup from '../public/SearchGroup';
import {Icon} from '../public/Icon';
import {Modal, ModalContents} from './Modal';
import {regionDTO, searchContext} from '../pages/Main';
import {getCoordinate} from '../geoLocation/getCurrentCoordinate';
import {Button} from '../public/Button';
import {Link} from 'react-router-dom';


const WeatherHeader: React.FC = () => {
    const [isFocused, setIsFocused] = useState(false)
    const [hoveredItem, setHoveredItem] = useState<number | null>(null)
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

    const clickRegion = (region: string, lat: number, lng: number, midRegionCode?: string, midLandRegionCode?: string) => {
        const {nx, ny} = getCoordinate(lat, lng)
        search?.clickRegion(region, nx, ny, lat.toString(), lng.toString(), midRegionCode, midLandRegionCode)
        handleBlur()
    }
    // 검색해서 가져온 지역명 배열, 최대 10개까지만 끊어서 보여준다
    const combinedRegionArray = regionValue?.map(item => item.combinedRegion).slice(0, 10)
    console.log(combinedRegionArray)
    return (
        <div>
            <div className="pt-5 flex justify-between items-center">
                <div className="w-1/6 font-['SokchoBadaDotum'] text-3xl">
                        <h1><span className="cursor-pointer" onClick={() => window.location.reload()}>날씨의 연인</span></h1>
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
                    <SearchGroup divClassName="w-full mb-2" searchSize="30px" onChange={search?.onChange}
                                 value={search?.search}/>
                    <div className="h-3/4">
                        <ul>
                            {search?.regionData?.slice(0,10).map((item, index) => (
                                <li
                                    key={item.id}
                                    className={`flex items-center text-left p-3 cursor-pointer ${hoveredItem === index ? 'bg-gray-200' : 'bg-white'}`}
                                    onClick={() => clickRegion(item.combinedRegion, Number(item.nx), Number(item.ny), item.midRegionCode, item.midLandRegionCode)}
                                    onMouseEnter={() => setHoveredItem(index)}
                                    onMouseLeave={() => setHoveredItem(null)}
                                >
                                    <hr />
                                    <p>{item.combinedRegion}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <button className="my-auto w-full h-14 bg-red-500 rounded-2xl text-white" onClick={handleBlur}>돌아가기</button>
                </ModalContents>
            </Modal>
        </div>
    )
}

export default WeatherHeader;