import React from 'react';
import DayHighestTemp from './DayHighestTemp';
import DayLowestTemp from './DayLowestTemp';

const DayTemp: React.FC = () => {

    return (
        <div className="flex justify-around">
            <DayHighestTemp />
            <DayLowestTemp />
        </div>
    )
}

export default DayTemp;