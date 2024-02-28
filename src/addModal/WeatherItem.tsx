import {FC} from 'react';
import {Icon} from '../public/Icon';

export type WeatherItemProps = {
    region: string,
    weatherIcon: string,
    temp: number,
}
export const WeatherItem: FC<WeatherItemProps> = ({ region, weatherIcon, temp}) => {

    return (
        <div className="pl-8 pr-8 mt-4 mb-4 bg-gray-600 rounded-2xl h-20 flex justify-between items-center">
                <span className="text-left text-white text-xl w-4/5">{ region }</span>
                <Icon name={ weatherIcon } className="mr-4 ml-4" style={{ fontSize: "30px", color: "red"}} />
                <span className="text-white text-xl">{ temp }°</span>
        </div>
    )
}