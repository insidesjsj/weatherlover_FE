import React, {FC, useContext, useState} from 'react';
import {Modal, ModalContents} from '../Modal';
import SearchGroup from '../SearchGroup';
import {getCoordinate} from '../../utills/geoLocation/getCurrentCoordinate';
import {callPost} from '../../service/ApiService';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {currentRegionState, curWeatherState, hourlyWeatherState} from '../../recoilState';

interface RegionSearchProps {
    isFocused: boolean,
    handleBlur: () => void,
}

export interface regionDataDTO {
    id: number,
    combinedRegion: string,
    nx: string,
    ny: string,
    midLandRegionCode?: string,
    midRegionCode?: string
}

const RegionSearch: FC<RegionSearchProps> = ({isFocused, handleBlur}) => {
    const [hoveredItem, setHoveredItem] = useState<number | null>(null)
    const [searchValue, setSearchValue] = useState('')
    const [regionData, setRegionData] = useState<regionDataDTO[]>([])
    const [curWeatherData, setCurWeatherData] = useRecoilState(curWeatherState)
    const [hourlyWeatherData, setHourlyWeather] = useRecoilState(hourlyWeatherState)
    const setCurrentRegion = useSetRecoilState(currentRegionState)

    const requestRegion = async (selectedRegion: string, nx: string, ny: string, lat: string, lng: string, midRegionCode?: string, midLandRegionCode?: string) => {
        const ultraSrtFcstResponse = await callPost({
            api: 'getUltraSrtFcst',
            request: {nx: nx, ny: ny}
        })
        const SrtFcstResponse = await callPost({
            api: 'getSrtFcst',
            request: {nx: nx, ny: ny}
        })
        if (midRegionCode && midLandRegionCode) {
            setCurrentRegion({
                address: selectedRegion,
                midRegionCode: midRegionCode,
                midLandRegionCode: midLandRegionCode,
            })
        }
        setCurWeatherData(ultraSrtFcstResponse)
        setHourlyWeather(SrtFcstResponse)
        console.log("현재 날씨" + curWeatherData)
        console.log("하루 데이터" + hourlyWeatherData)
    }

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

    const clickRegion = (region: string, lat: number, lng: number, midRegionCode?: string, midLandRegionCode?: string) => {
        const {nx, ny} = getCoordinate(lat, lng)
        requestRegion(region, nx, ny, lat.toString(), lng.toString(), midRegionCode, midLandRegionCode)
        handleBlur()
    }


    return (
        <div>
            <Modal
                openAdd={isFocused}
                divClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            >
                <ModalContents>
                    <SearchGroup divClassName="w-full mb-2" searchSize="30px" onChange={onChangeSearchGroup}
                                 value={searchValue}/>
                    <div className="h-3/4 overflow-hidden overflow-y-auto">
                        <ul>
                            {regionData ? regionData?.map((item, index) => (
                                <li
                                    key={item?.id}
                                    className={`flex items-center text-left p-3 cursor-pointer ${hoveredItem === index ? 'bg-gray-200' : 'bg-white'}`}
                                    onClick={() => clickRegion(item?.combinedRegion, Number(item?.nx), Number(item?.ny), item?.midRegionCode, item?.midLandRegionCode)}
                                    onMouseEnter={() => setHoveredItem(index)}
                                    onMouseLeave={() => setHoveredItem(null)}
                                    // tabIndex 속성 추가
                                    tabIndex={0}
                                    // 키보드 이벤트 처리
                                    onKeyDown={(e) => {
                                        // Enter 키 또는 Space 키를 눌렀을 때 클릭 이벤트 발생
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            clickRegion(item?.combinedRegion, Number(item?.nx), Number(item?.ny), item?.midRegionCode, item?.midLandRegionCode);
                                        }
                                        /*                                        // 화살표 키를 눌렀을 때 위 또는 아래로 이동
                                                                                else if (e.key === 'ArrowUp') {
                                                                                    setHoveredItem((prevIndex) => Math.max(prevIndex ?? 0 - 1, 0));
                                                                                } else if (e.key === 'ArrowDown') {
                                                                                    setHoveredItem((prevIndex) => Math.min(prevIndex ?? 0 + 1, (regionData?.length ?? 0) - 1));
                                                                                }*/
                                    }}
                                    // 포커스를 받았을 때 배경색 변경
                                    onFocus={() => setHoveredItem(index)}
                                    // 포커스를 잃었을 때 배경색 변경 제거
                                    onBlur={() => setHoveredItem(null)}
                                >
                                    <p>{item.combinedRegion}</p>
                                    <hr/>
                                </li>
                            )) : <ul>dd</ul>}
                        </ul>
                    </div>
                    <button className="my-auto w-full h-14 bg-red-500 rounded-2xl text-white mt-5"
                            onClick={handleBlur}>돌아가기
                    </button>
                </ModalContents>
            </Modal>
        </div>
    )
}

export default RegionSearch;