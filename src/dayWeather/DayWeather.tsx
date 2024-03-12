import React from 'react';
import DayHourlyTemp from './DayHourlyTemp';
import DayHighestTemp from './DayHighestTemp';
import DayLowestTemp from './DayLowestTemp';
import DayTemp from './DayTemp';

const DayWeather: React.FC = () => {
    return (
        <div className="ml-auto mr-auto bg-white text-center w-3/6 h-full rounded-2xl">

            <div className="font-['SUITE-Regular'] w-full mt-3 py-6">
                <DayTemp />
                <DayHourlyTemp />
            </div>
        </div>
    )
}

export default DayWeather;