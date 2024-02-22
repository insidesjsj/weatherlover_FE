import {FC} from 'react';
import {Icon} from './Icon';

export type CurrentWeatherProps = {
    location: string
}

export const CurrentWeather: FC<CurrentWeatherProps> = ({location}) => {
    return (
        <div>
            <div>{location}</div>
            <div>대체로 흐림</div>
            <Icon name="nights_stay" />
            <div>1도</div>
        </div>
    )
}