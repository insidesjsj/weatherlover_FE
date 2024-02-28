import React from 'react';
import SearchGroup from '../public/SearchGroup';
import {Icon} from '../public/Icon';

const WeatherHeader: React.FC = () => {

    return (
        <div className="pt-5 flex justify-between items-center">
            <div className="w-1/6 font-['SokchoBadaDotum'] text-3xl">
                <span className="cursor-pointer">날씨의 연인</span>
            </div>
            <div className="w-1/4">
                <SearchGroup divClassName="w-full" searchSize="30px" />
            </div>
            <div className="w-1/6 items-center">
                <Icon name="add" className="text-4xl cursor-pointer" />
            </div>
        </div>
    )
}

export default WeatherHeader;